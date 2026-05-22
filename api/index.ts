import { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "nodejs20.x",
};

let serverEntry: any;

async function getServerEntry() {
  if (!serverEntry) {
    try {
      const module = await import("../dist/server/index.js");
      serverEntry = module.default;
    } catch (error) {
      console.error("Failed to load server entry:", error);
      throw error;
    }
  }
  return serverEntry;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const handler = await getServerEntry();

    if (typeof handler !== "function") {
      res.status(500).json({ error: "Server handler not found" });
      return;
    }

    const url = new URL(
      req.url || "/",
      `http://${req.headers.host}`,
    );

    const request = new Request(url, {
      method: req.method,
      headers: new Headers(
        Object.entries(req.headers).reduce(
          (acc, [key, value]) => {
            if (typeof value === "string") {
              acc[key] = value;
            } else if (Array.isArray(value)) {
              acc[key] = value.join(",");
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      ),
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body || {}),
    });

    const response = await handler(request, {}, {});

    if (response instanceof Response) {
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get("content-type");

      res.status(response.status);
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      if (
        contentType?.includes("application/json") ||
        contentType?.includes("text/")
      ) {
        res.send(Buffer.from(buffer).toString("utf-8"));
      } else {
        res.send(Buffer.from(buffer));
      }
    } else {
      res.status(500).json({ error: "Invalid server response" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

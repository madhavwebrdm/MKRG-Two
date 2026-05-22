import type { IncomingMessage, ServerResponse } from "node:http";

type FetchHandler = (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
type ServerEntry = FetchHandler | { fetch: FetchHandler };

let serverEntryPromise: Promise<FetchHandler> | undefined;

async function getServerEntry(): Promise<FetchHandler> {
  if (!serverEntryPromise) {
    // Generated at build time — no declaration exists at typecheck time.
    // @ts-expect-error - dist/server/server.js is produced by `npm run build`
    serverEntryPromise = import("../dist/server/server.js").then((mod: unknown) => {
      const entry = (mod as { default?: ServerEntry }).default ?? (mod as ServerEntry);
      if (typeof entry === "function") return entry;
      if (entry && typeof (entry as { fetch?: FetchHandler }).fetch === "function") {
        return (entry as { fetch: FetchHandler }).fetch.bind(entry);
      }
      throw new Error("dist/server/server.js does not export a fetch handler");
    });
  }
  return serverEntryPromise;
}

async function readBody(req: IncomingMessage): Promise<Buffer | undefined> {
  const method = (req.method ?? "GET").toUpperCase();
  if (method === "GET" || method === "HEAD") return undefined;
  const chunks: Array<Buffer> = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : (chunk as Buffer));
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

function buildHeaders(req: IncomingMessage): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }
  return headers;
}

function getProtocol(req: IncomingMessage): string {
  const forwarded = req.headers["x-forwarded-proto"];
  if (typeof forwarded === "string" && forwarded.length > 0) return forwarded.split(",")[0]!.trim();
  return "https";
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const fetchHandler = await getServerEntry();

    const host = req.headers.host ?? "localhost";
    const url = new URL(req.url ?? "/", `${getProtocol(req)}://${host}`);
    const body = await readBody(req);

    const request = new Request(url, {
      method: req.method,
      headers: buildHeaders(req),
      body: body ? new Uint8Array(body) : undefined,
      // @ts-expect-error — undici accepts duplex for streaming bodies
      duplex: body ? "half" : undefined,
    });

    const response = await fetchHandler(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
    }
    res.end();
  } catch (error) {
    console.error("Vercel handler error:", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          error: "Internal Server Error",
          message: error instanceof Error ? error.message : String(error),
        }),
      );
    } else {
      res.end();
    }
  }
}

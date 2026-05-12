import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      type: "string",
      description: "Lucide icon name (e.g. Cpu, Recycle, Battery, Box, Truck, ShieldCheck, Lock, Factory, PackageCheck).",
    }),
    defineField({ name: "bullets", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", type: "number" }),
  ],
});

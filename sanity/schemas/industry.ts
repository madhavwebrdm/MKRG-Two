import { defineField, defineType } from "sanity";

export default defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      type: "string",
      description: "Lucide icon (e.g. Building2, Factory, Cpu, Landmark, GraduationCap, ShoppingBag, HeartPulse, Antenna).",
    }),
    defineField({ name: "order", type: "number" }),
  ],
});

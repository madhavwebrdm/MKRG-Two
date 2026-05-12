import { defineField, defineType } from "sanity";

export default defineType({
  name: "leader",
  title: "Leadership",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number" }),
  ],
});

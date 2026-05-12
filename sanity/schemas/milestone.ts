import { defineField, defineType } from "sanity";

export default defineType({
  name: "milestone",
  title: "Milestone",
  type: "document",
  fields: [
    defineField({ name: "year", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

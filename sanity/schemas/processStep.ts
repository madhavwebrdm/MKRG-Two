import { defineField, defineType } from "sanity";

export default defineType({
  name: "processStep",
  title: "Process Step",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "order", type: "number", validation: (r) => r.required() }),
  ],
});

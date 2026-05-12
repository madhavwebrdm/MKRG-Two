import { defineField, defineType } from "sanity";

export default defineType({
  name: "impactMetric",
  title: "Impact Metric",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "number", validation: (r) => r.required() }),
    defineField({ name: "suffix", type: "string", description: "e.g. '+', '%', ' t'." }),
    defineField({
      name: "group",
      type: "string",
      options: { list: ["home", "sustainability"] },
      initialValue: "home",
    }),
    defineField({ name: "order", type: "number" }),
  ],
});

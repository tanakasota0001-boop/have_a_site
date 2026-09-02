import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    sortOrder: z.number(),
  }),
});

export const collections = {
  faq: faqCollection,
};

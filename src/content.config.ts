import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reasonsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/reasons" }),
  schema: z.object({
    title: z.string(),
    sortOrder: z.number(),
  }),
});

const benefitsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/benefits" }),
  schema: z.object({
    title: z.string(),
    sortOrder: z.number(),
  }),
});

const flowCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/flow" }),
  schema: z.object({
    step: z.string(),
    title: z.string(),
    customerAction: z.string(),
    sortOrder: z.number(),
  }),
});

const faqCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    sortOrder: z.number(),
  }),
});

const pricingIncludesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/pricing-includes" }),
  schema: z.object({
    title: z.string(),
    sortOrder: z.number(),
  }),
});

export const collections = {
  reasons: reasonsCollection,
  benefits: benefitsCollection,
  flow: flowCollection,
  faq: faqCollection,
  'pricing-includes': pricingIncludesCollection,
};

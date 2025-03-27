import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    updateDate: z.date().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: image().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

// Services collection schema
const servicesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    image: image(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    price: z.number(),
    oldPrice: z.number().optional(),
    discount: z.number().optional(),
    duration: z.string(),
    features: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
    schemaType: z.string().optional()
  }),
});

// Export collections
export const collections = {
  'blog': blogCollection,
  'services': servicesCollection,
}; 
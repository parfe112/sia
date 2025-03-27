import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    updateDate: z.date().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.any().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

// Services collection schema
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    image: z.any().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    price: z.number().optional(),
    oldPrice: z.number().optional(),
    discount: z.number().optional(),
    duration: z.string().optional(),
    features: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional(),
    publishDate: z.date().optional(),
  }),
});

// Export collections
export const collections = {
  'blog': blogCollection,
  'services': servicesCollection,
}; 
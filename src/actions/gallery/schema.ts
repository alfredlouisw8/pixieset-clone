import { z } from 'zod'

export const GallerySchema = z.object({
  bannerImage: z.array(z.string()),
  title: z.string(),
  userId: z.string(),
  date: z.date(),
  isPublished: z.boolean(),
  slug: z.string(),
})

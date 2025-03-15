import { z } from 'zod'

export const GallerySchema = z.object({
  bannerImage: z.array(
    z.custom<File>((v) => v instanceof File, {
      message: 'ファイルを選択してください。',
    })
  ),
  title: z.string(),
  date: z.string(),
  isPublished: z.boolean(),
  slug: z.string(),
})

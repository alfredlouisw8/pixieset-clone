'use server'

import { revalidatePath } from 'next/cache'

import { deleteFromCloudinary } from '@/utils/cloudinary'

export default async function deleteGallery(galleryId: string) {
  const result = await prisma.$transaction(async (prisma) => {
    const response = await prisma.gallery.delete({
      where: {
        id: galleryId,
      },
    })

    const deletedImages = response.bannerImage.map(
      (image) => JSON.parse(image).publicId
    )

    deleteFromCloudinary(deletedImages)

    return response
  })

  revalidatePath('/gallery')

  return result
}

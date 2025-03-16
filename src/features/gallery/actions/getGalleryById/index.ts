import prisma from '@/lib/prisma'

export default async function getGalleryById(galleryId: string) {
  const response = await prisma.gallery.findUnique({
    where: {
      id: galleryId,
    },
  })

  return response
}

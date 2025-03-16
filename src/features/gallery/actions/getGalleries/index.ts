import { auth } from '@/lib/auth/auth'
import prisma from '@/lib/prisma'

export default async function getGalleries() {
  const session = await auth()

  const response = await prisma.gallery.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return response
}

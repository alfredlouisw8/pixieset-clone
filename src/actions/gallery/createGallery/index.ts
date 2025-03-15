'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth/auth'
import { createSafeAction } from '@/lib/create-safe-action'
import prisma from '@/lib/prisma'

import { GallerySchema } from '../schema'
import { InputType, ReturnType } from '../types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth()

  if (!session?.user) {
    return {
      error: 'Silahkan login',
    }
  }

  let result

  const { title, bannerImage, userId, date, isPublished, slug } = data

  try {
    result = await prisma.$transaction(async (prisma) => {
      const gallery = await prisma.gallery.create({
        data: {
          title,
          bannerImage,
          userId,
          date,
          isPublished,
          slug,
        },
      })

      return gallery
    })
  } catch (error: any) {
    console.error(error.message)
    return {
      error: error.message || 'Gagal menambah barang',
    }
  }

  revalidatePath(`/gallery`)
  return { data: result }
}

export const createGallery = createSafeAction(GallerySchema, handler)

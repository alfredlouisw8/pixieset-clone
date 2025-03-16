import { zodResolver } from '@hookform/resolvers/zod'
import { Gallery } from '@prisma/client'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/components/ui/use-toast'
import { createGallery } from '@/features/gallery/actions/createGallery'
import { GallerySchema } from '@/features/gallery/actions/schema'
import { useAction } from '@/hooks/useAction'
import { uploadToCloudinary } from '@/utils/cloudinary'

import { updateGallery } from '../actions/updateGallery'

type GalleryFormProps = {
  type: 'create' | 'update'
  galleryData?: Gallery
}

export default function useGalleryForm({
  type,
  galleryData,
}: GalleryFormProps) {
  const router = useRouter()
  const formSchema = GallerySchema

  const actions = {
    create: {
      action: createGallery,
      successMessage: 'Gallery created successfully',
    },
    update: {
      action: updateGallery,
      successMessage: 'Gallery update successfully',
    },
  }

  const { execute, fieldErrors } = useAction(actions[type].action, {
    onSuccess: () => {
      toast({
        title: actions[type].successMessage,
      })
      router.replace('/gallery')
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  type Inputs = z.infer<typeof formSchema>

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bannerImage: galleryData?.bannerImage || [],
      title: galleryData?.title || '',
      date: galleryData?.date
        ? format(new Date(galleryData?.date || ''), 'yyyy/MM/dd')
        : '',
      isPublished: galleryData?.isPublished || false,
      slug: galleryData?.slug || '',
      galleryId: galleryData?.id || '',
    },
  })

  // Handle multiple image uploads
  const onImagesUpload = async (files: File[]) => {
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('images', file))

      // Call server action
      return await uploadToCloudinary(formData)
    } catch (error) {
      console.error('Cloudinary Upload Error:', error)
    }
  }

  const handleSubmit = form.handleSubmit(async (data: Inputs) => {
    let uploadedUrls
    if (data.bannerImage.length > 0 && data.bannerImage[0] instanceof File) {
      uploadedUrls = await onImagesUpload(data.bannerImage as File[])

      if (!uploadedUrls) {
        toast({
          title: 'Failed to upload images',
          variant: 'destructive',
        })
        return
      }
    }

    const updatedData = {
      ...data,
      bannerImage: uploadedUrls || (data.bannerImage as string[]),
    }

    console.log('qwe', uploadedUrls, data, updatedData)

    await execute(updatedData)

    if (fieldErrors) {
      for (const [key, value] of Object.entries(fieldErrors)) {
        form.setError(key as keyof typeof fieldErrors, {
          type: 'manual',
          message: value.join(','),
        })
      }
      return
    }
  })

  return {
    form,
    handleSubmit,
  } as const
}

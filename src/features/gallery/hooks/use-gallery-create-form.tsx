import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createGallery } from '@/actions/gallery/createGallery'
import { GallerySchema } from '@/actions/gallery/schema'
import { toast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/useAction'

export default function useGalleryCreateForm() {
  const router = useRouter()
  const formSchema = GallerySchema

  const { execute, fieldErrors } = useAction(createGallery, {
    onSuccess: () => {
      toast({
        title: 'Gallery created successfully',
      })
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
      bannerImage: [],
      title: '',
      date: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (data: Inputs) => {
    console.log('Gallery form submitted', data)
  })

  return {
    form,
    handleSubmit,
  } as const
}

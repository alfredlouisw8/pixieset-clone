'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createGallery } from '@/actions/gallery/createGallery'
import { GallerySchema } from '@/actions/gallery/schema'
import { TextFormField } from '@/components/forms/text-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/useAction'

import { MultipleFileDropzoneFormField } from '../forms/mutilple-file-dropzone-form-field'

export default function GalleryForm() {
  const formSchema = GallerySchema

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Gallery form submitted', values)
    // await execute(values)

    // if (fieldErrors) {
    //   for (const [key, value] of Object.entries(fieldErrors)) {
    //     form.setError(key as keyof typeof fieldErrors, {
    //       type: 'manual',
    //       message: value.join(','),
    //     })
    //   }
    //   return
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextFormField name="title" label="Title" required />

        <MultipleFileDropzoneFormField
          name="bannerImage"
          label="Banner Image"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

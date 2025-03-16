'use client'

import { Gallery } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

import { CheckboxFormField } from '@/components/forms/checkbox-form-field'
import { DatePickerFormField } from '@/components/forms/date-picker-form-field'
import { MultipleFileDropzoneFormField } from '@/components/forms/mutilple-file-dropzone-form-field'
import { TextFormField } from '@/components/forms/text-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import useGalleryForm from '../hooks/use-gallery-form'

type GalleryFormProps = {
  form: ReturnType<typeof useGalleryForm>['form']
  handleSubmit: ReturnType<typeof useGalleryForm>['handleSubmit']
  galleryData?: Gallery
}

export default function GalleryForm({
  form,
  handleSubmit,
  galleryData,
}: GalleryFormProps) {
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('slug', event.target.value.replace(/\s+/g, '-').toLowerCase())
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-8"
      >
        <TextFormField
          name="title"
          label="Gallery Name"
          onChangeFieldValue={onTitleChange}
          required
        />

        <TextFormField name="slug" label="Slug" required />

        <DatePickerFormField name="date" label="Event Date" required />

        {galleryData && galleryData.bannerImage.length > 0 && (
          <div className="flex gap-2">
            {galleryData.bannerImage.map((image: string) => (
              <Image
                key={image}
                src={JSON.parse(image).url}
                width={300}
                height={150}
                alt="Banner Image"
                className="object-cover"
              />
            ))}
          </div>
        )}

        <MultipleFileDropzoneFormField
          name="bannerImage"
          label="Banner Image"
          accept="image/*"
          required
        />

        <CheckboxFormField name="isPublished" label="Published" />

        <Button type="submit" loading={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

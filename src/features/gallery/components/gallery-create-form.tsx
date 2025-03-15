'use client'

import { DatePickerFormField } from '@/components/forms/date-picker-form-field'
import { MultipleFileDropzoneFormField } from '@/components/forms/mutilple-file-dropzone-form-field'
import { TextFormField } from '@/components/forms/text-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import useGalleryCreateForm from '@/features/gallery/hooks/use-gallery-create-form'

export default function GalleryCreateForm() {
  const { form, handleSubmit } = useGalleryCreateForm()

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-8"
      >
        <TextFormField name="title" label="Gallery Name" required />

        <DatePickerFormField name="date" label="Event Date" required />

        <MultipleFileDropzoneFormField
          name="bannerImage"
          label="Banner Image"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

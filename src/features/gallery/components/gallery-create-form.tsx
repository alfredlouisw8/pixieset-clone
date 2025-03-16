'use client'

import GalleryForm from './gallery-form'
import useGalleryForm from '../hooks/use-gallery-form'

export default function GalleryCreateForm() {
  const { form, handleSubmit } = useGalleryForm({
    type: 'create',
  })

  return <GalleryForm form={form} handleSubmit={handleSubmit} />
}

import { useState, useCallback } from "react"
import type { AddPostPayload } from "../../../../entities/posts/model/types"
import { usePostsList } from "../../model/usePostsList"

export const useAddPost = () => {
  const { addPost } = usePostsList()
  const [form, setForm] = useState<AddPostPayload>({ title: "", body: "", userId: 1 })
  const [submitting, setSubmitting] = useState(false)

  const submit = useCallback(async () => {
    setSubmitting(true)
    try {
      await addPost(form)
      setForm({ title: "", body: "", userId: 1 })
    } finally {
      setSubmitting(false)
    }
  }, [addPost, form])

  return {
    form,
    setForm,
    submitting,
    submit,
  }
}


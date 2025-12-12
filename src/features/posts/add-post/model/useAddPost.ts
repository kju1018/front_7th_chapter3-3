import { useState, useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AddPostPayload, PostWithAuthor } from "../../../../entities/posts/model/types"
import { addPostApi } from "../../../../entities/posts/api/postsApi"

export const useAddPost = () => {
  const queryClient = useQueryClient()

  const addPostMutation = useMutation({
    mutationKey: ["posts", "add"],
    mutationFn: async (payload: AddPostPayload) => addPostApi(payload),
    onSuccess: (created) => {
      queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
          if (!oldData) return oldData
          const newPost: PostWithAuthor = { ...(created as PostWithAuthor) }
          return {
            ...oldData,
            posts: [newPost, ...(oldData.posts ?? [])],
            total: (oldData.total ?? 0) + 1,
          }
        },
      )
    },
  })

  const [form, setForm] = useState<AddPostPayload>({ title: "", body: "", userId: 1 })
  const [submitting, setSubmitting] = useState(false)

  const submit = useCallback(async () => {
    if (!form.title.trim() || !form.body.trim()) return

    setSubmitting(true)
    try {
      await addPostMutation.mutateAsync(form)
      setForm({ title: "", body: "", userId: 1 })
    } finally {
      setSubmitting(false)
    }
  }, [addPostMutation, form])

  return {
    form,
    setForm,
    submitting,
    submit,
  }
}

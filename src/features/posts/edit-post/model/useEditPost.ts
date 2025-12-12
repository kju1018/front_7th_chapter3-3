import { useEffect, useState, useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Post, PostWithAuthor } from "../../../../entities/posts/model/types"
import { updatePostApi } from "../../../../entities/posts/api/postsApi"

interface UseEditPostOptions {
  post: PostWithAuthor | null
}

export const useEditPost = ({ post }: UseEditPostOptions) => {
  const queryClient = useQueryClient()

  const [form, setForm] = useState<Pick<Post, "title" | "body">>({
    title: post?.title ?? "",
    body: post?.body ?? "",
  })

  useEffect(() => {
    setForm({
      title: post?.title ?? "",
      body: post?.body ?? "",
    })
  }, [post])

  const [submitting, setSubmitting] = useState(false)

  const updatePostMutation = useMutation({
    mutationKey: ["posts", "update"],
    mutationFn: async (payload: Post) => updatePostApi(payload),
    onSuccess: (updated) => {
      queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
          if (!oldData) return oldData
          const posts = (oldData.posts ?? []).map((p) =>
            p.id === updated.id ? { ...p, ...updated } : p,
          )
          return { ...oldData, posts }
        },
      )
    },
  })

  const submit = useCallback(async () => {
    if (!post) return
    setSubmitting(true)
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        userId: post.userId,
        title: form.title,
        body: form.body,
        tags: post.tags,
        reactions: post.reactions,
      })
    } finally {
      setSubmitting(false)
    }
  }, [form.body, form.title, post, updatePostMutation])

  return {
    form,
    setForm,
    submitting,
    submit,
  }
}

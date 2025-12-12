import { useEffect, useState, useCallback } from "react"
import type { Post } from "../../../../entities/posts/model/types"
import type { PostWithAuthor } from "../../model/postsViewAtoms"
import { usePostsList } from "../../model/usePostsList"

interface UseEditPostOptions {
  post: PostWithAuthor | null
}

export const useEditPost = ({ post }: UseEditPostOptions) => {
  const { updatePost } = usePostsList()

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

  const submit = useCallback(async () => {
    if (!post) return
    setSubmitting(true)
    try {
      await updatePost({
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
  }, [form.body, form.title, post, updatePost])

  return {
    form,
    setForm,
    submitting,
    submit,
  }
}


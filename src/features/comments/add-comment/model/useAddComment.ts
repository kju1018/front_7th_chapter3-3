import { useState } from "react"
import { useCommentActions } from "../../model/useCommentActions"

interface UseAddCommentOptions {
  postId: number | null
}

export function useAddComment({ postId }: UseAddCommentOptions) {
  const { addComment } = useCommentActions()
  
  const [form, setForm] = useState({
    body: "",
    userId: 1,
    postId: postId,
  })

  const updateForm = (patch: Partial<typeof form>) =>
    setForm(prev => ({ ...prev, ...patch }))

  const submit = async () => {
    if (!form.body.trim() || !postId) return

    try {
      await addComment({ ...form, postId })
      setForm(prev => ({ ...prev, body: "" }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return { form, updateForm, submit }
}

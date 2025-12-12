import { useCallback, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { addCommentApi } from "../../../../entities/comments/api/commentsApi"
import { commentsAtom } from "../../../../entities/comments/model/commentsAtoms"
import type { AddCommentPayload } from "../../../../entities/comments/model/types"

interface UseAddCommentOptions {
  postId: number | null
}

export function useAddComment({ postId }: UseAddCommentOptions) {
  const setComments = useSetAtom(commentsAtom)

  const addCommentMutation = useMutation({
    mutationKey: ["comments", "add"],
    mutationFn: async (payload: AddCommentPayload) => {
      const data = await addCommentApi(payload)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      return data
    },
  })

  const [form, setForm] = useState({ body: "", userId: 1 })

  const updateForm = useCallback((patch: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...patch }))
  }, [])

  const submit = useCallback(async () => {
    if (!form.body.trim() || postId === null) return

    const payload: AddCommentPayload = { ...form, postId }

    try {
      await addCommentMutation.mutateAsync(payload)
      setForm((prev) => ({ ...prev, body: "" }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }, [form, postId, addCommentMutation])

  return { form, updateForm, submit, isLoading: addCommentMutation.isPending }
}

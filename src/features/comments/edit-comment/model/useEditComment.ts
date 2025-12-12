import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import type { Comment } from "../../../../entities/comments/model/types"
import { commentsAtom } from "../../../../entities/comments/model/commentsAtoms"
import { updateCommentApi } from "../../../../entities/comments/api/commentsApi"

interface UseEditCommentOptions {
  comment: Comment | null
}

export const useEditComment = ({ comment }: UseEditCommentOptions) => {
  const [body, setBody] = useState(comment?.body ?? "")
  const setComments = useSetAtom(commentsAtom)

  const updateCommentMutation = useMutation({
    mutationKey: ["comments", "update"],
    mutationFn: async ({ id, body }: { id: number; body: string }) => {
      const data = await updateCommentApi(id, body)
      setComments((prev) => ({
        ...prev,
        [data.postId]:
          prev[data.postId]?.map((c) => (c.id === data.id ? data : c)) ?? [data],
      }))
      return data
    },
  })

  const submit = async () => {
    if (!comment) return
    try {
      await updateCommentMutation.mutateAsync({ id: comment.id, body })
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return { body, setBody, submit, isLoading: updateCommentMutation.isPending }
}

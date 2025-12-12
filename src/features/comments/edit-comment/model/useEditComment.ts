import { useEffect, useState } from "react"
import type { Comment } from "../../../../entities/comments/api/commentsApi"
import { useCommentActions } from "../../model/useCommentActions"

interface UseEditCommentOptions {
  comment: Comment | null
}

export const useEditComment = ({ comment }: UseEditCommentOptions) => {
  const { updateComment } = useCommentActions()
  const [body, setBody] = useState(comment?.body ?? "")

  useEffect(() => {
    setBody(comment?.body ?? "")
  }, [comment])

  const submit = async () => {
    if (!comment) return
    try {
      await updateComment(comment.id, body)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return { body, setBody, submit }
}

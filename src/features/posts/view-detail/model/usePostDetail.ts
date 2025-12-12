import { useEffect } from "react"
import { useAtomValue } from "jotai"
import { commentsAtom } from "../../../../entities/comments/model/commentsAtoms"
import { useComments } from "../../../../entities/comments/model/useComments"
import { useCommentActions } from "../../../comments/model/useCommentActions"

interface UsePostDetailOptions {
  postId: number | null
}

export const usePostDetail = ({ postId }: UsePostDetailOptions) => {
  const comments = useAtomValue(commentsAtom)
  const { fetchComments } = useComments()
  const { likeComment, deleteComment } = useCommentActions()

  useEffect(() => {
    if (postId) {
      fetchComments(postId)
    }
  }, [postId, fetchComments])

  const handleLike = async (id: number, postIdForComment: number) => {
    try {
      await likeComment(id, postIdForComment)
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const handleDelete = async (id: number, postIdForComment: number) => {
    try {
      await deleteComment(id, postIdForComment)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return {
    comments,
    handleLike,
    handleDelete,
  }
}


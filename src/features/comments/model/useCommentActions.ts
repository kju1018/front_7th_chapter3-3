import { useCallback } from "react"
import { useAtom } from "jotai"
import { commentsAtom } from "../../../entities/comments/model/commentsAtoms"
import { addCommentApi, deleteCommentApi, updateCommentApi } from "../../../entities/comments/api/commentsApi"
import { likeCommentApi } from "../api/commentsApi"
import type { AddCommentPayload, Comment } from "../../../entities/comments/api/commentsApi"

export const useCommentActions = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  const addComment = useCallback(
    async (payload: AddCommentPayload) => {
      const data = await addCommentApi(payload)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      return data
    },
    [setComments],
  )

  const updateComment = useCallback(
    async (id: number, body: string) => {
      const data = await updateCommentApi(id, body)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId]?.map((comment: Comment) => (comment.id === data.id ? data : comment)) || [data],
      }))
      return data
    },
    [setComments],
  )

  const deleteComment = useCallback(
    async (id: number, postId: number) => {
      await deleteCommentApi(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId]?.filter((comment) => comment.id !== id) || [],
      }))
    },
    [setComments],
  )

  const likeComment = useCallback(
    async (id: number, postId: number) => {
      const currentLikes = comments[postId]?.find((c) => c.id === id)?.likes || 0
      const data = await likeCommentApi(id, currentLikes + 1)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId]?.map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment)) || [],
      }))
      return data
    },
    [comments, setComments],
  )

  return {
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  }
}

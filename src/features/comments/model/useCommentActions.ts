import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { commentsAtom } from "../../../entities/comments/model/commentsAtoms"
import { addCommentApi, deleteCommentApi, updateCommentApi } from "../../../entities/comments/api/commentsApi"
import { likeCommentApi } from "../api/commentsApi"
import type { AddCommentPayload, Comment } from "../../../entities/comments/model/types"

export const useCommentActions = () => {
  const [comments, setComments] = useAtom(commentsAtom)

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

  const updateCommentMutation = useMutation({
    mutationKey: ["comments", "update"],
    mutationFn: async ({ id, body }: { id: number; body: string }) => {
      const data = await updateCommentApi(id, body)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId]?.map((comment: Comment) => (comment.id === data.id ? data : comment)) || [data],
      }))
      return data
    },
  })

  const deleteCommentMutation = useMutation({
    mutationKey: ["comments", "delete"],
    mutationFn: async ({ id, postId }: { id: number; postId: number }) => {
      await deleteCommentApi(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId]?.filter((comment) => comment.id !== id) || [],
      }))
    },
  })

  const likeCommentMutation = useMutation({
    mutationKey: ["comments", "like"],
    mutationFn: async ({ id, postId }: { id: number; postId: number }) => {
      const currentLikes = comments[postId]?.find((c) => c.id === id)?.likes || 0
      const data = await likeCommentApi(id, currentLikes + 1)
      setComments((prev) => ({
        ...prev,
        [postId]:
          prev[postId]?.map((comment) =>
            comment.id === data.id ? { ...data, likes: (comment.likes ?? 0) + 1 } : comment,
          ) || [],
      }))
      return data
    },
  })

  const addComment = useCallback(
    (payload: AddCommentPayload) => addCommentMutation.mutateAsync(payload),
    [addCommentMutation],
  )

  const updateComment = useCallback(
    (id: number, body: string) => updateCommentMutation.mutateAsync({ id, body }),
    [updateCommentMutation],
  )

  const deleteComment = useCallback(
    (id: number, postId: number) => deleteCommentMutation.mutateAsync({ id, postId }),
    [deleteCommentMutation],
  )

  const likeComment = useCallback(
    (id: number, postId: number) => likeCommentMutation.mutateAsync({ id, postId }),
    [likeCommentMutation],
  )

  return {
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  }
}

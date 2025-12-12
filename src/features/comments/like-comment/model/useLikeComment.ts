import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { commentsAtom } from "../../../../entities/comments/model/commentsAtoms"
import { likeCommentApi } from "../api/commentsApi"

export const useLikeComment = () => {
  const setComments = useSetAtom(commentsAtom)

  const likeCommentMutation = useMutation({
    mutationKey: ["comments", "like"],
    mutationFn: async ({ id, postId }: { id: number; postId: number }) => {
      let currentLikes = 0

      setComments((prev) => {
        const found = prev[postId]?.find((c) => c.id === id)
        currentLikes = found?.likes ?? 0
        return prev
      })

      const data = await likeCommentApi(id, currentLikes + 1)

      setComments((prev) => ({
        ...prev,
        [postId]:
          prev[postId]?.map((comment) =>
            comment.id === data.id ? { ...data, likes: (comment.likes ?? 0) + 1 } : comment,
          ) ?? [],
      }))

      return data
    },
  })

  const likeComment = useCallback(
    (id: number, postId: number) => likeCommentMutation.mutateAsync({ id, postId }),
    [likeCommentMutation],
  )

  return { likeComment, isLoading: likeCommentMutation.isPending }
}


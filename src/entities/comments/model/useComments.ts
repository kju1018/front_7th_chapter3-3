import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { commentsAtom } from "./commentsAtoms"
import { fetchCommentsByPostApi } from "../api/commentsApi"

export const useComments = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  const fetchCommentsMutation = useMutation({
    mutationFn: async (postId: number) => {
      const data = await fetchCommentsByPostApi(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
      return data.comments
    },
  })

  const fetchComments = useCallback(
    async (postId: number) => {
      if (comments[postId]) return comments[postId]
      return fetchCommentsMutation.mutateAsync(postId, {
        mutationKey: ["comments", "byPost", postId],
      })
    },
    [comments, fetchCommentsMutation],
  )

  return {
    fetchComments,
  }
}

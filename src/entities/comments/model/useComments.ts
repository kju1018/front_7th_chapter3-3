import { useCallback } from "react"
import { useAtom } from "jotai"
import { commentsAtom } from "./commentsAtoms"
import { fetchCommentsByPostApi } from "../api/commentsApi"

export const useComments = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  const fetchComments = useCallback(
    async (postId: number) => {
      if (comments[postId]) return comments[postId]
      const data = await fetchCommentsByPostApi(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
      return data.comments
    },
    [comments, setComments],
  )

  return {
    fetchComments,
  }
}


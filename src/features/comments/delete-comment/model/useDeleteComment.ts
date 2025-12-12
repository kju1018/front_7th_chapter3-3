import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { commentsAtom } from "../../../../entities/comments/model/commentsAtoms"
import { deleteCommentApi } from "../../../../entities/comments/api/commentsApi"

export const useDeleteComment = () => {
  const setComments = useSetAtom(commentsAtom)

  const deleteCommentMutation = useMutation({
    mutationKey: ["comments", "delete"],
    mutationFn: async ({ id, postId }: { id: number; postId: number }) => {
      await deleteCommentApi(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId]?.filter((comment) => comment.id !== id) ?? [],
      }))
    },
  })

  const deleteComment = useCallback(
    (id: number, postId: number) => deleteCommentMutation.mutateAsync({ id, postId }),
    [deleteCommentMutation],
  )

  return { deleteComment, isLoading: deleteCommentMutation.isPending }
}


import { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePostApi } from "../../../../entities/posts/api/postsApi"
import type { PostWithAuthor } from "../../../../entities/posts/model/types"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  const deletePostMutation = useMutation({
    mutationKey: ["posts", "delete"],
    mutationFn: async (id: number) => deletePostApi(id),
    onSuccess: (_, id) => {
      queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
          if (!oldData) return oldData
          const posts = (oldData.posts ?? []).filter((post) => post.id !== id)
          return { ...oldData, posts, total: Math.max(0, (oldData.total ?? 0) - 1) }
        },
      )
    },
  })

  const deletePost = useCallback(
    (id: number) => deletePostMutation.mutateAsync(id),
    [deletePostMutation],
  )

  return { deletePost, isLoading: deletePostMutation.isPending }
}

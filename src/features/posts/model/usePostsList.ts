import { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi, updatePostApi, deletePostApi } from "../../../entities/posts/api/postsApi"
import { AddPostPayload, Post } from "../../../entities/posts/model/types"

export const usePostsList = () => {
  const queryClient = useQueryClient()

  const addPostMutation = useMutation({
    mutationKey: ["posts", "add"],
    mutationFn: async (payload: AddPostPayload) => {
      return addPostApi(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const updatePostMutation = useMutation({
    mutationKey: ["posts", "update"],
    mutationFn: async (payload: Post) => {
      return updatePostApi(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const deletePostMutation = useMutation({
    mutationKey: ["posts", "delete"],
    mutationFn: async (id: number) => {
      return deletePostApi(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const addPost = useCallback(
    (payload: AddPostPayload) => addPostMutation.mutateAsync(payload),
    [addPostMutation],
  )

  const updatePost = useCallback(
    (payload: Post) => updatePostMutation.mutateAsync(payload),
    [updatePostMutation],
  )

  const deletePost = useCallback(
    (id: number) => deletePostMutation.mutateAsync(id),
    [deletePostMutation],
  )

  return {
    addPost,
    updatePost,
    deletePost,
  }
}

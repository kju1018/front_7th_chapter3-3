import { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi, updatePostApi, deletePostApi } from "../../../entities/posts/api/postsApi"
import type { AddPostPayload, Post } from "../../../entities/posts/model/types"
import type { PostWithAuthor } from "./postsViewAtoms"

export const usePostsList = () => {
  const queryClient = useQueryClient()

  const addPostMutation = useMutation({
    mutationKey: ["posts", "add"],
    mutationFn: async (payload: AddPostPayload) => addPostApi(payload),
    onSuccess: (created) => {
      queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
          if (!oldData) return oldData
          const newPost: PostWithAuthor = { ...(created as PostWithAuthor) }
          return {
            ...oldData,
            posts: [newPost, ...(oldData.posts ?? [])],
            total: (oldData.total ?? 0) + 1,
          }
        },
      )
    },
  })

  const updatePostMutation = useMutation({
    mutationKey: ["posts", "update"],
    mutationFn: async (payload: Post) => updatePostApi(payload),
    onSuccess: (updated) => {
      queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
          if (!oldData) return oldData
          const posts = (oldData.posts ?? []).map((post) =>
            post.id === updated.id ? { ...post, ...updated } : post,
          )
          return { ...oldData, posts }
        },
      )
    },
  })

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

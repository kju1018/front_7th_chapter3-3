import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { postsTotalAtom } from "../../../entities/posts/model/postsAtoms"
import {
  fetchPostsApi,
  fetchPostsByTagApi,
  addPostApi,
  updatePostApi,
  deletePostApi,
  searchPostsApi,
} from "../../../entities/posts/api/postsApi"
import { AddPostPayload, Post } from "../../../entities/posts/model/types"
import { fetchUsersApi } from "../../../entities/users/api/usersApi"
import { postsWithAuthorAtom } from "./postsViewAtoms"

interface LoadPostsParams {
  limit: number
  skip: number
}

interface SearchPostsParams {
  query: string
}

interface LoadPostsByTagParams {
  tag: string
}

export const usePostsList = () => {
  const setPosts = useSetAtom(postsWithAuthorAtom)
  const setTotal = useSetAtom(postsTotalAtom)

  const loadPostsMutation = useMutation({
    mutationKey: ["posts", "load"],
    mutationFn: async ({ limit, skip }: LoadPostsParams) => {
      const [postsData, usersData] = await Promise.all([fetchPostsApi(limit, skip), fetchUsersApi()])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    },
  })

  const searchPostsMutation = useMutation({
    mutationKey: ["posts", "search"],
    mutationFn: async ({ query }: SearchPostsParams) => {
      const data = await searchPostsApi(query)
      setPosts(data.posts)
      setTotal(data.total)
    },
  })

  const loadPostsByTagMutation = useMutation({
    mutationKey: ["posts", "tag"],
    mutationFn: async ({ tag }: LoadPostsByTagParams) => {
      const [postsData, usersData] = await Promise.all([fetchPostsByTagApi(tag), fetchUsersApi()])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    },
  })

  const addPostMutation = useMutation({
    mutationKey: ["posts", "add"],
    mutationFn: async (payload: AddPostPayload) => {
      const created = await addPostApi(payload)
      setPosts((prev) => [created, ...prev])
      return created
    },
  })

  const updatePostMutation = useMutation({
    mutationKey: ["posts", "update"],
    mutationFn: async (payload: Post) => {
      const updated = await updatePostApi(payload)
      setPosts((prev) => prev.map((post) => (post.id === updated.id ? updated : post)))
      return updated
    },
  })

  const deletePostMutation = useMutation({
    mutationKey: ["posts", "delete"],
    mutationFn: async (id: number) => {
      await deletePostApi(id)
      setPosts((prev) => prev.filter((post) => post.id !== id))
    },
  })

  const loadPosts = useCallback(
    (params: LoadPostsParams) => loadPostsMutation.mutateAsync(params),
    [loadPostsMutation],
  )

  const searchPosts = useCallback(
    (params: SearchPostsParams) => searchPostsMutation.mutateAsync(params),
    [searchPostsMutation],
  )

  const loadPostsByTag = useCallback(
    (params: LoadPostsByTagParams) => loadPostsByTagMutation.mutateAsync(params),
    [loadPostsByTagMutation],
  )

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
    loadPosts,
    searchPosts,
    loadPostsByTag,
    addPost,
    updatePost,
    deletePost,
  }
}

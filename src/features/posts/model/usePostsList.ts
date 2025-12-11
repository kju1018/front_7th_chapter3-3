import { useCallback } from "react"
import { useSetAtom } from "jotai"
import { postsTotalAtom } from "../../../entities/posts/model/postsAtoms"
import { fetchPostsApi, fetchPostsByTagApi, addPostApi } from "../../../entities/posts/api/postsApi"
import { AddPostPayload } from "../../../entities/posts/model/types"
import { fetchUsersApi } from "../../../entities/users/api/usersApi"
import { postsWithAuthorAtom } from "./postsViewAtoms"
import { newPostAtom } from "./postFormAtoms"

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
  const resetNewPost = useSetAtom(newPostAtom)

  const loadPosts = useCallback(
    async ({ limit, skip }: LoadPostsParams) => {
      const [postsData, usersData] = await Promise.all([fetchPostsApi(limit, skip), fetchUsersApi()])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    },
    [setPosts, setTotal],
  )

  const searchPosts = useCallback(
    async ({ query }: SearchPostsParams) => {
      const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    },
    [setPosts, setTotal],
  )

  const loadPostsByTag = useCallback(
    async ({ tag }: LoadPostsByTagParams) => {
      const [postsData, usersData] = await Promise.all([fetchPostsByTagApi(tag), fetchUsersApi()])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    },
    [setPosts, setTotal],
  )

  const addPost = useCallback(
    async (payload: AddPostPayload) => {
      const created = await addPostApi(payload)
      setPosts((prev) => [created, ...prev])
      resetNewPost({ title: "", body: "", userId: 1 })
      return created
    },
    [setPosts, resetNewPost],
  )

  return {
    loadPosts,
    searchPosts,
    loadPostsByTag,
    addPost,
  }
}

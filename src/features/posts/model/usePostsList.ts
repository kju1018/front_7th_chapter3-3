import { useCallback } from "react"
import { useSetAtom } from "jotai"
import { postsTotalAtom } from "../../../entities/posts/model/postsAtoms"
import { fetchPostsApi } from "../../../entities/posts/api/postsApi"
import { fetchUsersApi } from "../../../entities/users/api/usersApi"
import { postsWithAuthorAtom } from "./postsViewAtoms"

interface LoadPostsParams {
  limit: number
  skip: number
}

export const usePostsList = () => {
  const setPosts = useSetAtom(postsWithAuthorAtom)
  const setTotal = useSetAtom(postsTotalAtom)

  const loadPosts = useCallback(async ({ limit, skip }: LoadPostsParams) => {
    const [postsData, usersData] = await Promise.all([fetchPostsApi(limit, skip), fetchUsersApi()])

    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  }, [setPosts, setTotal])

  return {
    loadPosts,
  }
}

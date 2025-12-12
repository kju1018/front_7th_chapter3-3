import { useQuery } from "@tanstack/react-query"
import { fetchPostsApi, fetchPostsByTagApi, searchPostsApi } from "../../../entities/posts/api/postsApi"
import { fetchUsersApi } from "../../../entities/users/api/usersApi"
import type { PostWithAuthor } from "./postsViewAtoms"

interface UsePostsListQueryOptions {
  skip: number
  limit: number
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
}

interface PostsListQueryResult {
  posts: PostWithAuthor[]
  total: number
  isLoading: boolean
  isError: boolean
}

export const usePostsListQuery = ({
  skip,
  limit,
  searchQuery,
  selectedTag,
}: UsePostsListQueryOptions): PostsListQueryResult => {
  // sortBy, sortOrder는 현재 서버 정렬에는 사용하지 않지만
  // 값이 바뀔 때마다 재조회가 되도록 쿼리 키에 포함시킨다.
  const query = useQuery({
    queryKey: ["posts", { skip, limit, searchQuery, selectedTag, sortBy, sortOrder }],
    queryFn: async () => {
      if (searchQuery) {
        const [postsData, usersData] = await Promise.all([searchPostsApi(searchQuery), fetchUsersApi()])

        const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post) => ({
          ...post,
          author: usersData.users.find((user) => user.id === post.userId),
        }))

        return { posts: postsWithUsers, total: postsData.total }
      }

      if (selectedTag && selectedTag !== "all") {
        const [postsData, usersData] = await Promise.all([fetchPostsByTagApi(selectedTag), fetchUsersApi()])

        const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post) => ({
          ...post,
          author: usersData.users.find((user) => user.id === post.userId),
        }))

        return { posts: postsWithUsers, total: postsData.total }
      }

      const [postsData, usersData] = await Promise.all([fetchPostsApi(limit, skip), fetchUsersApi()])

      const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return { posts: postsWithUsers, total: postsData.total }
    },
  })

  return {
    posts: query.data?.posts ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}

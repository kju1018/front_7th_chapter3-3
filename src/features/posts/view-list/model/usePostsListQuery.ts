import { useQuery } from "@tanstack/react-query"
import { fetchPostsApi, fetchPostsByTagApi, searchPostsApi } from "../../../../entities/posts/api/postsApi"
import { fetchUsersApi } from "../../../../entities/users/api/usersApi"
import type { PostWithAuthor } from "../../../../entities/posts/model/types"

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
  sortBy,
  sortOrder,
}: UsePostsListQueryOptions): PostsListQueryResult => {
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


import { Post } from "../model/types"

export interface PostsResponse {
  posts: Post[]
  total: number
}

export const fetchPostsApi = async (limit: number, skip: number): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

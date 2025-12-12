import { AddPostPayload, Post, PostsResponse } from "../model/types"
import { API_BASE_URL } from "../../../shared/api/apiConfig"

export const fetchPostsApi = async (limit: number, skip: number): Promise<PostsResponse> => {
  const response = await fetch(`${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

export const searchPostsApi = async (query: string): Promise<PostsResponse> => {
  const response = await fetch(`${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}`)
  const data = await response.json()
  return data
}

export const fetchPostsByTagApi = async (tag: string): Promise<PostsResponse> => {
  const response = await fetch(`${API_BASE_URL}/posts/tag/${tag}`)
  const data = await response.json()
  return data
}

export const addPostApi = async (payload: AddPostPayload): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data
}

export const updatePostApi = async (payload: Post): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data
}

export const deletePostApi = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
}

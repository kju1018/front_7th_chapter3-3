import { AddPostPayload, Post, PostsResponse } from "../model/types"

export const fetchPostsApi = async (limit: number, skip: number): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

export const fetchPostsByTagApi = async (tag: string): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}

export const addPostApi = async (payload: AddPostPayload): Promise<Post> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data
}

export const updatePostApi = async (payload: Post): Promise<Post> => {
  const response = await fetch(`/api/posts/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data
}

export const deletePostApi = async (id: number): Promise<void> => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}

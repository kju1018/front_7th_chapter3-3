import type { AddCommentPayload, Comment, CommentsResponse } from "../model/types"

export const fetchCommentsByPostApi = async (postId: number): Promise<CommentsResponse> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}

export const addCommentApi = async (payload: AddCommentPayload): Promise<Comment> => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data
}

export const updateCommentApi = async (id: number, body: string): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })
  const data = await response.json()
  return data
}

export const deleteCommentApi = async (id: number): Promise<void> => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}

import type { Comment } from "../../../entities/comments/api/commentsApi"

export const likeCommentApi = async (id: number, likes: number): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  const data = await response.json()
  return data
}

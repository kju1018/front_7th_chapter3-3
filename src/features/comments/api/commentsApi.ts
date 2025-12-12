import type { Comment } from "../../../entities/comments/model/types"
import { API_BASE_URL } from "../../../shared/api/apiConfig"

export const likeCommentApi = async (id: number, likes: number): Promise<Comment> => {
  const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  const data = await response.json()
  return data
}

import type { Tag } from "../model/types"
import { API_BASE_URL } from "../../../shared/api/apiConfig"

export const fetchTagsApi = async (): Promise<Tag[]> => {
  const response = await fetch(`${API_BASE_URL}/posts/tags`)
  const data = await response.json()
  return data
}


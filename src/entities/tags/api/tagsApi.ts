import type { Tag } from "../model/types"

export const fetchTagsApi = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}


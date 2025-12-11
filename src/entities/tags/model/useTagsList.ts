import { useCallback } from "react"
import { useSetAtom } from "jotai"
import { tagsAtom } from "./tagsAtoms"
import { fetchTagsApi } from "../api/tagsApi"

export const useTagsList = () => {
  const setTags = useSetAtom(tagsAtom)

  const loadTags = useCallback(async () => {
    try {
      const data = await fetchTagsApi()
      setTags(data)
    } catch {
      console.error("태그 가져오기 오류:", error)
    }
  }, [setTags])

  return {
    loadTags,
  }
}


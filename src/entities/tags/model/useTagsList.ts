import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { tagsAtom } from "./tagsAtoms"
import { fetchTagsApi } from "../api/tagsApi"

export const useTagsList = () => {
  const setTags = useSetAtom(tagsAtom)

  const { data, isLoading, error } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTagsApi,
  })

  useEffect(() => {
    if (data) {
      setTags(data)
    }
  }, [data, setTags])

  return {
    loading: isLoading,
    error,
  }
}

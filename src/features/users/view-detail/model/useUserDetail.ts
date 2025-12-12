import { useQuery } from "@tanstack/react-query"
import type { UserDetail } from "../../../../entities/users/model/types"
import { fetchUserByIdApi } from "../../../../entities/users/api/usersApi"

interface UseUserDetailOptions {
  userId: number | null
}

interface UseUserDetailResult {
  user: UserDetail | null
  loading: boolean
}

export const useUserDetail = ({ userId }: UseUserDetailOptions): UseUserDetailResult => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserByIdApi(userId as number),
    enabled: !!userId,
  })

  return { user: data ?? null, loading: isLoading }
}

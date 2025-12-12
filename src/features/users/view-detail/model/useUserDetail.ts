import { useEffect, useState } from "react"
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
  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId) {
      setUser(null)
      return
    }

    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchUserByIdApi(userId)
        if (!cancelled) {
          setUser(data)
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error)
        if (!cancelled) {
          setUser(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [userId])

  return { user, loading }
}


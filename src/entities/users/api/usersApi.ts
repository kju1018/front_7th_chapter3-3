import type { UserDetail, UsersResponse } from "../model/types"

export const fetchUsersApi = async (): Promise<UsersResponse> => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  const data = await response.json()
  return data
}

export const fetchUserByIdApi = async (id: number): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()
  return data
}

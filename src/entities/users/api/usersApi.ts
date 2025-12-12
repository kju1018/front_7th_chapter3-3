import type { UserDetail, UsersResponse } from "../model/types"
import { API_BASE_URL } from "../../../shared/api/apiConfig"

export const fetchUsersApi = async (): Promise<UsersResponse> => {
  const response = await fetch(`${API_BASE_URL}/users?limit=0&select=username,image`)
  const data = await response.json()
  return data
}

export const fetchUserByIdApi = async (id: number): Promise<UserDetail> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`)
  const data = await response.json()
  return data
}

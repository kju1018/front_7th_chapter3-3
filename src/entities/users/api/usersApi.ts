export interface UsersResponse {
  users: any[]
}

export const fetchUsersApi = async (): Promise<UsersResponse> => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  const data = await response.json()
  return data
}


export interface User {
  id: number
  username: string
  image: string
}

export interface UserAddress {
  address: string
  city: string
  state: string
}

export interface UserCompany {
  name: string
  title: string
}

export interface UserDetail extends User {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: UserAddress
  company: UserCompany
}

export interface UsersResponse {
  users: User[]
}

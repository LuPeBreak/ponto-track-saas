import { api } from './api-client'

export interface Vehicle {
  id: string
  name: string
  licensePlate: string | null
  ownerId: string
  updatedAt: Date
  owner: {
    id: string
    name: string | null
    avatarUrl: string | null
  }
  latitude?: number
  longitude?: number
}

interface GetVehiclesResponse {
  vehicles: Vehicle[]
}
export async function getVehicles(slug: string) {
  const result = await api
    .get(`organizations/${slug}/vehicles`)
    .json<GetVehiclesResponse>()

  return result
}

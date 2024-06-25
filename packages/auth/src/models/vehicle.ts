import { z } from 'zod'

export const vehicleSchema = z.object({
  __typename: z.literal('Vehicle').default('Vehicle'),
  id: z.string(),
  ownerId: z.string(),
})

export type Vehicle = z.infer<typeof vehicleSchema>

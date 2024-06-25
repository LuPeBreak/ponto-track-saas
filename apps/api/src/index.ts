import { defineAbilityFor, vehicleSchema } from '@ponto-track-saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

const vehicle = vehicleSchema.parse({ id: 'project-id', ownerId: 'user-id' })

console.log(ability.can('delete', vehicle))

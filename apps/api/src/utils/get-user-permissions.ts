import { defineAbilityFor, userSchema } from '@ponto-track-saas/auth'
import { type Role } from '@ponto-track-saas/auth'

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}

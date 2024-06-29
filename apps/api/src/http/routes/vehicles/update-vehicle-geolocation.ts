import { vehicleSchema } from '@ponto-track-saas/auth'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function updateVehicleGeolocation(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/vehicles/:vehicleId',
      {
        schema: {
          tags: ['vehicles'],
          summary: 'Update vehicle geolocation',
          security: [
            {
              bearerAuth: [],
            },
          ],
          body: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }),
          params: z.object({
            slug: z.string(),
            vehicleId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, vehicleId } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const vehicle = await prisma.vehicle.findUnique({
          where: { id: vehicleId, organizationId: organization.id },
        })

        if (!vehicle) {
          throw new BadRequestError('Vehicle not Found!')
        }

        const { cannot } = getUserPermissions(userId, membership.role)
        const authVehicle = vehicleSchema.parse(vehicle)

        if (cannot('update', authVehicle)) {
          throw new UnauthorizedError(
            `You're not allowed to update this vehicle.`,
          )
        }

        const { latitude, longitude } = request.body

        await prisma.vehicle.update({
          where: {
            id: vehicleId,
          },
          data: {
            latitude,
            longitude,
          },
        })

        return reply.status(204).send()
      },
    )
}

import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createVehicle(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/vehicles',
      {
        schema: {
          tags: ['vehicles'],
          summary: 'Create a new vehicle',
          security: [
            {
              bearerAuth: [],
            },
          ],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            name: z.string(),
            licensePlate: z.string().nullish(),
          }),
          response: {
            201: z.object({
              vehicleId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Vehicle')) {
          throw new UnauthorizedError(
            `You're not allowed to create new vehicles.`,
          )
        }

        const { name, licensePlate } = request.body

        const vehicle = await prisma.vehicle.create({
          data: {
            name,
            licensePlate,
            ownerId: userId,
            organizationId: organization.id,
          },
        })

        return reply.status(201).send({
          vehicleId: vehicle.id,
        })
      },
    )
}

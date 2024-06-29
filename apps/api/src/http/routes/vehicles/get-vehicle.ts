import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getVehicle(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/vehicles/:vehicleId',
      {
        schema: {
          tags: ['vehicles'],
          summary: 'Get vehicle details',
          security: [
            {
              bearerAuth: [],
            },
          ],
          params: z.object({
            slug: z.string(),
            vehicleId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              vehicle: z.object({
                id: z.string().uuid(),
                name: z.string(),
                licensePlate: z.string().nullable(),
                ownerId: z.string().uuid(),
                latitude: z.any().nullable(),
                longitude: z.any().nullable(),
                updatedAt: z.date(),
                owner: z.object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().url().nullable(),
                }),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug, vehicleId } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Vehicle')) {
          throw new UnauthorizedError(`You're not allowed to see this vehicle.`)
        }

        const vehicle = await prisma.vehicle.findUnique({
          where: {
            id: vehicleId,
            organizationId: organization.id,
          },
          select: {
            id: true,
            name: true,
            licensePlate: true,
            ownerId: true,
            latitude: true,
            longitude: true,
            updatedAt: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        })

        if (!vehicle) {
          throw new BadRequestError('Vehicle not found.')
        }

        return reply.send({ vehicle })
      },
    )
}

import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()
  // await prisma.vehicle.deleteMany()
  // await prisma.localization.deleteMany()

  const passwordHash = await hash('123456', 1)

  const user = await prisma.user.create({
    data: {
      name: 'luis felipe',
      email: 'luisfelipe@pts.com',
      avatarUrl: 'https://github.com/lupebreak.png',
      passwordHash,
    },
  })
  const anotherUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })
  const anotherUser2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  // ADMIN
  await prisma.organization.create({
    data: {
      name: 'PTS (Admin)',
      domain: 'pts.com',
      slug: 'ponto-track-saas-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      ownerId: user.id,
      vehicles: {
        createMany: {
          data: [
            {
              name: 'Truck1',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: user.id,
            },
            {
              name: 'Truck2',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
            {
              name: 'Truck3',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUser.id,
              role: 'MEMBER',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  // MEMBER
  await prisma.organization.create({
    data: {
      name: 'PTS (Member)',
      slug: 'ponto-track-saas-member',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      vehicles: {
        createMany: {
          data: [
            {
              name: 'Truck4',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
            {
              name: 'Truck5',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
            {
              name: 'Truck6',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'MEMBER',
            },
            {
              userId: anotherUser.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  // BILLING
  await prisma.organization.create({
    data: {
      name: 'PTS (Billing)',
      slug: 'ponto-track-saas-billing',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      vehicles: {
        createMany: {
          data: [
            {
              name: 'Truck7',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
            {
              name: 'Truck8',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
            {
              name: 'Truck9',
              licensePlate: faker.lorem.word(7),
              latitude: -23.296157710496868,
              longitude: -51.173159411651206,
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'BILLING',
            },
            {
              userId: anotherUser.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
})

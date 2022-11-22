import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // await prisma.$executeRawUnsafe(
  //   'drop table Organization, Site, Address, User, Permission, Inspection, Task, TaskLinks, Comment, Photo, Attachment;',
  // );

  const organization = await prisma.organization.upsert({
    where: { name: 'wanzek' },
    update: {},
    create: {
      name: 'wanzek',
      address: {
        create: {
          street: '123 Sesame Street',
          city: 'Miami',
          state: 'Florida',
          zip: '12345',
        },
      },
    },
  });

  const address = await prisma.address.upsert({
    where: { street_city_state: { street: '666 Side Street', city: 'San Andres', state: 'California' } },
    update: {},
    create: {
      street: '666 Side Street',
      city: 'San Andres',
      state: 'California',
      zip: '54321',
    },
  });

  const getSite = await prisma.site.findFirst({
    where: { name: 'East Point Location' },
  });

  let site;
  if (!getSite) {
    site = await prisma.site.create({
      data: {
        name: 'East Point Location',
        organizationId: organization.id,
        addressId: address.id,
      },
    });
  }

  const user = await prisma.user.upsert({
    where: { email: 'aaron.scherling@gmail.com' },
    update: {},
    create: {
      email: 'aaron.scherling@gmail.com',
      first: 'aaron',
      last: 'scherling',
      organizationId: organization.id,
      siteId: site?.id || '',
    },
  });

  const getInspection = await prisma.inspection.findFirst({
    where: { title: 'Wind Tower 1' },
  });

  let inspection;
  if (!getInspection) {
    inspection = await prisma.inspection.create({
      data: {
        ownerId: user.id,
        title: 'Wind Tower 1',
        description: 'Inspect the wind tower in the west end',
        status: 'PENDING',
        siteId: site?.id || '',
      },
    });
  }

  const getTask1 = await prisma.task.findFirst({
    where: { title: 'task1' },
  });
  const getTask2 = await prisma.task.findFirst({
    where: { title: 'task2' },
  });
  const getTask3 = await prisma.task.findFirst({
    where: { title: 'task3' },
  });
  const getTask4 = await prisma.task.findFirst({
    where: { title: 'task4' },
  });

  let task1;
  if (!getTask1) {
    task1 = await prisma.task.create({
      data: {
        title: 'task1',
        description: 'Test the concrete PH',
        inspectionId: inspection?.id || '',
        completedBy: user.id,
        Links: {
          create: [
            {
              info: 'Test Kit Manual',
              link: 'google.com',
            },
            {
              info: 'Wet Manual',
              link: 'pornhub.com',
            },
          ],
        },
      },
    });
  }

  if (!getTask2) {
    await prisma.task.create({
      data: {
        title: 'task2',
        description: 'Check the moisture content on the left slab',
        inspectionId: inspection?.id || '',
        completedBy: user.id,
      },
    });
  }

  if (!getTask3) {
    await prisma.task.create({
      data: {
        title: 'task3',
        description: 'Find the meaning to life',
        inspectionId: inspection?.id || '',
        completedBy: user.id,
      },
    });
  }

  if (!getTask4) {
    await prisma.task.create({
      data: {
        title: 'task4',
        description: 'Check durability by smashing with hammer',
        inspectionId: inspection?.id || '',
        completedBy: user.id,
      },
    });
  }

  const getComment1 = await prisma.comment.findFirst({
    where: { message: 'I think the metal is bent' },
  });
  const getComment2 = await prisma.comment.findFirst({
    where: { message: 'You must be blind, the metal looks fine' },
  });
  const getComment3 = await prisma.comment.findFirst({
    where: { message: 'You both wildin` in these comments' },
  });

  let comment1;
  if (!getComment1) {
    comment1 = await prisma.comment.upsert({
      where: { id: '1' },
      update: {},
      create: {
        userId: user.id,
        message: 'I think the metal is bent',
        taskId: task1?.id || '',
        inspectionId: inspection?.id || '',
      },
    });
  }

  let comment2;
  if (!getComment2) {
    comment2 = await prisma.comment.upsert({
      where: { id: '2' },
      update: {},
      create: {
        userId: user.id,
        message: 'You must be blind, the metal looks fine',
        parentId: comment1?.id || '',
        taskId: task1?.id || '',
        inspectionId: inspection?.id || '',
      },
    });
  }

  if (!getComment3) {
    await prisma.comment.upsert({
      where: { id: '3' },
      update: {},
      create: {
        userId: user.id,
        message: 'You both wildin` in these comments',
        parentId: comment2?.id || '',
        taskId: task1?.id || '',
        inspectionId: inspection?.id || '',
      },
    });
  }

  // const alice = await prisma.user.upsert({
  //   where: { email: 'alice@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //     posts: {
  //       create: {
  //         title: 'Check out Prisma with Next.js',
  //         content: 'https://www.prisma.io/nextjs',
  //         published: true,
  //       },
  //     },
  //   },
  // });
  // const bob = await prisma.user.upsert({
  //   where: { email: 'bob@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

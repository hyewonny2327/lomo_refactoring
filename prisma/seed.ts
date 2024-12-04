// import { fakerKO as faker } from '@faker-js/faker';

import prisma from '@/app/db';
// type UserType = {
//   id: string;
//   email?: string | null;
//   password?: string | null;
// };

async function seedUsers() {
  const userData = Array.from({ length: 1 }).map(() => ({
    email: 'dummy@email.com',
    password: '0000',
  }));

  try {
    if (userData.length > 0) {
      await prisma.user.createMany({ data: userData });
      console.log('Users seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

async function main() {
  await seedUsers();

  // seedRooms()
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

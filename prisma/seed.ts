// import { fakerKO as faker } from '@faker-js/faker';
// import prisma from '@/app/db';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
interface AvatarNumber {
  name: string;
  numbers: number[];
}

interface BodyType {
  id: number; // Optional if not used in seeding
  type: string;
  avatarNumbers: AvatarNumber[];
}
interface TextBlock {
  type: string;
  summary: string;
  stylingTips: stylingTip;
}
interface stylingTip {
  description: string;
  tips: tip[];
}
interface tip {
  category: string;
  description: string;
}
// type UserType = {
//   id: string;
//   email?: string | null;
//   password?: string | null;
// };
const prisma = new PrismaClient();
async function readJSONFile(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data); // JSON 데이터 반환
  } catch (error) {
    console.error(`Failed to read file ${filePath}:`, error);
    throw error;
  }
}

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
async function seedBodyType() {
  const bodyTypeData: BodyType[] = await readJSONFile('prisma/bodyType.json');

  await Promise.all(
    bodyTypeData.map((bodyType) =>
      prisma.bodyType.create({
        data: {
          type: bodyType.type,
          summary: null, // summary는 이후 업데이트
          avatarNumbers: {
            create: bodyType.avatarNumbers.map((avatar) => ({
              name: avatar.name,
              numbers: avatar.numbers,
            })),
          },
        },
      })
    )
  );

  console.log('BodyType array seeded!');
}

async function seedTextBlock() {
  const textBlockData: TextBlock[] = await readJSONFile('prisma/textBlock.json');

  await Promise.all(
    textBlockData.map(async (textBlock) => {
      const existingBodyType = await prisma.bodyType.findUnique({
        where: { type: textBlock.type },
      });

      if (!existingBodyType) {
        console.error(`BodyType with type "${textBlock.type}" not found`);
        return;
      }

      await prisma.bodyType.update({
        where: { id: existingBodyType.id },
        data: {
          summary: textBlock.summary,
          stylingTips: {
            create: {
              description: textBlock.stylingTips.description,
              tips: {
                create: textBlock.stylingTips.tips.map((tip) => ({
                  category: tip.category,
                  description: tip.description,
                })),
              },
            },
          },
        },
      });
    })
  );

  console.log('TextBlock array seeded!');
}

async function main() {
  // await seedUsers();
  await seedBodyType();
  await seedTextBlock();

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

// import { fakerKO as faker } from '@faker-js/faker';
// import prisma from '@/app/db';
import { BodyType, TextBlock } from '@/app/types/types';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

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

// async function seedUsers() {
//   const userData = Array.from({ length: 1 }).map(() => ({
//     email: 'dummy@email.com',
//     password: '0000',
//   }));

//   try {
//     if (userData.length > 0) {
//       await prisma.user.createMany({ data: userData });
//       console.log('Users seeded successfully!');
//     }
//   } catch (error) {
//     console.error('Error seeding users:', error);
//   }
// }
async function seedBodyType() {
  const bodyTypeData: BodyType[] = await readJSONFile('prisma/bodyType.json');
  for (const bodyType of bodyTypeData) {
    const createdBodyType = await prisma.bodyType.create({
      data: {
        type: bodyType.type,
      },
    });
    await Promise.all(
      bodyType.avatarNumbers.map((avatar) =>
        prisma.avatarNumber.create({
          data: {
            name: avatar.name,
            numbers: avatar.numbers,
            bodyTypeId: createdBodyType.id, // BodyType과 연결
          },
        })
      )
    );
  }

  console.log('BodyType array seeded!');
}

async function seedResultText() {
  const resultTextData: TextBlock[] = await readJSONFile('prisma/textBlock.json');

  for (const resultText of resultTextData) {
    const createdResultText = await prisma.resultText.create({
      data: {
        type: resultText.type,
        summary: resultText.summary,
      },
    });
    if (resultText.stylingTips) {
      const createdStylingTip = await prisma.stylingTip.create({
        data: {
          description: resultText.stylingTips.description,
          resultText: {
            connect: { id: createdResultText.id }, // StylingTip과 ResultText 연결
          },
        },
      });

      await Promise.all(
        resultText.stylingTips.tips.map((tip) =>
          prisma.tip.create({
            data: {
              category: tip.category,
              description: tip.description,
              stylingTipId: createdStylingTip.id, // Tip과 StylingTip 연결
            },
          })
        )
      );
    }
  }

  console.log('ResultText array seeded!');
}

async function main() {
  // await seedUsers();
  await seedBodyType();
  await seedResultText();

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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const karl = await prisma.user.create({
    data: {
      display_name: "Karl Linne",
      username: "linnek",
    },
  });
  const chuck = await prisma.user.create({
    data: {
      display_name: "Charles Darwin",
      username: "darwinc",
    },
  });

  console.log({ karl, chuck });

  const behaviors = [
    { behavior_name: "Sleeping", description: "Defined by respiration rate." },
    { behavior_name: "Grooming" },
    { behavior_name: "Eating" },
    { behavior_name: "Playing" },
  ];

  let thisBehavior;

  for (const e in behaviors) {
    let thisBehavior = await prisma.behavior.create({
      data: behaviors[e],
    });
    console.log(thisBehavior);
  }
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

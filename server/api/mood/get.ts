import { prisma } from "~/prisma"

export default defineEventHandler(async (event) => {
  console.log(666);

  return prisma.mood.findMany()
})
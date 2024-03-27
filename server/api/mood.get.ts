import { prisma } from "~/prisma"

export default defineEventHandler(async (event) => {
  console.log("get");

  return prisma.mood.findMany()
})
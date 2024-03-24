import { prisma } from "~/prisma"

export default defineEventHandler(async (event) => {
  return prisma.mood.findMany()
})
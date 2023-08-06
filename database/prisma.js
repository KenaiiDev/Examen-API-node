import { PrismaClient } from "@prisma/client";
import roles from "../helpers/roles.js";

const prisma = new PrismaClient();

export const prismaClientSoftDelete = prisma.$extends({
  name: "PrismaClientWithSoftDelete",
  query: {
    $allModels: {
      async create({ args, query, model }) {
        const data = {
          ...args.data,
          deletedAt: null,
        };
        if (model === "user") {
          data.role = roles.USER;
        }

        return prisma[model].create({
          ...args,
          data,
        });
      },

      async findMany({ args, query, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findMany(args);
      },

      async findOne({ args, query, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findOne(args);
      },

      async findUnique({ args, query, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        console.log(`args: ${args}`);
        return prisma[model].findUnique(args);
      },

      async findFirst({ args, query, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findFirst(args);
      },

      async findUnique({ args, query, model }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };
        return prisma[model].findUnique(args);
      },

      async delete({ model, args }) {
        const data = {
          deletedAt: new Date(),
        };
        return prisma[model].update({
          ...args,
          data,
        });
      },
    },
  },
});

export default prisma;

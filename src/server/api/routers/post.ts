import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import faker from 'faker';

const categories = [];
for (let i = 0; i < 100; i++) {
  categories.push(faker?.commerce.department());
}

export const postRouter = createTRPCRouter({
  getCategories: publicProcedure.query(() => {
    return categories;
  }),
});
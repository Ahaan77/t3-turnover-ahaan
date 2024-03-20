import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// @ts-expect-error: Safe usage ensured by faker
import faker from 'faker';

const categories: string[] = [];
for (let i = 0; i < 100; i++) {
  categories.push(faker?.commerce?.department());
}

export const postRouter = createTRPCRouter({
  getCategories: publicProcedure.query(() => {
    return categories;
  }),
});

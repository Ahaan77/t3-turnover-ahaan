import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { interestsCategories } from "~/static/index";

export const postRouter = createTRPCRouter({
  getCategories: publicProcedure.query(() => {
    return interestsCategories;
  }),
});

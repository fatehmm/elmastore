import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  userImageUpdate: protectedProcedure
    .input(z.object({ id: z.string(), url: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(users)
        .set({ image: input.url })
        .where(eq(users.id, input.id))
        .returning({ updatedId: users.id });
    }),
});

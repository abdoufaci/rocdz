import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0].emailAddress;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

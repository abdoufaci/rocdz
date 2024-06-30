"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { InviteUserformSchema } from "@/components/forms/InviteForm";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { z } from "zod";

export const inviteUser = async ({
  email,
}: z.infer<typeof InviteUserformSchema>) => {
  const currentUser = await getCurrentUser();

  if (currentUser?.role != "MANAGER") {
    throw Error("Unauthorized");
  }

  try {
    await db.user.create({
      data: {
        email,
        role: Role.EMPLOYEE,
        activated: false,
      },
    });
  } catch (error) {
    console.log("Failed to invite user cuz >>>>", error);
    throw new Error("Failed to invite user");
  }

  await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
    identifier: email,
    notify: true,
  });
};

"use server";

import { revalidatePath } from "next/cache";

export async function likePost(postId: string, currentLikes: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Post ${postId} ahora tiene ${currentLikes + 1} likes`);
  
  revalidatePath("/");
  
  return currentLikes + 1;
}
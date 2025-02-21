"use client";

import { useOptimistic, useTransition } from "react";
import { likePost } from "@/actions";

export function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(initialLikes);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLikes((prevLikes) => prevLikes + 1); 
      await likePost(postId, optimisticLikes);
    });
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      👍 {optimisticLikes} {isPending && "(Updating...)"}
    </button>
  );
}
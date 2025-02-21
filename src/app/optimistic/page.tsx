import { LikeButton } from "@/components";

export default function Optimistic() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">React 19 - useOptimistic Example</h1>
      <LikeButton postId="123" initialLikes={10} />
    </div>
  );
}
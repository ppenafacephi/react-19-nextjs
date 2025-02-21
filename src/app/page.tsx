// app/page.tsx
import { use } from "react";
import { getLaunches } from "@/actions";
import { LaunchTable } from "@/components";

export default function Home() {
  const initialData = use(getLaunches());

  return <LaunchTable initialData={initialData} />;
}
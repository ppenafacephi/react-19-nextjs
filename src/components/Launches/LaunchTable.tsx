"use client";
import { useTransition, useState} from "react";
import { getLaunches } from "../../actions";
import { Launch } from "@/models";
import { Loading } from '@/components';

export function LaunchTable({ initialData }: { initialData: Launch[] }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();


  const handlePageChange = (newPage: number) => {
    startTransition(async () => {
      const newData = await getLaunches(newPage);
      setPage(newPage);
      setData(newData);
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Actions and Use Transition</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Id</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Rocket</th>
          </tr>
        </thead>
        <tbody>
          {isPending && <tr>
            <td colSpan={3} className="text-center py-10">
              <Loading show={isPending} />
            </td>
          </tr>}
          {data?.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-400 px-4 py-2">{item.id}</td>
              <td className="border border-gray-400 px-4 py-2">{item.name}</td>
              <td className="border border-gray-400 px-4 py-2">{item.rocket.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
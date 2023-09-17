import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { GetServerSidePropsContext } from "next";
import { api } from "@/services/api/api";

interface PedidosProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pedidos: any[];
}

export async function getServerSideProps() {
  const request = await api.get("/users");

  const pedidos = await request.data;

  console.log(pedidos);

  return {
    props: {
      pedidos: pedidos,
    },
  };
}

export default function Pedidos({ pedidos }: PedidosProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatePosts = paginate(pedidos, currentPage, pageSize);

  return (
    <div className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col justify-start h-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {paginatePosts.map((post: any) => (
              <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  {post.id}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {post.name}
                </th>
                <td className="px-6 py-4">
                  Silver
                </td>
                <td className="px-6 py-4">
                  Laptop
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sticky bottom-2 mt-4">
        <Pagination
          items={pedidos.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>

  );
}
import React, { ReactNode, useState } from "react";
import { BsSearch, BsPencil, BsTrash } from "react-icons/bs";
import { ButtonTable } from "../Table/ButtonTable";
import { Table } from "@/components/Table/index";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

export default function Lov({
  listValues,
  listLabels,
  title,
  onClick,
  ...props
}: LovType) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const queryRegister = z.object({
    nome: z.string(),
  });

  type ValidateData = z.infer<typeof queryRegister>;

  const {
    register,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onChange",
    resolver: zodResolver(queryRegister),
  });

  const { reload, query, push } = useRouter();

  const pageQueries = query as PaginationParams;

  const onPageChange = (page: number) => {
    if (page != Number(pageQueries.page)) {
      push({
        query: {
          page: page,
        },
      });
    }
  };

  const onClickLov = (value: any[]) => {
    onClick(value);
    toggleIsOpen();
  };

  return (
    <div>
      <ButtonTable
        type="button"
        variant={"primarySecondary"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center text-xl dark:bg-secondary dark:text-white aspect-square rounded-lg py-2 h-10 mr-3"
      >
        <BsSearch />
      </ButtonTable>
      {isOpen && (
        <div
          onClick={toggleIsOpen}
          className="z-[9999] w-screen h-full absolute top-0 left-0 p-10 bg-black/50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white dark:bg-theme-dark.150 p-4 rounded-md flex-col flex gap-2`}
          >
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={toggleIsOpen}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col">
              <Input
                className="col-span-2 md:col-span-9 mb-1"
                {...register("nome")}
                htmlFor="nome"
                type="text"
                placeholder="Pesquisar"
              />
              <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
                <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                  <Table.Header
                    headers={listLabels}
                    className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  />
                  <Table.Body className="overflow-y-auto">
                    {listValues?.content.map((value, index) => (
                      <Table.Tr
                        key={index}
                        onClick={() => onClickLov(value)}
                        className="bg-white border-b dark:bg-theme-dark.150 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        {
                          Object.values(value).map((valor: any) => (
                            typeof valor !== 'object' && <Table.Td>{valor}</Table.Td>
                          ))
                        }
                      </Table.Tr>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
            </div>
            <div className="sticky bottom-2 mt-4">
              {/*               <Pagination
                totalPages={listValues?.pagination?.totalPages}
                totalItems={listValues?.pagination?.totalItems}
                nextPage={listValues?.pagination?.nextPage}
                prevPage={listValues?.pagination?.prevPage}
                currentPage={Number(listValues?.pagination?.currentPage)}
                onPageChange={onPageChange}
              />
 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { MountTransition } from "@/components/AnimatedRoutes/MountTransition/index";
// import { Table } from "@/components/Table/index";
// import { RootTable } from "@/components/Table/RootTable";

// export default function Clientes() {

//     const headers = ["id", "nome", "telefone"]

//     return <MountTransition >
//         <Table.Root>
//         <Table.Header  headers={headers}/>
//         <Table.Body>
//             <Table.Tr>
//                 <Table.Td>
//                     salve
//                 </Table.Td>
//                 <Table.Td>
//                     salve
//                 </Table.Td>
//                 <Table.Td>
//                     salve
//                 </Table.Td>
//             </Table.Tr>
//         </Table.Body>
//     </Table.Root>
//     </MountTransition> 
// }

import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { GetServerSidePropsContext } from "next";
import { api } from "@/services/api/api";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import moment from "moment";
import "moment/locale/pt-br";
import { BsCartPlus } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";
import { max } from "lodash";

interface ClientesProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  clientes: any[];
}

export async function getServerSideProps() {
  const request = await api.get('/clientes');
  const clientes = await request.data;
  return {
    props: {
      clientes,
    },
  };
}

export default function Clientes({ clientes }: ClientesProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };

  const toggleRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };

  const validateRegister = z.object({
    codigoCliente: z.string().nonempty("Campo obrigatório"),
    nomeCliente: z.string().nonempty('Campo obrigatório'),
    emailCliente: z.string().email('Email inválido'),
    telefoneCliente: z.string().nonempty('Campo obrigatório'),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateData>({
    mode: 'onSubmit',
    resolver: zodResolver(validateRegister),
  });

  const submitForm = async ({codigoCliente, nomeCliente, emailCliente, telefoneCliente}: ValidateData) => {
    try {
        console.log("algo")
      } catch (error: any) {
        return;
  };
  }
  const paginateClientes = paginate(clientes, currentPage, pageSize);

  return (
        <MountTransition className="flex flex-1 flex-col h-full justify-between">
        <div className="flex flex-1 flex-col h-full justify-between">
        <Modal
            isOpen={isOpenDetails}
            toggle={toggleDetails}
            title="Detalhes do Cliente"
        >
             Conteudo do modal

        </Modal>
        <Modal
            isOpen={isOpenRegister}
            toggle={toggleRegister}
            title="Cadastrar Cliente"
            className="w-[29rem] h-[33rem]"
        >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-row gap-4">
            <Input
                  {...register("codigoCliente")}
                  label="Código Cliente"
                  htmlFor="codigoCliente"
                  errorMessage={errors.codigoCliente?.message}
                  type="number"
                  placeholder="Código do cliente"
                  className="w-40"
            />
             <Input
                  {...register("nomeCliente")}
                  label="Nome Cliente"
                  htmlFor="nomeCliente"
                  errorMessage={errors.nomeCliente?.message}
                  type="text"
                  placeholder="Nome do Cliente"
                  className="w-64"
                />
            </div>
            <div className="flex flex-row gap-4">
            <Input
                {...register('emailCliente')}
                label="Email"
                errorMessage={errors.emailCliente?.message}
                placeholder="Email do cliente"
                className="w-40"
            />
            <Input
                {...register('telefoneCliente')}
                label="Telefone"
                errorMessage={errors.telefoneCliente?.message}
                placeholder="Telefone do cliente"
                className="w-40"
            />
            </div>
            <Button type="submit">Cadastrar</Button>
            </form>
        
        </Modal>
        <button onClick={toggleRegister}>Cadastrar Novo Cliente</button>
        <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    
        </Table.Root> 
        <Pagination
            items={clientes.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
        />
        </div>
       </MountTransition>
  );
}

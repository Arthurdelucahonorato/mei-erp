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

import { useState } from "react";
import { paginate } from "@/utils/paginate";
import { api } from "@/services/api/api";
import moment from "moment";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";

interface ClientesProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  clientes: any[];
}

export async function getServerSideProps() {
  const request = await api.get("/users");
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
    nomeCliente: z.string().nonempty("Campo obrigatório"),
    emailCliente: z.string().email("Email inválido"),
    telefoneCliente: z.string().nonempty("Campo obrigatório"),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

  const submitForm = async ({
    codigoCliente,
    nomeCliente,
    emailCliente,
    telefoneCliente,
  }: ValidateData) => {
    try {
      console.log("algo");
    } catch (error: any) {
      return;
    }
  };
  const paginateClientes = paginate(clientes, currentPage, pageSize);

  const headers = ["id", "nome", "telefone"];

  return (
    <MountTransition>
      <Table.Root>
        <Table.Header headers={headers} />
        <Table.Body>
          <Table.Tr>
            <Table.Td>salve</Table.Td>
            <Table.Td>salve</Table.Td>
            <Table.Td>salve</Table.Td>
          </Table.Tr>
        </Table.Body>
      </Table.Root>
    </MountTransition>
  );
}

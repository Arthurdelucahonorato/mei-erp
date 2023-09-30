import { useState } from "react";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import moment from "moment";
import "moment/locale/pt-br";
import { BsCartPlus, BsPencil, BsTrash } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { getAllRequests } from "@/services/api/adm/get-all-requests";
import { ButtonTable } from "@/components/Table/ButtonTable";
import Lov from "@/components/Lov";

interface ClienteProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  clientes: ClientRequest[];
}

export async function getServerSideProps() {
  const clientes = await getAllRequests("clientes");

  return {
    props: {
      clientes: clientes,
    },
  };
}

export default function Clientes({ clientes }: ClienteProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [isOpenClienteRegister, setIsOpenClienteRegister] = useState(false);
  const [isOpenClienteEdit, setIsOpenClienteEdit] = useState(false);
  const [lovIsOpen, setLovIsOpen] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toogleClienteRegister = () => {
    setIsOpenClienteRegister(!isOpenClienteRegister);
  };
  const toogleClienteEdit = () => {
    setIsOpenClienteEdit(!isOpenClienteEdit);
  };

  const validateRegister = z.object({
    codigoCliente: z.string(),
    nomeCliente: z.string().nonempty("Campo obrigatório"),
    telefone: z.string().nonempty("Campo obrigatório"),
    email: z.string(),
    cep: z.string().nonempty("Campo obrigatório"),
    cidade: z.string(),
    bairro: z.string().nonempty("Campo obrigatório"),
    rua: z.string().nonempty("Campo obrigatório"),
    numero: z.string().nonempty("Campo obrigatório"),
    complemento: z.string(),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister)
  });

  const submitFormRegister = async ({
    codigoCliente,
    nomeCliente,
    email,
    telefone,
    cep,
    cidade,
    bairro,
    rua,
    numero,
    complemento
  }: ValidateData) => {
    try {
      alert("Cadastrou");
    } catch (error: any) {
      console.log(error);
      return;
    }
  };
  const submitFormEdit = async ({
    codigoCliente,
    nomeCliente,
    email,
    telefone,
    cep,
    cidade,
    bairro,
    rua,
    numero,
    complemento
  }: ValidateData) => {
    try {
      console.log("Editou");
    } catch (error: any) {
      return;
    }
  };

  const paginateClientes = paginate(clientes, currentPage, pageSize);

  interface FormClienteType {
    formClienteIsOpen: boolean;
    titleModal: String;
    toogleFormCliente: () => void;
    submitFormCliente: () => void;
  }

  const FormCliente = ({ formClienteIsOpen, titleModal, toogleFormCliente, submitFormCliente, ...props }: FormClienteType) => {
    return (
      <Modal
        isOpen={formClienteIsOpen}
        toggle={toogleFormCliente}
        title={titleModal}
      >
        <form
          className="max-w-2xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
          onSubmit={submitFormCliente}
        >
          <Input className="col-span-3 md:col-span-12"
            {...register("nomeCliente")}
            label="Nome"
            htmlFor="nomeCliente"
            errorMessage={errors.nomeCliente?.message}
            type="text"
            placeholder="Nome do Cliente"
            required
          />
          <Input
            {...register("email")}
            className="col-span-2 md:col-span-8"
            label="E-mail"
            htmlFor="email"
            type="text"
            placeholder="E-mail"
          />
          <Input className="col-span-1 md:col-span-4"
            {...register("telefone")}
            label="Telefone"
            htmlFor="telefone"
            errorMessage={errors.telefone?.message}
            type="text"
            placeholder="Telefone"
            required
          />
          <Input
            className="col-span-1 md:col-span-2"
            {...register("cep")}
            label="CEP"
            htmlFor="cep"
            errorMessage={errors.cep?.message}
            type="number"
            placeholder="CEP"
            required
          />
          <Input
            {...register("cidade")}
            className="col-span-2 md:col-span-10"
            label="Cidade"
            htmlFor="cidade"
            type="text"
            placeholder="Cidade"
            disabled
          />
          <Input
            className="col-span-1 md:col-span-5"
            {...register("bairro")}
            label="Bairro"
            htmlFor="bairro"
            errorMessage={errors.bairro?.message}
            type="text"
            placeholder="Bairro"
            required
          />
          <Input
            className="col-span-2 md:col-span-5"
            {...register("rua")}
            label="Rua"
            htmlFor="rua"
            errorMessage={errors.rua?.message}
            type="text"
            placeholder="Rua"
            required
          />
          <Input
            className="col-span-1 md:col-span-2"
            {...register("numero")}
            label="Número"
            htmlFor="numero"
            errorMessage={errors.numero?.message}
            type="text"
            placeholder="Número"
            required
          />
          <Input
            {...register("complemento")}
            className="col-span-2 md:col-span-12"
            label="Complemento"
            htmlFor="complemento"
            type="text"
            placeholder="Complemento"
          />
          <div className="ml-auto col-span-3 md:col-span-12">
            <Button onClick={() => submitFormCliente()}>{titleModal}</Button>
          </div>
        </form>
      </Modal>
    );

  }

  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        {/*         <Modal
          isOpen={isOpenDetails}
          toggle={toggleDetails}
          title={"Editar Cliente"}
        >
          Conteudo do modal
        </Modal> */}

        <FormCliente
          formClienteIsOpen={isOpenClienteRegister}
          toogleFormCliente={toogleClienteRegister}
          titleModal={"Cadastrar Cliente"}
          submitFormCliente={handleSubmit(submitFormRegister)}
        />
        <FormCliente
          formClienteIsOpen={isOpenClienteEdit}
          toogleFormCliente={toogleClienteEdit}
          titleModal={"Editar Cliente"}
          submitFormCliente={handleSubmit(submitFormEdit)}
        />

        <div className="flex justify-between m-1 max-h-12">
          <div className="relative"></div>
          <div className="flex aspect-square">
            <Button onClick={() => toogleClienteRegister()}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Cliente
              </div>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={[
                "ID",
                "Nome",
                "Telefone",
                "E-mail",
                "Endereço",

              ]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {paginateClientes.map((cliente) => (
                <Table.Tr key={cliente.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Table.Td className="w-4 p-4">{cliente.id}</Table.Td>
                  <Table.Td scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">{cliente.nome}</Table.Td>
                  <Table.Td>{cliente.telefone}</Table.Td>
                  <Table.Td>{cliente.email}</Table.Td>
                  <Table.Td>{cliente.endereco}</Table.Td>
                  <Table.Td isButton={true}>
                    <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                      <ButtonTable onClick={() => toogleClienteEdit()} >
                        <BsPencil className={"text-lg"} />
                      </ButtonTable>
                      <ButtonTable className="bg-red-600 dark:bg-red-600 text-white">
                        <BsTrash className={"text-lg"} />
                      </ButtonTable>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Body>
          </Table.Root>
        </div>

        <div className="sticky bottom-2 mt-4">
          <Pagination
            items={clientes.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}

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
import { getAllRequests } from "@/services/api/requests/get-all-requests";
import { ButtonTable } from "@/components/Table/ButtonTable";
import Lov from "@/components/Lov";
import ComboBox from "@/components/ComboBox";
const valoresCombo = [
  { value: "QUILOGRAMAS", name: "kg" },
  { value: "UNIDADE", name: "un" },
];

interface ProdutoProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  produto: Product[];
}

export async function getServerSideProps() {
  // const produtos = await getAllRequests();

  return {
    props: {
      // produtos: produtos,
    },
  };
}

export default function produtos({ produto }: ProdutoProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [isOpenProdutoRegister, setIsOpenProdutoRegister] = useState(false);
  const [isOpenProdutoEdit, setIsOpenProdutoEdit] = useState(false);
  const [lovIsOpen, setLovIsOpen] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toogleProdutoRegister = () => {
    setIsOpenProdutoRegister(!isOpenProdutoRegister);
  };
  const toogleProdutoEdit = () => {
    setIsOpenProdutoEdit(!isOpenProdutoEdit);
  };

  const validateRegister = z.object({
    codigoProduto: z.string(),
    nomeProduto: z.string().nonempty("Campo obrigatório"),
    categoria: z.string().nonempty("Campo obrigatório"),
    variacao: z.string(),
    unidade: z.string().nonempty("Campo obrigatório"),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

  const submitFormRegister = async ({
    codigoProduto,
    nomeProduto,
    variacao,
    categoria,
    unidade,
  }: ValidateData) => {
    try {
      alert("Cadastrou");
    } catch (error: any) {
      console.log(error);
      return;
    }
  };
  const submitFormEdit = async ({
    codigoProduto,
    nomeProduto,
    variacao,
    categoria,
    unidade,
  }: ValidateData) => {
    try {
      console.log("Editou");
    } catch (error: any) {
      return;
    }
  };

  const paginateProduto = paginate([], currentPage, pageSize);

  interface FormProdutoType {
    formProdutoIsOpen: boolean;
    titleModal: String;
    toogleFormProduto: () => void;
    submitFormProduto: () => void;
  }

  const FormProduto = ({
    formProdutoIsOpen,
    titleModal,
    toogleFormProduto,
    submitFormProduto,
    ...props
  }: FormProdutoType) => {
    return (
      <Modal
        isOpen={formProdutoIsOpen}
        toggle={toogleFormProduto}
        title={titleModal}
      >
        <form
          className="max-w-2xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
          onSubmit={submitFormProduto}
        >
          <Input
            className="col-span-3 md:col-span-12"
            {...register("nomeProduto")}
            label="Nome"
            htmlFor="nomeProduto"
            errorMessage={errors.nomeProduto?.message}
            type="text"
            placeholder="Nome do Produto"
            required
          />
          <Input
            {...register("variacao")}
            className="col-span-2 md:col-span-8"
            label="Variação"
            htmlFor="variacao"
            type="text"
            placeholder="Variação"
          />
          <Input
            className="col-span-1 md:col-span-4"
            {...register("categoria")}
            label="Categoria"
            htmlFor="categoria"
            errorMessage={errors.categoria?.message}
            type="text"
            placeholder="Categoria"
            required
          />

          {/* <Input
            className="col-span-1 md:col-span-2"
            {...register("unidade")}
            label="Unidade"
            htmlFor="unidade"
            errorMessage={errors.unidade?.message}
            type="number"
            placeholder="Unidade"
            required
          /> */}

          <div>
            <ComboBox
              // currentValue={valoresCombo[0]}
              values={valoresCombo}
              label="Categoria do produto"
              onChangeValue={function (v: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>

          <div className="ml-auto col-span-3 md:col-span-12">
            <Button onClick={() => submitFormProduto()}>{titleModal}</Button>
          </div>
        </form>
      </Modal>
    );
  };

  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        {/*         <Modal
          isOpen={isOpenDetails}
          toggle={toggleDetails}
          title={"Editar Produto"}
        >
          Conteudo do modal
        </Modal> */}

        <FormProduto
          formProdutoIsOpen={isOpenProdutoRegister}
          toogleFormProduto={toogleProdutoRegister}
          titleModal={"Cadastrar Produto"}
          submitFormProduto={handleSubmit(submitFormRegister)}
        />
        <FormProduto
          formProdutoIsOpen={isOpenProdutoEdit}
          toogleFormProduto={toogleProdutoEdit}
          titleModal={"EditarProduto"}
          submitFormProduto={handleSubmit(submitFormEdit)}
        />

        <div className="flex justify-between m-1 max-h-12">
          <div className="relative"></div>
          <div className="flex aspect-square">
            <Button onClick={() => toogleProdutoRegister()}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Produto
              </div>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={["ID", "Nome", "Categoria", "Unidade"]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {paginateProduto.map((produto) => (
                <Table.Tr
                  key={produto.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Table.Td className="w-4 p-4">{produto.id}</Table.Td>
                  <Table.Td
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {produto.nome}
                  </Table.Td>
                  <Table.Td>{produto.categoria}</Table.Td>
                  <Table.Td>{produto.variacao}</Table.Td>

                  <Table.Td isButton={true}>
                    <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                      <ButtonTable onClick={() => toogleProdutoEdit()}>
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
            items={produto?.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}

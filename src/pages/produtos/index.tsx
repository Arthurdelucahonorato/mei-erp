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
import { getAllProducts } from "@/services/api/products/get-all-products";
import { getAllCategories } from "@/services/api/categories/get-all-categories";
import { getAllVariations } from "@/services/api/variations/get-all-variations";
import { createProduct } from "@/services/api/products/create-product";
import { Unit } from "@/types/enum/unit.enum";
const valoresCombo = [
  { value: "QUILOGRAMAS", name: "kg" },
  { value: "UNIDADE", name: "un" },
];

interface ProdutoProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  produtos: Product[];
  categorias: Category[];
  variacoes: Variation[];
}

export async function getServerSideProps() {
  const produtos = await getAllProducts();

  const categorias = await getAllCategories();

  const variacoes = await getAllVariations();

  return {
    props: {
      produtos: produtos,
      categorias: categorias,
      variacoes: variacoes,
    },
  };
}

export default function produtos({
  produtos,
  categorias,
  variacoes,
}: ProdutoProps) {
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
    imagensProduto: z.any().optional(),
    descricao: z.string().nonempty("Campo obrigatório"),
    categoriaId: z.string().nonempty("Campo obrigatório"),
    variacaoId: z.string(),
    unidade: z.nativeEnum(Unit),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

  const categoriesOptions = categorias.map((categoria) => {
    return {
      value: String(categoria.id),
      name: categoria.descricao,
    };
  });
  const variationOptions = variacoes.map((variacao) => {
    return {
      value: String(variacao.id),
      name: variacao.descricao,
    };
  });

  const submitFormRegister = async (data: ValidateData) => {
    try {
      const formData = new FormData();

      if (data.imagensProduto) {
        formData.append("imagensProduto", data.imagensProduto[0]);
      }
      formData.append("descricao", data.descricao);
      formData.append("categoriaId", data.categoriaId.toString());
      formData.append("variacaoId", data.variacaoId.toString());
      formData.append("unidade", data.unidade);

      const created = await createProduct(formData);
    } catch (error: any) {
      console.log(error);
      return;
    }
  };
  // const submitFormEdit = async ({
  //   codigoProduto,
  //   nomeProduto,
  //   variacao,
  //   categoria,
  //   unidade,
  // }: ValidateData) => {
  //   try {
  //     console.log("Editou");
  //   } catch (error: any) {
  //     return;
  //   }
  // };

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
          onSubmit={handleSubmit(submitFormRegister)}
        >
          <Input
            className="col-span-3 md:col-span-12"
            {...register("descricao")}
            label="Nome"
            htmlFor="nomeProduto"
            errorMessage={errors.descricao?.message}
            type="text"
            placeholder="Nome do Produto"
            required
          />

          <ComboBox
            className="col-span-1 md:col-span-6"
            value={watch("categoriaId")?.toString()}
            values={categoriesOptions}
            label="Categoria do produto"
            onChangeValue={(value) => setValue("categoriaId", value)}
          />
          <ComboBox
            className="col-span-1 md:col-span-6"
            value={watch("variacaoId")?.toString()}
            values={variationOptions}
            label="Variação do produto"
            onChangeValue={(value) => setValue("variacaoId", value)}
          />
          <ComboBox
            className="col-span-1 md:col-span-6"
            value={watch("unidade")?.toString()}
            values={[
              {
                name: "KG",
                value: "KG",
              },
              {
                name: "UN",
                value: "UN",
              },
            ]}
            label="Tipo de unidade"
            onChangeValue={(value) => setValue("unidade", value as Unit)}
          />
          <Input
            {...register("imagensProduto")}
            type="file"
            label="Imagem"
            className="col-span-12"
          />

          <div className="ml-auto col-span-3 md:col-span-12">
            <Button type="submit">{titleModal}</Button>
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
          submitFormProduto={() => console.log("editar")}
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
              headers={["ID", "Nome", "Categoria", "Variação", "Ações"]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {produtos.map((produto) => (
                <Table.Tr
                  key={produto.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Table.Td className="w-4 p-4">{produto.id}</Table.Td>
                  <Table.Td
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {produto.descricao}
                  </Table.Td>
                  <Table.Td>{produto.categoria.descricao}</Table.Td>
                  <Table.Td>{produto.variacao.descricao}</Table.Td>

                  <Table.Td isButton={true}>
                    <div className="flex gap-2 mx-2">
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

        {/* <div className="sticky bottom-2 mt-4">
          <Pagination
            items={produtos?.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div> */}
      </div>
    </MountTransition>
  );
}

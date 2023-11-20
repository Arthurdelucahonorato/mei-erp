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
import {
  ProductSearchQueries,
  getAllProducts,
} from "@/services/api/products/get-all-products";
import { getAllCategories } from "@/services/api/categories/get-all-categories";
import { getAllVariations } from "@/services/api/variations/get-all-variations";
import { createProduct } from "@/services/api/products/create-product";
import { Unit } from "@/types/enum/unit.enum";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { api } from "@/services/api/api";
import toast from "react-hot-toast";
import { deleteProduct } from "@/services/api/products/delete-product";
const valoresCombo = [
  { value: "QUILOGRAMAS", name: "kg" },
  { value: "UNIDADE", name: "un" },
];

interface ProdutoProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  produtos: PaginatedResult<Product[]>;
  categorias: Category[];
  variacoes: Variation[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const pageQueries = query as unknown as ProductSearchQueries;

  const produtos = await getAllProducts({
    page: pageQueries.page ?? "",
    perPage: pageQueries.perPage ?? "",
    descricao: pageQueries.descricao ?? "",
  });

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
  const [isOpenProdutoRegister, setIsOpenProdutoRegister] = useState(false);
  const [isOpenProdutoEdit, setIsOpenProdutoEdit] = useState(false);
  const [lovIsOpen, setLovIsOpen] = useState(false);

  const { reload } = useRouter();

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

      if (data.imagensProduto && data.imagensProduto.length > 0) {
        for (let i = 0; i < data.imagensProduto.length; i++) {
          formData.append("imagensProduto", data.imagensProduto[i]);
        }
      }

      formData.append("descricao", data.descricao);
      formData.append("categoriaId", data.categoriaId.toString());
      formData.append("variacaoId", data.variacaoId.toString());
      formData.append("unidade", data.unidade);

      toast.promise(createProduct(formData), {
        error: (data) => data.response.data.message,
        loading: "Cadastrando produto...",
        success: (data) => {
          setIsOpenProdutoRegister(false);
          reload();
          return data.message;
        },
      });
    } catch (error: any) {
      toast(error.response.data.message);
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
            containerClassName="col-span-3 md:col-span-12"
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
            multiple
            accept="image/*"
            label="Imagem"
            containerClassName="col-span-12"
          />

          <div className="ml-auto col-span-3 md:col-span-12">
            <Button type="submit">{titleModal}</Button>
          </div>
        </form>
      </Modal>
    );
  };

  const [isOpenImagesModal, setIsOpenImagesModal] = useState(false);

  const [productImages, setProductImages] = useState<Product>();

  const [searchClient, setSearchClient] = useState({
    descricao: "",
  });

  const openModalProductImages = (produtoId: number) => {
    const product = produtos.content.find((produto) => produto.id == produtoId);

    setProductImages(product);

    setIsOpenImagesModal(true);
  };

  const { push, query } = useRouter();

  const pageQueries = query as PaginationParams;

  const onPageChange = (page: number) => {
    if (page != Number(pageQueries.page)) {
      push({
        query: {
          ...pageQueries,
          page: page ?? "",
        },
      });
    }
  };

  const search = () => {
    push({
      query: {
        ...pageQueries,
        ...searchClient,
        descricao: searchClient.descricao,
      },
    });
  };

  const deleteProductById = async (id: number) => {
    try {
      toast.promise(deleteProduct(id), {
        error: (data) => data.response.data.message,
        loading: "Deletando produto...",
        success: (data) => data.message,
      });
    } catch (error) {
      toast("Ocorreu um erro");
    }
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

        <div className="flex w-full  justify-between">
          <div className="flex items-center h-full gap-2">
            <div className="flex items-center h-full">
              <Input
                value={searchClient.descricao}
                onChange={(e) => {
                  setSearchClient({
                    ...searchClient,
                    descricao: e.target.value,
                  });
                }}
                placeholder="Buscar Produto"
              />
            </div>
            {/* <div className="w-full">
              <ComboBox
                className="col-span-1 md:col-span-6"
                value={watch("categoriaId")?.toString()}
                values={categoriasOpt}
                onChangeValue={(value) =>
                  setSearchClient({
                    ...searchClient,
                    categoria: value,
                  })
                }
              />
            </div> */}
            <div>
              <Button onClick={search}>Buscar</Button>
            </div>
          </div>
          <div className="flex p-2">
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
              headers={[
                "ID",
                "Nome",
                "Categoria",
                "Variação",
                "Imagens",
                "Ações",
              ]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              <Modal
                isOpen={isOpenImagesModal}
                title={`Imagens do produto ${productImages?.descricao}`}
                toggle={() => setIsOpenImagesModal(false)}
              >
                {productImages?.imagensProduto.map((imagem) => {
                  return (
                    <img
                      key={imagem.id}
                      className="w-40 h-40 rounded"
                      src={imagem.path}
                      alt="imagem"
                    />
                  );
                })}
              </Modal>
              {produtos.content?.map((produto) => {
                return (
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

                    <Table.Td>
                      <ButtonTable
                        onClick={() => openModalProductImages(produto.id)}
                      >
                        Ver Imagens
                      </ButtonTable>
                    </Table.Td>

                    <Table.Td isButton={true}>
                      <div className="flex gap-2 mx-2">
                        <ButtonTable onClick={toogleProdutoEdit}>
                          <BsPencil className={"text-lg"} />
                        </ButtonTable>
                        <ButtonTable
                          onClick={() => deleteProductById(produto.id)}
                          variant="red"
                        >
                          <BsTrash className={"text-lg"} />
                        </ButtonTable>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Body>
          </Table.Root>
        </div>

        <div className="sticky bottom-2 mt-4">
          <Pagination
            totalPages={produtos.pagination?.totalPages}
            totalItems={produtos.pagination?.totalItems}
            nextPage={produtos.pagination?.nextPage}
            prevPage={produtos.pagination?.prevPage}
            currentPage={Number(produtos.pagination?.currentPage)}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}

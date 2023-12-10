import { useState } from "react";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import "moment/locale/pt-br";
import { BsCartPlus, BsPencil, BsTrash } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { Table } from "@/components/Table/index";
import { ButtonTable } from "@/components/Table/ButtonTable";
import {
  ProductSearchQueries,
  getAllProducts,
} from "@/services/api/products/get-all-products";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import toast from "react-hot-toast";
import { deleteProduct } from "@/services/api/products/delete-product";
import { Product } from "@/types/product";
import { CategoryEnum } from "@/types/enum/category.enum";
import { enumDecode } from "@/utils/enumDecode";
import FormProduto from "./FormProduto";

interface ProdutoProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  produtos: PaginatedResult<Product[]>;
  categorias: Category[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const pageQueries = query as unknown as ProductSearchQueries;

  const produtos = await getAllProducts({
    page: pageQueries.page ?? "",
    perPage: pageQueries.perPage ?? "",
    descricao: pageQueries.descricao ?? "",
  });

  return {
    props: {
      produtos: produtos,
    },
  };
}

export default function produtos({ produtos, categorias }: ProdutoProps) {
  const [isOpenProdutoRegister, setIsOpenProdutoRegister] = useState(false);
  const [isOpenProdutoEdit, setIsOpenProdutoEdit] = useState(false);
  const [isOpenImagesModal, setIsOpenImagesModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product>();
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

  const setarProdutoEdicao = (id: number) => {
    const produto = produtos.content.find((produto) => produto.id == id);
    setProductToEdit(produto);
    setIsOpenProdutoEdit(!isOpenProdutoEdit);
  };


  return (
    <MountTransition className="flex flex-1 w-full flex-col h-full justify-between">
      <div className="flex flex-1 flex-col w-full h-full justify-between">
        {/*         <Modal
          isOpen={isOpenDetails}
          toggle={toggleDetails}
          title={"Editar Produto"}
        >
          Conteudo do modal
        </Modal> */}

        <FormProduto
          formProdutoIsOpen={isOpenProdutoRegister}
          toogleFormProduto={() => setIsOpenProdutoRegister(!isOpenProdutoRegister)}
          titleModal={"Cadastrar Produto"}
        />
        <FormProduto
          formProdutoIsOpen={isOpenProdutoEdit}
          toogleFormProduto={() => setIsOpenProdutoEdit(!isOpenProdutoEdit)}
          titleModal={"Editar Produto"}
          produtoEdicao={productToEdit}
        />

        <div className="flex w-full justify-between">
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
            <Button onClick={() => setIsOpenProdutoRegister(!isOpenProdutoRegister)}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Produto
              </div>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 w-full flex-col bg-gray-50 dark:bg-theme-dark.100 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={["ID", "Nome", "Categoria", "Imagens", "Ações"]}
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
                    className="bg-white border-b w-full flex-1 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <Table.Td className="w-4 p-4">{produto.id}</Table.Td>
                    <Table.Td
                      scope="row"
                      className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {produto.descricao}
                    </Table.Td>
                    <Table.Td>
                      {enumDecode(CategoryEnum, produto.categoria)}
                    </Table.Td>
                    <Table.Td>
                      <ButtonTable
                        onClick={() => openModalProductImages(produto.id)}
                      >
                        Ver Imagens
                      </ButtonTable>
                    </Table.Td>

                    <Table.Td isButton={true}>
                      <div className="flex gap-2 mx-2">
                        <ButtonTable onClick={() => setarProdutoEdicao(produto.id)}>
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

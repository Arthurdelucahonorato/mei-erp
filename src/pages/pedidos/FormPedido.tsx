import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { GetServerSidePropsContext } from "next";
import { api } from "@/services/api/api";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import moment from "moment";
import "moment/locale/pt-br";
import { BsCartPlus, BsPencil, BsTrash, BsX, BsPlus, BsSubtract } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";
import { get, max } from "lodash";
import { getAllRequests } from "@/services/api/requests/get-all-requests";
import { Textarea } from "@/components/Textarea";
import { ButtonTable } from "@/components/Table/ButtonTable";
import Lov from "@/components/Lov";
import ComboBox from "@/components/ComboBox";
import { InputTable } from "@/components/InputTable";
import { getAllProducts } from "@/services/api/products/get-all-products";
import { getAllClients } from "@/services/api/clients/get-all-clients";
import { useRouter } from "next/router";
import { OrderStats, Unit } from "@/types/enum/unit.enum";
import { OrderRequest } from "@/types/request";

interface FormPedidosType {
  formPedidoIsOpen: boolean;
  titleModal: String;
  toggleFormPedido: () => void;
  pedidoEdicao?: OrderRequest;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const pageQueries = query as PaginationParams;

  const pedidos = await getAllRequests({
    perPage: pageQueries.perPage,
    page: pageQueries.page,
  });

  console.log("produtos");

  return {
    props: {
      pedidos: pedidos,
    },
  };
};

const ValoresFormaPagamento = [
  { value: "PIX", name: "Pix" },
  { value: "A_VISTA", name: "A vista" },
  { value: "CARTAO_CREDITO", name: "Cartão Crédito" },
  { value: "CARTAO_DEBITO", name: "Cartão Débito" },
  { value: "DINHEIRO", name: "Dinheiro" },
];

export default function FormPedido({
  formPedidoIsOpen,
  titleModal,
  toggleFormPedido,
  pedidoEdicao,
}: FormPedidosType) {
  const [openModalProducts, setOpenModalProducts] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<PaginatedResult<Product[]>>();
  const [clientes, setClientes] = useState<PaginatedResult<Client[]>>();

  async function buscarProdutos() {
    return await getAllProducts();
  }
  async function buscarClientes() {
    return await getAllClients();
  }
  useLayoutEffect(() => {
    buscarProdutos().then((produto) => setProdutos(produto));
    buscarClientes().then((cliente) => setClientes(cliente));
    console.log('produtos')
  }, [])

  useEffect(() => {
    if (pedidoEdicao) {
      /* 
              id: number;
              createdAt: Date;
              cliente: number;
              dataRetirada: Date;
              itensPedido: Product[];
              valorTotal: number; */

      setValue("codigoCliente", pedidoEdicao.cliente.id);
      setValue("dataPedido", pedidoEdicao.createdAt);
      setValue("dataEntrega", pedidoEdicao.dataRetirada);
    }
  }, [pedidoEdicao]);

  const { reload } = useRouter();


  const onClickLov = (selectedValue: any) => {
    setValue("codigoCliente", selectedValue.id);
    setValue("nomeCliente", selectedValue.nome);
  };
  const onChangeComboBox = (selectedValue: string) => {
    console.log("selectedValue", selectedValue);
    setValue("formaPagamento", selectedValue);
    console.log(getValues("formaPagamento"));
  };

  const validateRegister = z.object({
    codigoCliente: z.number(),
    nomeCliente: z.string().nonempty("Campo obrigatório"),
    dataPedido: z.date(),
    dataEntrega: z.date(),
    status: z.nativeEnum(OrderStats),
    formaPagamento: z.string().nonempty("Campo obrigatório"),
    modalidadeEntrega: z.string().nonempty("Campo obrigatório"),
    observacao: z.string().nonempty("Campo obrigatório"),
    itensPedido: z.array(
      z.object({
        produtoId: z.string().transform((value) => Number(value)),
        quantidade: z.string().transform((value) => Number(value)),
        observacao: z.string(),
        valorUnitario: z.string().transform((value) => Number(value)),
        imagem: z.string(),
      })
    ),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

  const { append, fields, remove } = useFieldArray({
    name: "itensPedido",
    control: control,
  });

  const removeProduto = (produtoId: number) => {
    const index = fields.findIndex((field) => field.produtoId === produtoId);
    if (index !== -1) {
      remove(index);
    }
  };

  const submitFormRegister = async ({
    codigoCliente,
    nomeCliente,
    dataPedido,
    dataEntrega,
    status,
    formaPagamento,
    modalidadeEntrega,
    observacao,
  }: ValidateData) => {
    try {
      console.log("algo");
    } catch (error: any) {
      return;
    }
  };
  const submitFormEdit = async ({
    codigoCliente,
    nomeCliente,
    dataPedido,
    dataEntrega,
    status,
    formaPagamento,
    modalidadeEntrega,
    observacao,
  }: ValidateData) => {
    try {
      console.log("algo");
    } catch (error: any) {
      return;
    }
  };

  const lovValues = {
    title: "Seleção de Cliente",
    listValues: clientes,
    listLabels: ["ID", "Nome", "Telefone", "E-mail"],
    onClick: onClickLov,
  };

  return (
    <Modal
      isOpen={formPedidoIsOpen}
      toggle={toggleFormPedido}
      title={titleModal}
    >
      <Modal
        isOpen={openModalProducts}
        toggle={() => setOpenModalProducts(false)}
        title={"Buscar produto"}
      >
        <Table.Root>
          <Table.Header
            headers={[
              "ID",
              "Nome",
              "Categoria",
              "Variação",
              "Unidade",
              "Ações",
            ]}
          />
          <Table.Body className="overflow-y-auto">
            {produtos?.content?.map((produto) => (
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
                <Table.Td>{produto.unidade}</Table.Td>
                <Table.Td isButton={true}>
                  <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                    {fields.some((field) => field.produtoId === produto.id) ? (
                      <Button
                        className="text-black !bg-red-700"
                        onClick={() => removeProduto(produto.id)}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        className="text-black !bg-green-700"
                        onClick={() => {
                          append({
                            produtoId: produto.id,
                            observacao: "",
                            quantidade: 1,
                            valorUnitario: 0,
                            imagem: "",
                          });
                        }}
                      >
                        +
                      </Button>
                    )}
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Body>
        </Table.Root>
      </Modal>
      <form
        className="max-w-3xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
      //  onSubmit={submitFormPedido}
      >
        <Input
          containerClassName="col-span-1 md:col-span-3"
          {...register("codigoCliente")}
          label="Codigo do Cliente"
          htmlFor="codigoCliente"
          errorMessage={errors.codigoCliente?.message}
          type="text"
          placeholder="Codigo do Cliente"
          required
          lovButton={lovValues}
        />
        <Input
          containerClassName="col-span-2 md:col-span-9"
          {...register("nomeCliente")}
          label="Nome"
          htmlFor="nomeCliente"
          errorMessage={errors.nomeCliente?.message}
          type="text"
          placeholder="Nome do Cliente"
          disabled
        />

        <Input
          containerClassName="col-span-1 md:col-span-4"
          {...register("dataPedido")}
          label="Data do Pedido"
          htmlFor="dataPedido"
          errorMessage={errors.dataPedido?.message}
          type="date"
          placeholder="Data do Pedido"
          required
        />

        {/*           <Input 
            label="Forma de Pagamento"
            htmlFor="formaPagamento"
            errorMessage={errors.formaPagamento?.message}
            type=""
            placeholder="Forma de Pagamento"
            required
          /> */}

        <ComboBox
          // {...register("formaPagamento")}
          className="col-span-1 md:col-span-4"
          value={watch("formaPagamento")}
          values={ValoresFormaPagamento}
          label="Forma de Pagamento"
          errorMessage={errors.formaPagamento?.message}
          required
          onChangeValue={(value) => {
            setValue("formaPagamento", value);
          }}
        />
        <Input
          {...register("status")}
          containerClassName="col-span-1 md:col-span-4"
          label="Status"
          htmlFor="status"
          errorMessage={errors.status?.message}
          type="text"
          placeholder="Status"
          required
        />

        <Input
          containerClassName="col-span-1 md:col-span-4"
          {...register("dataEntrega")}
          label="Data da Entrega"
          htmlFor="dataEntrega"
          errorMessage={errors.dataEntrega?.message}
          type="date"
          placeholder="Data da Entrega"
          required
        />

        <Input
          containerClassName="col-span-1 md:col-span-4"
          {...register("modalidadeEntrega")}
          label="Modalidade da Entrega"
          htmlFor="modalidadeEntrega"
          errorMessage={errors.modalidadeEntrega?.message}
          type="number"
          placeholder="Modalidade da Entrega"
          required
        />

        <Input
          {...register("observacao")}
          containerClassName="col-span-3 md:col-span-12"
          label="Observação"
          htmlFor="observacao"
          type="text"
          placeholder="Observação"
        />
        <div className="col-span-3 md:col-span-12 ">
          <div className="max-h-14 max-w-full overflow-y-hidden">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-full">
              <div className="flex flex-row gap-2 sticky top-0 py-2.5 font-bold text-xs text-gray-700 uppercase bg-gray-50 dark:bg-theme-dark.100 dark:text-gray-400 justify-center items-center rounded-lg pr-[8px]">
                <text className="px-3 w-20">ID</text>
                <text className="px-3 w-60">Produto</text>
                <text className="px-3 w-44">Variação</text>
                <text className="px-3 w-44">Categoria</text>
                <text className="px-3 w-16 text-end">QTD</text>
                <text className="px-3 w-32 text-end">Valor</text>
                <text className="pl-3 w-20">UN</text>
                <div className="flex flex-1 flex-row justify-center items-center max-w-md gap-3 mr-2">
                  <button
                    type="button"
                    className="flex justify-center w-6 aspect-square"
                    onClick={
                      () => setOpenModalProducts(true)
                      // append({
                      //   produtoId: 5,
                      //   valorUnitario: 1.0,
                      //   observacao: "Teste",
                      //   quantidade: 6,
                      // })
                    }
                  >
                    <BsPlus
                      className={
                        "text-2xl cursor-pointer text-white bg-primary dark:bg-secondary rounded-lg"
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-h-32 max-w-full overflow-x-auto mt-1 rounded-lg">
            <ul className="overflow-y-auto">
              {fields.map((itemPedido) => (
                <li
                  key={itemPedido.id}
                  className="flex flex-row gap-2 justify-center items-center bg-white border-b dark:bg-theme-dark.150 dark:border-theme-dark.200 hover:bg-gray-50 dark:hover:bg-theme-dark.150"
                >
                  <InputTable className="w-20" value={itemPedido.id} />
                  <InputTable
                    className="w-60 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    value={itemPedido.produtoId}
                  />
                  <InputTable className="w-44" value={"itemPedido.variacao"} />
                  <InputTable className="w-44" value={"itemPedido.categoria"} />
                  <InputTable
                    textDirection={"text-end"}
                    className="w-16"
                    value={itemPedido.quantidade}
                  />
                  <InputTable
                    textDirection={"text-end"}
                    className="w-32"
                    value={itemPedido.valorUnitario}
                  />
                  <InputTable className="w-20" value={"KG"} />
                  <div className="flex flex-1 flex-row justify-center items-center max-w-md gap-3 mr-2">
                    <ButtonTable variant="red" className="text-white">
                      <BsX className={"text-xl"} />
                    </ButtonTable>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end col-span-3 md:col-span-12">
          <div>
            <Button type="submit">{titleModal}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

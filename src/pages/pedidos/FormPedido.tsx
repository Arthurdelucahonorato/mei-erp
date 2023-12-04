import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { GetServerSidePropsContext } from "next";
import { api } from "@/services/api/api";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import moment, { locale } from "moment";
import "moment/locale/pt-br";
import {
  BsCartPlus,
  BsPencil,
  BsTrash,
  BsX,
  BsPlus,
  BsSubtract,
} from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { ZodObject, z } from "zod";
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
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { editRequest } from "@/services/api/requests/edit-request";
import { registerRequest } from "@/services/api/requests/register-request";
import { enumToList } from "@/utils/enumToList";
import { PaymentMethodsEnum } from "@/types/enum/paymentMethods.enum";
import { RequestStatusEnum } from "@/types/enum/request.status.enum";
import { DeliveryModalityEnum } from "@/types/enum/deliveryModality.enum";

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

  return {
    props: {
      pedidos: pedidos,
    },
  };
};

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
    reset();

    buscarProdutos().then((produto) => setProdutos(produto));
    buscarClientes().then((cliente) => setClientes(cliente));
  }, []);

  useEffect(() => {
    if (pedidoEdicao) {
      reset();
      setValue("clienteId", String(pedidoEdicao.cliente.id));
      setValue("nomeCliente", pedidoEdicao.cliente.nome);
      setValue(
        "dataPedido",
        moment(pedidoEdicao.dataPedido).locale("pt-br").format("yyyy-MM-DD")
      );
      setValue(
        "dataEntrega",
        moment(pedidoEdicao.dataEntrega).locale("pt-br").format("yyyy-MM-DD")
      );
      setValue("formaPagamento", pedidoEdicao.formaPagamento);
      setValue("modalidadeEntrega", pedidoEdicao.modalidadeEntrega);
      setValue("observacao", pedidoEdicao.observacao);
      setValue("status", pedidoEdicao.status);
      pedidoEdicao.itensPedido.map((value, index) => {
        insert(index, {
          id: value.id,
          produtoId: value.produto.id,
          produtoDescricao: value.produto.descricao,
          categoria: value.produto.categoria,
          unidade: value.produto.unidade,
          observacao: value.observacao,
          quantidade: value.quantidade,
          valorUnitario: value.valorUnitario,
        });
      });
    }
  }, [pedidoEdicao]);

  const { reload } = useRouter();

  const onClickLov = (selectedValue: any) => {
    setValue("clienteId", selectedValue.id);
    setValue("nomeCliente", selectedValue.nome);
  };

  const validateRegister = z.object({
    clienteId: z.string().nonempty("Campo obrigatório"),
    nomeCliente: z.string().optional(),
    dataPedido: z.string().nonempty("Campo obrigatório"),
    dataEntrega: z.string().nonempty("Campo obrigatório"),
    status: z.string({ required_error: "Campo obrigatório" }),
    formaPagamento: z.string({ required_error: "Campo obrigatório" }),
    modalidadeEntrega: z.string({ required_error: "Campo obrigatório" }),
    observacao: z.string().optional(),
    itensPedido: z.array(
      z.object({
        id: z.number(),
        produtoId: z.number({
          required_error: "Campo obrigatório",
          invalid_type_error: "Campo obrigatório",
        }),
        quantidade: z.number({
          required_error: "Campo obrigatório",
          invalid_type_error: "Campo obrigatório",
        }),
        observacao: z.string().optional(),
        valorUnitario: z.number({
          required_error: "Campo obrigatório",
          invalid_type_error: "Campo obrigatório",
        }),

        produtoDescricao: z.string(),
        categoria: z.string(),
        unidade: z.string(),
      })
    ),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

  const { append, fields, remove, update, insert } = useFieldArray({
    name: "itensPedido",
    control: control,
  });

  const removeProduto = (produtoId: number) => {
    const index = fields.findIndex((field) => field.produtoId === produtoId);
    if (index !== -1) {
      remove(index);
    }
  };

  const submitFormRegister = async (data: ValidateData) => {
    const reqBodyItensPedido = data.itensPedido.map((value) => {
      return {
        produtoId: Number(value.produtoId),
        quantidade: Number(value.quantidade),
        observacao: value.observacao,
        valorUnitario: Number(value.valorUnitario),
      };
    });
    const reqBody = {
      clienteId: Number(data.clienteId),
      dataPedido:
        moment(data.dataPedido).locale("pt-br").format("yyyy-MM-DDThh:mm:ss") +
        "Z",
      dataEntrega:
        moment(data.dataEntrega).locale("pt-br").format("yyyy-MM-DDThh:mm:ss") +
        "Z",
      status: data.status,
      formaPagamento: data.formaPagamento,
      modalidadeEntrega: data.modalidadeEntrega,
      observacao: data.observacao,
      itensPedido: reqBodyItensPedido,
    };
    try {
      toast.promise(registerRequest(reqBody), {
        loading: "Salvando novo pedido",
        success: (d) => {
          reload();
          return d.message;
        },
        error: (error) => {
          return error.response.data.message;
        },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
      return;
    }
  };

  const submitFormEdit = async (id: number, data: ValidateData) => {
    const reqBodyItensPedido = data.itensPedido.map((value) => {
      return {
        id: Number(value.id),
        produtoId: Number(value.produtoId),
        quantidade: Number(value.quantidade),
        observacao: value.observacao,
        valorUnitario: Number(value.valorUnitario),
      };
    });
    const reqBody = {
      clienteId: data.clienteId,
      dataPedido:
        moment(data.dataPedido).locale("pt-br").format("yyyy-MM-DDThh:mm:ss") +
        "Z",
      dataEntrega:
        moment(data.dataEntrega).locale("pt-br").format("yyyy-MM-DDThh:mm:ss") +
        "Z",
      status: data.status,
      formaPagamento: data.formaPagamento,
      modalidadeEntrega: data.modalidadeEntrega,
      observacao: data.observacao,
      itensPedido: reqBodyItensPedido,
    };
    try {
      toast.promise(editRequest(id, reqBody), {
        loading: "Salvando alterações do pedido",
        success: (d) => {
          reload();
          return d.message;
        },
        error: (error) => error.response.data.message,
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
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
            headers={["ID", "Nome", "Categoria", "Unidade", "Ações"]}
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
                <Table.Td>{produto.categoria}</Table.Td>
                <Table.Td>{produto.unidade}</Table.Td>
                <Table.Td isButton={true}>
                  <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                    {fields.some((field) => field.produtoId === produto.id) ? (
                      <Button
                        type="button"
                        className="text-black !bg-red-700"
                        onClick={() => removeProduto(produto.id)}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="text-black !bg-green-700"
                        onClick={() => {
                          append({
                            id: 0,
                            produtoId: produto.id,
                            produtoDescricao: produto.descricao,
                            categoria: produto.categoria,
                            unidade: produto.unidade,
                            observacao: "",
                            quantidade: 1,
                            valorUnitario: 0,
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
        onSubmit={handleSubmit((data) =>
          pedidoEdicao
            ? submitFormEdit(pedidoEdicao.id, data)
            : submitFormRegister(data)
        )}
      >
        <Input
          {...register("clienteId")}
          containerClassName="col-span-1 md:col-span-3"
          label="Codigo do Cliente"
          htmlFor="clienteId"
          errorMessage={errors.clienteId?.message}
          type="number"
          placeholder="Codigo do Cliente"
          required
          lovButton={lovValues}
        />
        <Input
          containerClassName="col-span-2 md:col-span-9"
          label="Nome"
          {...register("nomeCliente")}
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
        <ComboBox
          className="col-span-1 md:col-span-4"
          value={watch("formaPagamento")}
          values={enumToList(PaymentMethodsEnum)}
          label="Forma de Pagamento"
          errorMessage={errors.formaPagamento?.message}
          required
          onChangeValue={(value) => {
            setValue("formaPagamento", value);
          }}
        />
        <ComboBox
          className="col-span-1 md:col-span-4"
          value={watch("status")}
          values={enumToList(RequestStatusEnum)}
          label="Status"
          errorMessage={errors.status?.message}
          required
          onChangeValue={(value) => {
            setValue("status", value);
          }}
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
        <ComboBox
          className="col-span-1 md:col-span-4"
          value={watch("modalidadeEntrega")}
          values={enumToList(DeliveryModalityEnum)}
          label="Modalidade Entrega"
          errorMessage={errors.modalidadeEntrega?.message}
          required
          onChangeValue={(value) => {
            setValue("modalidadeEntrega", value);
          }}
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
                <text className="pl-2 w-20">ID</text>
                <text className="pl-2 w-60">Produto</text>
                <text className="pl-2 w-44">Categoria</text>
                <text className="pr-2 w-16 text-end">QTD</text>
                <text className="pr-2 w-32 text-end">Valor</text>
                <text className="pl-2 w-20">UN</text>
                <div className="flex flex-1 flex-row justify-center items-center max-w-md">
                  <button
                    type="button"
                    className="flex justify-center w-6 aspect-square mx-3.5"
                    onClick={() => setOpenModalProducts(true)}
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
              {fields.map((itemPedido, index) => (
                <li
                  key={itemPedido.id}
                  className="flex flex-row gap-2 justify-center items-center bg-white border-b dark:bg-theme-dark.150 dark:border-theme-dark.200 hover:bg-gray-50 dark:hover:bg-theme-dark.150"
                >
                  <InputTable
                    disabled
                    className="w-20"
                    htmlFor={`idItemPedido-${itemPedido.id}`}
                    {...register(`itensPedido.${index}.id`)}
                  />
                  <Input
                    disabled
                    className="w-60 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    {...register(`itensPedido.${index}.produtoDescricao`)}
                    htmlFor={`produtoDescricaoItemPedido-${itemPedido.id}`}
                  />
                  <InputTable
                    disabled
                    className="w-44"
                    {...register(`itensPedido.${index}.categoria`)}
                    htmlFor={`categoriaItemPedido-${itemPedido.id}`}
                  />
                  <InputTable
                    textDirection={"text-end"}
                    className="w-16"
                    {...register(`itensPedido.${index}.quantidade`)}
                    htmlFor={`quantidadeItemPedido-${itemPedido.id}`}
                  />
                  <InputTable
                    textDirection={"text-end"}
                    className="w-32"
                    {...register(`itensPedido.${index}.valorUnitario`)}
                    htmlFor={`valorUnitarioItemPedido-${itemPedido.id}`}
                  />
                  <InputTable
                    disabled
                    className="w-20"
                    {...register(`itensPedido.${index}.unidade`)}
                    htmlFor={`unidadeItemPedido-${itemPedido.id}`}
                  />
                  <div className="flex flex-1 flex-row justify-center items-center max-w-md gap-3 mr-2">
                    <ButtonTable
                      type="button"
                      variant="red"
                      className="text-white"
                      onClick={() => removeProduto(itemPedido.produtoId)}
                    >
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

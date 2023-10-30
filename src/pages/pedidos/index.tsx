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
import { BsCartPlus, BsPencil, BsTrash, BsX, BsPlus } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";
import { get, max } from "lodash";
import { getAllRequests } from "@/services/api/adm/get-all-requests";
import { Textarea } from "@/components/Textarea";
import { ButtonTable } from "@/components/Table/ButtonTable";
import Lov from "@/components/Lov";
import ComboBox from "@/components/ComboBox";
import { InputTable } from "@/components/InputTable";

interface PedidosProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pedidos: OrderRequest[];
  clientes: ClientRequest[];
}

export async function getServerSideProps() {
  const pedidos = await getAllRequests("pedidos");
  const clientes = await getAllRequests("clientes");

  return {
    props: {
      pedidos: pedidos,
      clientes: clientes,
    },
  };
}

const ValoresFormaPagamento = [
  { value: "PIX", name: "Pix" },
  { value: "A_VISTA", name: "A vista" },
  { value: "CARTAO_CREDITO", name: "Cartão Crédito" },
  { value: "CARTAO_DEBITO", name: "Cartão Débito" },
  { value: "DINHEIRO", name: "Dinheiro" },
];

export default function Pedidos({ pedidos, clientes }: PedidosProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [isOpenPedidoEdit, setIsOpenPedidoEdit] = useState(false);
  const [isOpenPedidoRegister, setIsOpenPedidoRegister] = useState(false);
  const [isOpenPedidoDetails, setIsOpenPedidoDetails] = useState(false);

  const arrayId = clientes.map((cliente) => {
    return [cliente.id, cliente.nome, cliente.cidade, cliente.telefone];
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleDetails = () => {
    setIsOpenPedidoDetails(!isOpenPedidoDetails);
  };

  const togglePedidoRegister = () => {
    setIsOpenPedidoRegister(!isOpenPedidoRegister);
    reset();
  };

  const togglePedidoEdit = (pedido?: any) => {
    reset();
    setIsOpenPedidoEdit(!isOpenPedidoEdit);
    if (!isOpenPedidoEdit) {
      console.log(pedido);
      setValue("codigoCliente", pedido.idCliente);
      setValue("nomeCliente", pedido.nomeCliente);
      /*       setValue("dataPedido", pedido.dataPedido);
            setValue("dataEntrega", pedido.dataEntrega);
            setValue("formaPagamento", pedido.formaPagamento);
            setValue("status", pedido.statusPedido);
            setValue("modalidadeEntrega", pedido.modalidadeEntrega);
            setValue("observacao", pedido.observacao); */
    }
  };

  const onClickLov = (selectedValue: any[]) => {
    setValue("codigoCliente", selectedValue[0]);
    setValue("nomeCliente", selectedValue[1]);
  };
  const onChangeComboBox = (selectedValue: string) => {
    console.log("selectedValue", selectedValue);
    setValue("formaPagamento", selectedValue);
    console.log(getValues("formaPagamento"));
  };

  const validateRegister = z.object({
    codigoCliente: z.string().nonempty("Campo obrigatório"),
    nomeCliente: z.string().nonempty("Campo obrigatório"),
    dataPedido: z.string().nonempty("Campo obrigatório"),
    dataEntrega: z.string().nonempty("Campo obrigatório"),
    status: z.string().nonempty("Campo obrigatório"),
    formaPagamento: z.string().nonempty("Campo obrigatório"),
    modalidadeEntrega: z.string().nonempty("Campo obrigatório"),
    observacao: z.string().nonempty("Campo obrigatório"),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

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
    listLabels: ["ID", "Nome", "Cidade", "Telefone"],
    listValues: arrayId,
    onClick: onClickLov,
  };

  const paginatePedidos = paginate(pedidos, currentPage, pageSize);
  const listaItensDoPedido = [
    {
      "id": 1,
      "categoria": "Eletrônicos",
      "nomeProduto": "Smartphone",
      "variacao": "Modelo X",
      "quantidade": 5,
      "observacao": "Cor: Preto",
      "valor": 499.99,
      "unidade": "KG"
    },
    {
      "id": 2,
      "categoria": "Roupas",
      "nomeProduto": "Camiseta",
      "variacao": "Tamanho M",
      "quantidade": 10,
      "observacao": "Estampa: Logo da Marca",
      "valor": 19.99,
      "unidade": "UN"
    },
    {
      "id": 3,
      "categoria": "Alimentos",
      "nomeProduto": "Cereal",
      "variacao": "Sabor Original",
      "quantidade": 3,
      "observacao": "Peso líquido: 500g",
      "valor": 3.99,
      "unidade": "KG",
    },
    {
      "id": 4,
      "categoria": "Alimentos",
      "nomeProduto": "Cereal",
      "variacao": "Sabor Original",
      "quantidade": 3,
      "observacao": "Peso líquido: 500g",
      "valor": 3.99,
      "unidade": "KG",
    }
  ]
  interface FormPedidoType {
    formPedidoIsOpen: boolean;
    titleModal: String;
    toogleFormPedido: () => void;
    submitFormPedido: () => void;
  }

  const FormPedido = ({
    formPedidoIsOpen,
    titleModal,
    toogleFormPedido,
    submitFormPedido,
    ...props
  }: FormPedidoType) => {
    return (
      <Modal
        isOpen={formPedidoIsOpen}
        toggle={toogleFormPedido}
        title={titleModal}
      >
        <form
          className="max-w-3xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
          onSubmit={submitFormPedido}
        >
          <Input
            className="col-span-1 md:col-span-3"
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
            className="col-span-2 md:col-span-9"
            {...register("nomeCliente")}
            label="Nome"
            htmlFor="nomeCliente"
            errorMessage={errors.nomeCliente?.message}
            type="text"
            placeholder="Nome do Cliente"
            disabled
          />

          <Input
            className="col-span-1 md:col-span-4"
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
            className="col-span-1 md:col-span-4"
            label="Status"
            htmlFor="status"
            errorMessage={errors.status?.message}
            type="text"
            placeholder="Status"
            required
          />

          <Input
            className="col-span-1 md:col-span-4"
            {...register("dataEntrega")}
            label="Data da Entrega"
            htmlFor="dataEntrega"
            errorMessage={errors.dataEntrega?.message}
            type="date"
            placeholder="Data da Entrega"
            required
          />

          <Input
            className="col-span-1 md:col-span-4"
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
            className="col-span-3 md:col-span-12"
            label="Observação"
            htmlFor="observacao"
            type="text"
            placeholder="Observação"
          />
          <div className="col-span-3 md:col-span-12 ">
            <div className="max-h-14 max-w-full overflow-y-hidden">
              <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-full">
                <div className="flex flex-row gap-2 sticky top-0 py-2.5 font-bold text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 justify-center items-center rounded-lg pr-[8px]">
                  <text className="px-3 w-20">ID</text>
                  <text className="px-3 w-60">Produto</text>
                  <text className="px-3 w-44">Variação</text>
                  <text className="px-3 w-44">Categoria</text>
                  <text className="px-3 w-16 text-end">QTD</text>
                  <text className="px-3 w-32 text-end">Valor</text>
                  <text className="pl-3 w-16">UN</text>
                  <div className="flex flex-1 flex-row justify-center items-center max-w-md gap-3 mr-2">
                    <div className="flex justify-center rounded-xl w-9">
                      <BsPlus className={"text-2xl cursor-pointer text-white bg-primary dark:bg-secondary rounded-lg"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-h-32 max-w-full overflow-x-auto mt-1 rounded-lg">
              <div className="overflow-y-auto">
                {listaItensDoPedido.map((itemPedido) => (
                  <div key={itemPedido.id} className="flex flex-row gap-2 justify-center items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <InputTable className="w-20" value={itemPedido.id} />
                    <InputTable className="w-60 font-medium text-gray-900 whitespace-nowrap dark:text-white" value={itemPedido.nomeProduto} />
                    <InputTable className="w-44" value={itemPedido.variacao} />
                    <InputTable className="w-44" value={itemPedido.categoria} />
                    <InputTable textDirection={"text-end"} className="w-16" value={itemPedido.quantidade} />
                    <InputTable textDirection={"text-end"} className="w-32" value={itemPedido.valor} />
                    <InputTable className="w-16" value={itemPedido.unidade} />
                    <div className="flex flex-1 flex-row justify-center items-center max-w-md gap-3 mr-2">
                      <ButtonTable className="bg-red-600 dark:bg-red-600 text-white">
                        <BsX className={"text-xl"} />
                      </ButtonTable>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end col-span-3 md:col-span-12">
            <div>
              <Button onClick={() => submitFormPedido()}>{titleModal}</Button>
            </div>
          </div>
        </form>
      </Modal >
    );
  };
  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        <FormPedido
          formPedidoIsOpen={isOpenPedidoRegister}
          toogleFormPedido={togglePedidoRegister}
          titleModal={"Cadastrar Pedido"}
          submitFormPedido={handleSubmit(submitFormRegister)}
        />
        <FormPedido
          formPedidoIsOpen={isOpenPedidoEdit}
          toogleFormPedido={togglePedidoEdit}
          titleModal={"Editar Pedido"}
          submitFormPedido={handleSubmit(submitFormEdit)}
        />
        <div className="flex justify-between m-1 max-h-12">
          <div className="relative"></div>
          <div className="flex aspect-square">
            <Button onClick={() => togglePedidoRegister()}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Pedido
              </div>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={[
                "ID",
                "Cliente",
                "Itens",
                "Data Retirada",
                "Valor Total",
              ]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {paginatePedidos.map((pedido) => (
                <Table.Tr
                  key={pedido.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Table.Td className="w-4 p-4">{pedido.id}</Table.Td>
                  <Table.Td
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {pedido.nomeCliente}
                  </Table.Td>
                  <Table.Td>{pedido.itensPedido.join(", ")}</Table.Td>
                  <Table.Td>
                    {moment(pedido.dataEntrega).locale("pt-br").format("L")}
                  </Table.Td>
                  <Table.Td>{pedido.valorTotal}</Table.Td>
                  <Table.Td isButton={true}>
                    <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                      <ButtonTable onClick={() => togglePedidoEdit(pedido)}>
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
            items={pedidos.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}

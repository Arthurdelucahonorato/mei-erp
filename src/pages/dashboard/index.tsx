import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Box } from "@/components/Box";
import { RevenuesBox } from "@/components/Box/RevenuesBox";
import { BarChart } from "@/components/Charts/Bar";
import { Table } from "@/components/Table";
import {
  ResponseGetRevenuesPerYear,
  getRevenuesPerYear,
} from "@/services/api/dashboard/get-revenues-per-year";
import { getRevenuesThisMonth } from "@/services/api/dashboard/get-revenues-this-month";
import { getTotalRevenues } from "@/services/api/dashboard/get-total-revenues";
import { getAllRequests } from "@/services/api/requests/get-all-requests";
import { RequestStatusEnum } from "@/types/enum/request.status.enum";
import { OrderRequest } from "@/types/request";
import { enumDecode } from "@/utils/enumDecode";
import moment from "moment";

interface DashboardPageProps {
  pedidos: {
    content: OrderRequest[];
    pagination: Pagination;
  };
  receitaMensal: number;
  receitaTotal: number;
  variacao: number;
  receitas: ResponseGetRevenuesPerYear;
}

export async function getServerSideProps() {
  const pedidos = await getAllRequests({
    perPage: "9999999",
  });

  const receitaAnual = await getRevenuesPerYear();

  const receitaMensal = await getRevenuesThisMonth();

  const receitaTotal = await getTotalRevenues();

  return {
    props: {
      pedidos: pedidos,
      receitas: receitaAnual,
      receitaMensal: receitaMensal.revenue,
      variacao: receitaMensal.variation,
      receitaTotal: receitaTotal,
    },
  };
}

export default function Dashboard({
  pedidos,
  receitas,
  receitaMensal,
  receitaTotal,
  variacao,
}: DashboardPageProps) {
  const headersTable = [
    "ID",
    "Cliente",
    "Itens",
    "Status",
    "Data Retirada",
    "Valor Total",
  ];

  const pedidosFinalizados = pedidos.content.filter(
    (item) => item.status === RequestStatusEnum.FINALIZADO
  )?.length;

  return (
    <MountTransition className="flex xl:flex-1 flex-col h-full gap-4">
      <div className="grid xl:grid-cols-2 gap-4 w-full">
        <div className="grid gap-4 max-md:max-w-sm">
          <div className="grid xl:grid-cols-3 gap-4">
            <Box>
              <RevenuesBox title="Todas as Receitas" value={receitaTotal} />
            </Box>
            <Box>
              <RevenuesBox
                title="Receita Mensal"
                value={receitaMensal}
                variationPercent={variacao}
              />
            </Box>
            <Box>
              <p className="text-sm text-black dark:text-white">
                Total de Pedidos Finalizados
              </p>
              <div className="flex items-center h-full">
                <h3 className="text-4xl text-black dark:text-white">{pedidosFinalizados}</h3>
              </div>
            </Box>
          </div>

          <Box className="max-w-screen overflow-x-auto">
            <h3 className="dark:text-white text-xl font-medium mb-4">
              Gráfico de receitas ({moment().year()})
            </h3>
            <BarChart data={receitas.values} labels={receitas.months} />
          </Box>
        </div>
        <Box className="flex xl:flex-1 flex-col bg-gray-50 dark:bg-theme-dark.100 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <h3 className="dark:text-white text-xl font-medium mb-4">
            Últimos pedidos
          </h3>
          <div>
            <Table.Root>
              <Table.Header headers={headersTable} />
              <Table.Body>
                {pedidos?.content?.slice(0, 10).map((pedido) => (
                  <Table.Tr key={pedido.id}>
                    <Table.Td>{pedido.id}</Table.Td>
                    <Table.Td>{pedido.cliente.nome}</Table.Td>
                    <Table.Td>{"Salgado"}</Table.Td>
                    <Table.Td>{enumDecode(RequestStatusEnum, pedido.status)}</Table.Td>
                    <Table.Td>
                      {moment(pedido.dataEntrega)
                        .locale("pt-br")
                        .format("DD/MM/YYYY HH:mm")}
                    </Table.Td>
                    <Table.Td>{pedido.valorTotal.toFixed(2)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        </Box>
      </div>
    </MountTransition>
  );
}

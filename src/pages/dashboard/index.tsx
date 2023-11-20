import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Box } from "@/components/Box";
import { LineChart } from "@/components/Charts/Line";
import { Table } from "@/components/Table";
import { getAllRequests } from "@/services/api/requests/get-all-requests";
import { OrderRequest } from "@/types/request";
import moment from "moment";

interface DashboardPageProps {
  pedidos: {
    content: OrderRequest[];
    pagination: Pagination;
  };
}

export async function getServerSideProps() {
  const pedidos = await getAllRequests();

  return {
    props: {
      pedidos: pedidos,
    },
  };
}

export default function Dashboard({ pedidos }: DashboardPageProps) {
  const headersTable = [
    "ID",
    "Cliente",
    "Itens",
    "Data Retirada",
    "Valor Total",
  ];

  return (
    <MountTransition className="flex flex-1 flex-col h-full gap-4">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <Box>
          <div>
            <LineChart />
          </div>
        </Box>
        <Box>
          <div>
            <LineChart />
          </div>
        </Box>
        <Box className="lg:col-span-2 xl:col-span-1">
          <div>
            <LineChart />
          </div>
        </Box>
      </div>
      <Box>
        <h3 className="dark:text-white text-xl font-medium mb-4">
          Últimos pedidos
        </h3>
        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-theme-dark.100 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root>
            <Table.Header headers={headersTable} />
            <Table.Body>
              {pedidos?.content?.map((pedido) => (
                <Table.Tr key={pedido.id}>
                  <Table.Td>{pedido.id}</Table.Td>
                  <Table.Td>{pedido.cliente.nome}</Table.Td>
                  <Table.Td>{"Salgado"}</Table.Td>
                  <Table.Td>
                    {moment(pedido.dataRetirada).locale("pt-br").format()}
                  </Table.Td>
                  <Table.Td>{pedido.valorTotal}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </Box>
    </MountTransition>
  );
}

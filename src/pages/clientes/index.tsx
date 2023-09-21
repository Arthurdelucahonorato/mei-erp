import { MountTransition } from "@/components/AnimatedRoutes/MountTransition/index";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";

export default function Clientes() {

    const headers = ["id", "nome", "telefone"]

    return <MountTransition >
        <Table.Root>
        <Table.Header  headers={headers}/>
        <Table.Body>
            <Table.Tr>
                <Table.Td>
                    salve
                </Table.Td>
                <Table.Td>
                    salve
                </Table.Td>
                <Table.Td>
                    salve
                </Table.Td>
            </Table.Tr>
        </Table.Body>
    </Table.Root>
    </MountTransition> 
}
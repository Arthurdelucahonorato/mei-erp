import ComboBox from "@/components/ComboBox";
import Lov from "@/components/Lov";
import { getAllRequests } from "@/services/api/adm/get-all-requests";

const valoresCombo = [
    { value: "PIX", name: 'Pix' },
    { value: "A_VISTA", name: 'A vista' },
    { value: "CARTAO_CREDITO", name: 'Cartão Crédito' },
    { value: "CARTAO_DEBITO", name: 'Cartão Débito' },
    { value: "DINHEIRO", name: 'Dinheiro' },
]


export default function Relatorios() {
    return (
        <div>
            <Lov title={"teste lov"} listLabels={["ID", "ETIQUETA", "ETIQUETA", "ETIQUETA"]} listValues={[["VALOR 1", "VALOR 2", "VALOR 3", "VALOR 4"], ["VALOR 1", "VALOR 2", "VALOR 3", "VALOR 4"], ["VALOR 1", "VALOR 2", "VALOR 3", "VALOR 4"], ["VALOR 1", "VALOR 2", "VALOR 3", "VALOR 4"]]}>
                LISTA DE VALORES
            </Lov>
            <br />
            <br />
            <ComboBox currentValue={"teste"} values={valoresCombo} label="Forma de Pagamento" required errorMessage="erro" />
        </div>
    )
}
import ComboBox from "@/components/ComboBox";
import Lov from "@/components/Lov";

export default function Relatorios() {
    return (
        <div>
            <Lov title={"teste lov"} listValues={[["V1", "V2", "V3"], ["V1", "V2", "V3"], ["V1", "V2", "V3"], ["V1", "V2", "V3"], ["V1", "V2", "V3"], ["V1", "V2", "V3"]]}>
                LISTA DE VALORES
            </Lov>

            <ComboBox currentValue={"teste"} values={["teste", "teste2", "teste3"]} label="Combo Teste" required errorMessage="erro" />
        </div>
    )
}
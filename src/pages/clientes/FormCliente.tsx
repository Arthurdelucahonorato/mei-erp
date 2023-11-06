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
import { api } from "@/services/api/api";

interface FormClienteType {
    formClienteIsOpen: boolean;
    titleModal: String;
    toogleFormCliente: () => void;
}

export default function FormCliente({ formClienteIsOpen, titleModal, toogleFormCliente }: FormClienteType) {
    const [isOpenClienteRegister, setIsOpenClienteRegister] = useState(false);
    const [isOpenClienteEdit, setIsOpenClienteEdit] = useState(false);

    const toogleClienteRegister = () => {
        reset();
        setIsOpenClienteRegister(!isOpenClienteRegister);
    };
    const toogleClienteEdit = (cliente?: any) => {
        reset();
        setIsOpenClienteEdit(!isOpenClienteEdit);
        if (!isOpenClienteEdit && cliente) {
            setValue("codigoCliente", cliente.codigoCliente);
            setValue("nomeCliente", cliente.nomeCliente);
            setValue("telefone", cliente.telefone);
            setValue("email", cliente.email);
            setValue("cep", cliente.cep);
            setValue("cidade", cliente.cidade);
            setValue("bairro", cliente.bairro);
            setValue("rua", cliente.rua);
            setValue("numero", cliente.numero);
            setValue("complemento", cliente.complemento);
        }
    };

    const validateRegister = z.object({
        codigoCliente: z.string(),
        nomeCliente: z.string().nonempty("Campo obrigatório"),
        telefone: z.string().nonempty("Campo obrigatório"),
        email: z.string(),
        cep: z.string().nonempty("Campo obrigatório"),
        cidade: z.string(),
        bairro: z.string().nonempty("Campo obrigatório"),
        rua: z.string().nonempty("Campo obrigatório"),
        numero: z.string().nonempty("Campo obrigatório"),
        complemento: z.string(),
        pesquisar: z.string(),
    });

    type ValidateData = z.infer<typeof validateRegister>;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ValidateData>({
        mode: "onSubmit",
        resolver: zodResolver(validateRegister),
    });

    const submitFormRegister = async ({
        codigoCliente,
        nomeCliente,
        email,
        telefone,
        cep,
        cidade,
        bairro,
        rua,
        numero,
        complemento,
    }: ValidateData) => {
        try {
            const request = await api.post("/clients", { codigoCliente, nomeCliente, email, telefone, cep, cidade, bairro, rua, numero, complemento })
            console.log('Executou insert')
            console.log(request.data)
            return request.data
        } catch (error: any) {
            console.log(error);
            return;
        }
    };
    const submitFormEdit = async ({
        codigoCliente,
        nomeCliente,
        email,
        telefone,
        cep,
        cidade,
        bairro,
        rua,
        numero,
        complemento,
    }: ValidateData) => {
        try {
            console.log("Editou");
        } catch (error: any) {
            return;
        }
    };

    return (
        <Modal
            isOpen={formClienteIsOpen}
            toggle={toogleFormCliente}
            title={titleModal}
        >
            <form
                className="max-w-2xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
            //onSubmit={() => handleSubmit(submitFormRegister)}
            >
                <Input
                    className="col-span-3 md:col-span-12"
                    {...register("nomeCliente")}
                    label="Nome"
                    htmlFor="nomeCliente"
                    errorMessage={errors.nomeCliente?.message}
                    type="text"
                    placeholder="Nome do Cliente"
                    required
                />
                <Input
                    {...register("email")}
                    className="col-span-2 md:col-span-8"
                    label="E-mail"
                    htmlFor="email"
                    type="text"
                    placeholder="E-mail"
                />
                <Input
                    className="col-span-1 md:col-span-4"
                    {...register("telefone")}
                    label="Telefone"
                    htmlFor="telefone"
                    errorMessage={errors.telefone?.message}
                    type="text"
                    placeholder="Telefone"
                    required
                />
                <Input
                    className="col-span-1 md:col-span-2"
                    {...register("cep")}
                    label="CEP"
                    htmlFor="cep"
                    errorMessage={errors.cep?.message}
                    type="number"
                    placeholder="CEP"
                    required
                />
                <Input
                    {...register("cidade")}
                    className="col-span-2 md:col-span-10"
                    label="Cidade"
                    htmlFor="cidade"
                    type="text"
                    placeholder="Cidade"
                    disabled
                />
                <Input
                    className="col-span-1 md:col-span-5"
                    {...register("bairro")}
                    label="Bairro"
                    htmlFor="bairro"
                    errorMessage={errors.bairro?.message}
                    type="text"
                    placeholder="Bairro"
                    required
                />
                <Input
                    className="col-span-2 md:col-span-5"
                    {...register("rua")}
                    label="Rua"
                    htmlFor="rua"
                    errorMessage={errors.rua?.message}
                    type="text"
                    placeholder="Rua"
                    required
                />
                <Input
                    className="col-span-1 md:col-span-2"
                    {...register("numero")}
                    label="Número"
                    htmlFor="numero"
                    errorMessage={errors.numero?.message}
                    type="text"
                    placeholder="Número"
                    required
                />
                <Input
                    {...register("complemento")}
                    className="col-span-2 md:col-span-12"
                    label="Complemento"
                    htmlFor="complemento"
                    type="text"
                    placeholder="Complemento"
                />
                <div className="ml-auto col-span-3 md:col-span-12">
                    <Button type="button" onClick={() => handleSubmit(submitFormRegister)}>{titleModal}</Button>
                </div>
            </form>
        </Modal>
    );
};

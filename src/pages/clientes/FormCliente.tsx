import { useEffect, useState } from "react";
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
import { el } from "@faker-js/faker";

interface FormClienteType {
    formClienteIsOpen: boolean;
    titleModal: String;
    toogleFormCliente: () => void;
    clienteEdicao?: Client;
}

export default function FormCliente({ formClienteIsOpen, titleModal, toogleFormCliente, clienteEdicao }: FormClienteType) {
    useEffect(() => {
        if (clienteEdicao) {
            setValue("nome", clienteEdicao.nome);
            setValue("telefone", clienteEdicao.telefone);
            setValue("email", clienteEdicao.email);
            setValue("endereco.cep", clienteEdicao?.endereco?.cep);
            /*  setValue("endereco.cidade", clienteEdicao.endereco.cidade); */
            setValue("endereco.bairro", clienteEdicao?.endereco?.bairro);
            setValue("endereco.rua", clienteEdicao?.endereco?.rua);
            setValue("endereco.numero", clienteEdicao?.endereco?.numero);
            setValue("endereco.complemento", clienteEdicao?.endereco?.complemento);
        }
    }, [clienteEdicao])

    const validateRegister = z.object({
        nome: z.string().nonempty("Campo obrigatório"),
        telefone: z.string().nonempty("Campo obrigatório"),
        email: z.string(),
        endereco: z.object({
            bairro: z.string().nonempty("Campo obrigatório"),
            cep: z.string().nonempty("Campo obrigatório"),
            complemento: z.string(),
            numero: z.string().nonempty("Campo obrigatório"),
            rua: z.string().nonempty("Campo obrigatório"),
        })
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
    console.log(errors)

    const submitFormRegister = async (data: ValidateData) => {
        console.log('data')
        console.log(data)
        try {
            const request = await api.post("/clients", data)
            console.log('Executou insert')
            console.log(request.data)
            return request.data
        } catch (error: any) {
            console.log(error);
            return;
        }
    };
    const submitFormEdit = async (id: number, data: ValidateData) => {
        try {
            const request = await api.put("/clients/" + id, data)
            console.log('Executou update')
            console.log(request.data)
            return request.data
        } catch (error: any) {
            console.log(error);
            return;
        }
    };

    /*     const qualUsar = (cliente: Client) => {
            if (clienteEdicao) {
                submitFormEdit(clienteEdicao.id, clienteEdicao);
            } else {
                submitFormRegister(cliente);
            }
        } */
    return (
        <Modal
            isOpen={formClienteIsOpen}
            toggle={toogleFormCliente}
            title={titleModal}
        >
            <form
                className="max-w-2xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
                onSubmit={handleSubmit(submitFormRegister)}
            >
                <Input
                    className="col-span-3 md:col-span-12"
                    {...register("nome")}
                    label="Nome"
                    htmlFor="nome"
                    errorMessage={errors.nome?.message}
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
                    {...register("endereco.cep")}
                    label="CEP"
                    htmlFor="cep"
                    errorMessage={errors.endereco?.cep?.message}
                    type="number"
                    placeholder="CEP"
                    required
                />
                <Input
                    /* {...register("endereco.cidade")} */
                    className="col-span-2 md:col-span-10"
                    label="Cidade"
                    htmlFor="cidade"
                    type="text"
                    placeholder="Cidade"

                />
                <Input
                    className="col-span-1 md:col-span-5"
                    {...register("endereco.bairro")}
                    label="Bairro"
                    htmlFor="bairro"
                    errorMessage={errors.endereco?.bairro?.message}
                    type="text"
                    placeholder="Bairro"
                    required
                />
                <Input
                    className="col-span-2 md:col-span-5"
                    {...register("endereco.rua")}
                    label="Rua"
                    htmlFor="rua"
                    errorMessage={errors.endereco?.rua?.message}
                    type="text"
                    placeholder="Rua"
                    required
                />
                <Input
                    className="col-span-1 md:col-span-2"
                    {...register("endereco.numero")}
                    label="Número"
                    htmlFor="numero"
                    errorMessage={errors.endereco?.numero?.message}
                    type="text"
                    placeholder="Número"
                    required
                />
                <Input
                    {...register("endereco.complemento")}
                    className="col-span-2 md:col-span-12"
                    label="Complemento"
                    htmlFor="complemento"
                    type="text"
                    placeholder="Complemento"
                />
                <div className="ml-auto col-span-3 md:col-span-12">
                    <Button type="submit">{titleModal}</Button>
                </div>
            </form>
        </Modal>
    );
};

import React, { useEffect, useState } from "react";
import Avatar from "@/assets/avatar.png";
import Image from "next/image";
import { ToggleDarkMode } from "@/components/Button/ToggleDarkMode";
import { useRouter } from "next/router";
import { Menus } from "./PrivateHeader";
import Modal from "@/components/Modal";
import { Input } from "@/components/Input";
import { UserTypeEnum } from "@/types/enum/userType.enum";
import { enumToList } from "@/utils/enumToList";
import ComboBox from "@/components/ComboBox";
import { UserSituationEnum } from "@/types/enum/userSituation.enum";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { editUser } from "@/services/api/users/edit-user";
import { z } from "zod";



export function UserInfoHeader() {
  const { pathname } = useRouter();
  const pathTitle = Menus.find((route) => route.href === pathname)?.title;
  const [isOpenModalEditUser, setIsOpenModalEditUser] = useState<boolean>(false)

  const UserInfoEdit = () => {
    /*             setValue("nome", clienteEdicao.nome);
                setValue("telefone", clienteEdicao.telefone);
                setValue("email", clienteEdicao.email);
                setValue("endereco.cep", clienteEdicao?.endereco?.cep);
                setValue("endereco.cidade", clienteEdicao.endereco?.cidade);
                setValue("endereco.bairro", clienteEdicao?.endereco?.bairro);
                setValue("endereco.rua", clienteEdicao?.endereco?.rua);
                setValue("endereco.numero", clienteEdicao?.endereco?.numero);
                setValue("endereco.complemento", clienteEdicao?.endereco?.complemento); */

    const { reload } = useRouter();

    const validateRegister = z.object({
      nome: z.string().nonempty("Campo obrigatório"),
      email: z.string().nonempty("Campo obrigatório"),
      senha: z.string().nonempty("Campo obrigatório"),
      nivelAcesso: z.string().nonempty("Campo obrigatório"),
      situacao: z.string().nonempty("Campo obrigatório"),
    });

    type ValidateData = z.infer<typeof validateRegister>;

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<ValidateData>({
      mode: "onSubmit",
      resolver: zodResolver(validateRegister),
    });

    const submitFormEdit = async (id: number, data: ValidateData) => {
      try {
        toast.promise(editUser(id, data), {
          loading: "Salvando alterações do usuário",
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


    useEffect(() => {
      setValue("nome", "Nadianara");
      setValue("email", "keniel@gmail.com");
      setValue("senha", "senha");
      setValue("nivelAcesso", "ADMIN");
      setValue("situacao", "ATIVO");
    }, [])



    return (
      <Modal
        isOpen={isOpenModalEditUser}
        toggle={() => setIsOpenModalEditUser(!isOpenModalEditUser)}
        title={"Editar Usuário"}
      >
        <form
          className="max-w-2xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12">
          <div className="col-span-3 md:col-span-6 ">
            <Image
              src={Avatar}
              className={`duration-200 rounded-full cursor-pointer`}
              alt="user-image"
              height={250}
              width={250}
            />
          </div>
          <div className="flex flex-col col-span-3 md:col-span-6 justify-between ">
            <Input
              containerClassName="pb-3"
              {...register("nome")}
              label="Nome"
              htmlFor="nome"
              errorMessage={errors.nome?.message}
              type="text"
              placeholder="Nome"
              required
            />
            <ComboBox
              value={watch("nivelAcesso")}
              values={enumToList(UserTypeEnum)}
              label="Acesso"
              errorMessage={errors.nivelAcesso?.message}
              required
              onChangeValue={(value) => {
                setValue("nivelAcesso", value);
              }}
            />
            <ComboBox
              value={watch("situacao")}
              values={enumToList(UserSituationEnum)}
              label="Situação"
              errorMessage={errors.situacao?.message}
              required
              onChangeValue={(value) => {
                setValue("situacao", value);
              }}
            />
          </div>
          <Input
            containerClassName="col-span-3 md:col-span-6"
            {...register("email")}
            label="E-mail"
            htmlFor="email"
            errorMessage={errors.email?.message}
            type="text"
            placeholder="E-mail"
            required
          />
          <Input
            containerClassName="col-span-3 md:col-span-6"
            {...register("senha")}
            label="Senha"
            htmlFor="senha"
            errorMessage={errors.senha?.message}
            type="password"
            placeholder="Senha"
            required
          />

          <div className="ml-auto col-span-3 md:col-span-12">
            <Button type="submit">{"Salvar Alterações"}</Button>
          </div>
        </form>
      </Modal>
    )
  }

  return (
    <div className="sticky top-0 w-full flex flex-row justify-between items-center max-h-24 bg-white dark:bg-theme-dark.150 duration-300">
      <UserInfoEdit />
      <div className="flex mr-auto">
        <text className="text-xl font-semibold p-5 dark:text-white">
          {pathTitle}
        </text>
      </div>
      <div className="pr-5">
        <ToggleDarkMode />
      </div>
      <div className="flex bg-theme-light.50 dark:bg-theme-dark.100 rounded-xl p-1 mr-2 px-3 cursor-pointer " onClick={() => setIsOpenModalEditUser(!isOpenModalEditUser)}>
        <Image
          src={Avatar}
          className={`duration-200 rounded-full`}
          alt="A"
          height={50}
          width={50}
        />
        <div className={`flex flex-1 flex-col p-2 ${true && "mbm:hidden sm:flex"} dark:text-white`} >
          <text className="text-sm">Nadianara</text>
          <text className="text-xs">Admin</text>
        </div>
      </div>
    </div>
  );
}

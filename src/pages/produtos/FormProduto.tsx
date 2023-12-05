import { Button } from "@/components/Button";
import ComboBox from "@/components/ComboBox";
import { Input } from "@/components/Input";
import Modal from "@/components/Modal";
import { createProduct } from "@/services/api/products/create-product";
import { CategoryEnum } from "@/types/enum/category.enum";
import { Unit } from "@/types/enum/unit.enum";
import { Product } from "@/types/product";
import { enumToList } from "@/utils/enumToList";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface FormProdutoType {
    formProdutoIsOpen: boolean;
    titleModal: String;
    toogleFormProduto: () => void;
    produtoEdicao?: Product;
}
export default function FormProduto({ formProdutoIsOpen, titleModal, produtoEdicao, toogleFormProduto, ...props }: FormProdutoType) {
    useEffect(() => {
        if (produtoEdicao) {
            const formData = new FormData();
            setValue("categoria", produtoEdicao.categoria);
            setValue("descricao", produtoEdicao.descricao);
            setValue("unidade", produtoEdicao.unidade);
            //setValue("imagensProduto", produtoEdicao.imagensProduto);
        }
    }, [produtoEdicao]);

    const { reload } = useRouter();

    const validateRegister = z.object({
        imagensProduto: z.any().optional(),
        descricao: z.string().nonempty("Campo obrigatório"),
        categoria: z.string(),
        unidade: z.string(),
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

    const submitFormRegister = async (data: ValidateData) => {
        try {
            const formData = new FormData();
            if (data.imagensProduto && data.imagensProduto.length > 0) {
                for (let i = 0; i < data.imagensProduto.length; i++) {
                    formData.append("imagensProduto", data.imagensProduto[i]);
                }
            }
            formData.append("descricao", data.descricao);
            formData.append("categoria", data.categoria.toString());
            formData.append("unidade", data.unidade);

            await toast.promise(createProduct(formData), {
                error: (data) => data.response.data.message,
                loading: "Cadastrando produto...",
                success: (data) => {
                    reload();
                    return data.message;
                },
            });
        } catch (error: any) {
            toast(error.response.data.message);
            return;
        }
    };
    const submitFormEdit = async (id: number, data: ValidateData) => {
        try {
            console.log("Editou");
        } catch (error: any) {
            return;
        }
    };

    return (
        <Modal
            isOpen={formProdutoIsOpen}
            toggle={toogleFormProduto}
            title={titleModal}
        >
            <form
                className="max-w-2xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
                onSubmit={handleSubmit((data) =>
                    produtoEdicao
                        ? submitFormEdit(produtoEdicao.id, data)
                        : submitFormRegister(data)
                )}
            >
                <Input
                    containerClassName="col-span-3 md:col-span-12"
                    {...register("descricao")}
                    label="Nome"
                    htmlFor="nomeProduto"
                    errorMessage={errors.descricao?.message}
                    type="text"
                    placeholder="Nome do Produto"
                    required
                />

                <ComboBox
                    className="col-span-1 md:col-span-6"
                    value={watch("categoria")?.toString()}
                    values={enumToList(CategoryEnum)}
                    errorMessage={errors.categoria?.message}
                    label="Categoria do produto"
                    onChangeValue={(value) =>
                        setValue("categoria", value as CategoryEnum)
                    }
                />

                <ComboBox
                    className="col-span-1 md:col-span-6"
                    value={watch("unidade")?.toString()}
                    values={enumToList(Unit)}
                    errorMessage={errors.unidade?.message}
                    label="Tipo de unidade"
                    onChangeValue={(value) => setValue("unidade", value as Unit)}
                />
                <Input
                    className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-theme-light.100 file:dark:bg-theme-dark.200 file:dark:text-secondary file:text-primary
            hover:dark:bg-theme-dark.150 hover:bg-theme-light.150"
                    {...register("imagensProduto")}
                    type="file"
                    multiple
                    // accept="image/*"
                    label="Imagem"
                    containerClassName="col-span-12"
                />

                <div className="ml-auto col-span-3 md:col-span-12">
                    <Button type="submit">{titleModal}</Button>
                </div>
            </form>
        </Modal>
    );
};
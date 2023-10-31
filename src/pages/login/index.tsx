import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { userAuth } from "@/services/api/auth/userAuth";
import Link from "next/link";
import { api } from "@/services/api/api";

export default function Login() {
  const { push } = useRouter();

  const validatePasswordSchema = z.object({
    email: z
      .string()
      .nonempty("Campo obrigatório")
      .email("Insira um email válido"),
    password: z.string().nonempty("Campo obrigatório"),
  });

  type ValidatePassword = z.infer<typeof validatePasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidatePassword>({
    mode: "onSubmit",
    resolver: zodResolver(validatePasswordSchema),
  });

  const submitForm = async ({ email, password }: ValidatePassword) => {
    try {
      await toast.promise(userAuth({ email: email, senha: password }), {
        loading: "Acessando",
        success: (data) => {
          setCookie(null, "mei.authToken", data.accessToken, {
            maxAge: 60 * 60 * 2,
          });

          push("/dashboard");
          return data.message;
        },
        error: (error) => error.response.data.message,
      });
    } catch (error: any) {
      return;
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gradient-to-r dark:bg-gray-900 ">
      <div className="container max-w-md mx-auto xl:max-w-3xl flex bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src="https://cdn.leonardo.ai/users/c73f55a6-03e2-4506-a29e-032e6af35245/generations/0923bf6b-51c4-4ebd-8b71-73ad07690e02/Absolute_Reality_v16_coffe_cake_food_0.jpg"
            alt="my zomato"
          />
        </div>
        <div className="w-full xl:w-1/2 p-8">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitForm)}
          >
            <Input
              {...register("email")}
              label="Email"
              htmlFor="email"
              errorMessage={errors.email?.message}
              type="text"
              placeholder="Seu endereço de e-mail"
            />

            <div>
              <Input
                {...register("password")}
                label="Senha"
                htmlFor="senha"
                type="password"
                errorMessage={errors.password?.message}
                placeholder="Sua senha"
              />
            </div>
            <Link
              className="inline-block align-baseline ml-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              href="#"
            >
              Esqueceu a senha?
            </Link>
            <div className="flex w-full mt-4">
              <Button disabled={isSubmitting}>Entrar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

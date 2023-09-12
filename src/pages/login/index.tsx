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

export default function Login() {
  const { push } = useRouter();

  const validatePasswordSchema = z.object({
    email: z.string().nonempty("Campo obrigatório"),
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
      const response = await toast.promise(
        userAuth({ login: email, senha: password }),
        {
          loading: "Acessando",
          success: <b>Autenticado com sucesso!</b>,
          error: <b>Senha inválida</b>,
        }
      );
      console.log(response);
      if (response.statusCode === HttpStatusCode.Ok) {
        setCookie(null, "mei.authToken", "auth", {
          maxAge: 60 * 60 * 4,
        });
      }
    } catch (error: any) {
      return;
    }
    push("/dashboard");
  };

  return (
    <div className="flex w-full justify-center items-center bg-gradient-to-r ">
      <div className="container max-w-md mx-auto xl:max-w-3xl flex bg-white rounded-lg shadow overflow-hidden">
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
              <a
                className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                href="#"
              >
                Esqueceu a senha?
              </a>
            </div>
            <div className="flex w-full mt-4">
              <Button>Entrar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

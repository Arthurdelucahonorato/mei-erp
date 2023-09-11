import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function Login() {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-gradient-to-r from-slate-100 to-slate-200 bg-slate-200">
      <div className="container max-w-md mx-auto xl:max-w-3xl flex bg-white rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src="https://cdn.leonardo.ai/users/c73f55a6-03e2-4506-a29e-032e6af35245/generations/0923bf6b-51c4-4ebd-8b71-73ad07690e02/Absolute_Reality_v16_coffe_cake_food_0.jpg"
            alt="my zomato"
          />
        </div>
        <div className="w-full xl:w-1/2 p-8">
          <form className="flex flex-col gap-4" action="#">
            <Input
              label="Email"
              htmlFor="email"
              type="text"
              placeholder="Seu endereço de e-mail"
            />

            <div>
              <Input
                label="Senha"
                htmlFor="senha"
                type="password"
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
              <Button onClick={() => (window.location.href = "/dashboard")}>
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

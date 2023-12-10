import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Card } from "@/components/CardProduct/Card";
import { CardGrid } from "@/components/CardProduct/CardGrid";
import ProductCard from "@/components/CardProduct/CardStack";

import { getAllProducts } from "@/services/api/products/get-all-products";
import { Product } from "@/types/product";

type CardapioPageProps = {
  produtos: PaginatedResult<Product[]>;
};

export async function getServerSideProps() {
  const produtos = await getAllProducts();

  return {
    props: {
      produtos: produtos,
    },
  };
}

export default function Cardapio({ produtos }: CardapioPageProps) {
  const textToSendWhatsApp = (nomeProduto: string) => {
    const numeroTelefone = "48999582066"; // Substitua pelo seu número de telefone do WhatsApp
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de fazer um pedido do seu produto: ${nomeProduto}`
    );
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagem}`;

    window.open(linkWhatsApp, "_blank");
  };
  return (
    <div className="flex relative w-screen left-0 overflow-hidden top-0 h-screen bg-[url('../assets/homeBackground.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute flex flex-1 pt-[88px] w-screen h-full justify-center backdrop-brightness-95 bg-black bg-opacity-50 blur-md z-0"
      > </div>
      <div className="flex flex-1 relative top-24 flex-col justify-center items-center bg-transparent z-10">
        <h1 className="w-full text-center text-white text-5xl font-bold">Encomendas Recentes</h1>
        <div className="flex flex-1 px-6 overflow-y-auto mb-36">
          <CardGrid>
            {produtos?.content.map((produto) => {
              const images = produto.imagensProduto.map(({ path }) => path);
              return (
                // <ProductCard
                //   categoria={produto.categoria.descricao}
                //   nome={produto.descricao}
                //   imagem={produto.imagensProduto[0]?.path}
                // />
                <ProductCard
                  sendProductToWhatsApp={() =>
                    textToSendWhatsApp(produto.descricao)
                  }
                  category={produto.categoria}
                  name={produto.descricao}
                  images={images}
                />
              );
            })}
          </CardGrid>
        </div>
      </div>
    </div>

  );
}




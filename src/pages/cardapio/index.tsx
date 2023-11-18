import { Card } from "@/components/CardProduct/Card";
import { CardGrid } from "@/components/CardProduct/CardGrid";
import ProductCard from "@/components/CardProduct/CardStack";

import { getAllProducts } from "@/services/api/products/get-all-products";

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
  return (
    <>
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
              category={produto.categoria.descricao}
              name={produto.descricao}
              images={images}
            />
          );
        })}
      </CardGrid>
    </>
  );
}

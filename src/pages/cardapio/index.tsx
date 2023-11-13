import { Card } from "@/components/CardProduct/Card";
import { CardGrid } from "@/components/CardProduct/CardGrid";
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
    <CardGrid>
      {produtos?.content.map((produto) => {
        return (
          <Card
            categoria={produto.categoria.descricao}
            nome={produto.descricao}
            imagem={produto.imagensProduto[0]?.path}
          />
        );
      })}
      {/* <Card
        categoria="categoria"
        nome="produto"
        imagem={
          "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Card
        categoria="categoria"
        nome="produto"
        imagem={
          "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Card
        categoria="categoria"
        nome="produto"
        imagem={
          "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Card
        categoria="categoria"
        nome="produto"
        imagem={
          "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Card
        categoria="categoria"
        nome="produto"
        imagem={
          "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Card
        categoria="categoria"
        nome="produto"
        imagem={
          "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
      /> */}
    </CardGrid>
  );
}

import { PrivateHeader } from "@/components/Layout/Headers/PrivateHeader";
import { PublicHeader } from "@/components/Layout/Headers/PublicHeader";
import { UserInfoHeader } from "@/components/Layout/Headers/UserInfoHeader";
import { publicRoutes } from "@/services/secure/public-routes";
import "@/styles/globals.css";
import { GetServerSidePropsContext } from "next";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import nookies from "nookies";

const inter = Inter({ subsets: ["latin"] });

interface MyAppProps extends AppProps {
  isAuthenticated: boolean;
}

export default function App({
  Component,
  pageProps,
  isAuthenticated,
}: MyAppProps) {
  const { pathname } = useRouter();

  const isPublicRouterAndAuth =
    isAuthenticated && !publicRoutes.includes(pathname);
  return (
    <main
      className={`${inter.className} ${
        isAuthenticated ? "flex-row" : "flex-col"
      } flex min-h-screen max-w-screen overflow-y-auto`}
    >
      {isPublicRouterAndAuth ? (
        <PrivateHeader />
      ) : (
        pathname !== "/login" && <PublicHeader />
      )}
      <div className="w-full flex-1 min-h-screen overflow-y-auto">
        {isPublicRouterAndAuth && <UserInfoHeader />}
        <div
          className={`flex-1 bg-slate-50 dark:bg-gray-950 h-full w-full overflow-y-auto overflow-x-hidden ${
            isPublicRouterAndAuth && "p-3 pt-20"
          }`}
        >
          <Component {...pageProps} />
        </div>
      </div>
    </main>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  // Verifique se o token de autenticação está nos cookies no lado do servidor
  const cookies = nookies.get(ctx.ctx);
  const isAuthenticated = !!cookies["mei.authToken"]; // Substitua 'authToken' pelo nome do seu cookie de autenticação

  return {
    isAuthenticated,
  };
};

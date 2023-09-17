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

  const isPrivateRouterAndAuth = isAuthenticated && !publicRoutes.includes(pathname);
  const isPublicRouter = publicRoutes.includes(pathname) && pathname !== "/login"
  console.log(isPrivateRouterAndAuth)
  console.log(publicRoutes)
  console.log(pathname)
  return (
    <main className={`${inter.className} ${isAuthenticated ? "flex-row" : "flex-col"} flex min-h-screen max-w-screen overflow-auto`}>
      {(pathname !== "/_error" && pathname !== "/404" && pathname !== "/login") ? (
        isPrivateRouterAndAuth ? (
          <div className="flex flex-1 absolute w-full h-full overflow-y-hidden">
            <PrivateHeader />
            <div className="flex flex-1 flex-col w-full min-h-screen overflow-y-hidden">
              <UserInfoHeader />
              <div className=" flex-1 bg-slate-50 dark:bg-gray-950 h-full w-full overflow-x-auto overflow-y-auto p-3">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <PublicHeader />
            <div className="w-full flex-1 min-h-screen overflow-y-hidden">
              <div className={`flex-1 bg-slate-50 h-full w-full overflow-y-auto overflow-x-hidden`}>
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        )) : (
        <div className="flex flex-1 bg-slate-50">
          <Component {...pageProps} />
        </div>)}

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

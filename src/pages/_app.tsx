import { PrivateHeader } from "@/components/Layout/Headers/PrivateHeader";
import { UserInfoHeader } from "@/components/Layout/Headers/UserInfoHeader";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { parseCookies } from "nookies";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const { "mei.authToken": authToken } = parseCookies();

  return (
    <main className={`${inter.className} flex h-screen max-w-screen`}>
      {authToken && <PrivateHeader />}

      <div className="w-full max-h-full flex-1">
        {authToken && <UserInfoHeader />}
        <div className="bg-slate-50 dark:bg-gray-900 flex h-full overflow-y-auto overflow-x-hidden w-full p-6">
          <Component {...pageProps} />
        </div>
      </div>
    </main>
  );
}

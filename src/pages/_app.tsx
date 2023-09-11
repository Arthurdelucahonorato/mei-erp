import { PrivateHeader } from "@/components/Layout/Headers/PrivateHeader";
import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { Inter } from "next/font/google";
import nookies from "nookies";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} flex h-screen w-screen`}>
      <PrivateHeader />
      <Component {...pageProps} />
    </main>
  );
}

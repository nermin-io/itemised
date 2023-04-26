import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { inter } from "@/fonts";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

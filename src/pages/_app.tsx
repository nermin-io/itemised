import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { inter } from "@/fonts";
import Layout from "@/components/Layout";
import TodoProvider from "@/providers/TodoProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <TodoProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TodoProvider>
    </div>
  );
}

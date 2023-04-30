import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import TodoProvider from "@/providers/TodoProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodoProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TodoProvider>
  );
}

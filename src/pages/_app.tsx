import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import TodoProvider from "@/providers/TodoProvider";
import SettingsProvider from "@/providers/SettingsProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <TodoProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TodoProvider>
    </SettingsProvider>
  );
}

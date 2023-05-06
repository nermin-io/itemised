import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import TodoProvider from "@/providers/TodoProvider";
import SettingsProvider from "@/providers/SettingsProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Itemised</title>
        <meta
          name="description"
          content="Get organized and stay on top of your tasks with our web-based todo list application. Keep track of your to-do's, set deadlines, and prioritize your tasks with ease."
        />

        <meta property="og:url" content="https://itemised.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Itemised" />
        <meta
          property="og:description"
          content="Get organized and stay on top of your tasks with our web-based todo list application. Keep track of your to-do's, set deadlines, and prioritize your tasks with ease."
        />
        <meta
          property="og:image"
          content="https://itemised.vercel.app/images/ogimage.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="itemised.vercel.app" />
        <meta property="twitter:url" content="https://itemised.vercel.app/" />
        <meta name="twitter:title" content="Itemised" />
        <meta
          name="twitter:description"
          content="Get organized and stay on top of your tasks with our web-based todo list application. Keep track of your to-do's, set deadlines, and prioritize your tasks with ease."
        />
        <meta
          name="twitter:image"
          content="https://itemised.vercel.app/images/ogimage.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#222222" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#222222" />
      </Head>
      <SettingsProvider>
        <TodoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TodoProvider>
      </SettingsProvider>
    </>
  );
}

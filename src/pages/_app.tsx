import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { inter } from "@/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

import Head from "next/head";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const DocumentHead: React.FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
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
      <meta property="og:image" content="/images/ogimage.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Itemised Logo" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://itemised.vercel.app" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
    </Head>
  );
};

export default DocumentHead;

import "@/styles/globals.css";
import Head from "next/head";
import Layout from "./layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Satoshi Raffles</title>

        <meta property="og:title" content="Satoshi Raffles" />
        <meta
          property="og:description"
          content="A place to partake in the raffles of unique and abstract Ordinal Artefacts"
        />
        <meta
          property="og:image"
          content="https://raffle.satoshipunks.art/cover.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raffle.satoshipunks.art" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Satoshi Raffles" />
        <meta
          name="twitter:description"
          content="A place to partake in the raffles of unique and abstract Ordinal Artefacts"
        />
        <meta
          name="twitter:image"
          content="https://raffle.satoshipunks.art/cover.jpg"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

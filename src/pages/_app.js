import Footer from "@/components/commons/Footer";
import Header from "@/components/commons/Header";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blog Photo</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

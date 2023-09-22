import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Enterprise Dashboard</title>
        <meta
          name="description"
          content="It is an app to enterprise see dashboard and informations of customers"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pontano+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/money.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
}

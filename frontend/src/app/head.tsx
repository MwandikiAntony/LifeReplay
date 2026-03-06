import React from "react";
import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <title>LifeReplay AI</title>
        <link rel="icon" type="image/png" href="/my-favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/my-favicon/favicon.svg" />
        <link rel="shortcut icon" href="/my-favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/my-favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="LifeReplay AI" />
        <link rel="manifest" href="/my-favicon/site.webmanifest" />
    </Head>
  );
}
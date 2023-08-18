import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Parfum Voha</title>
      </head>
      <body
        className={inter.className+"containr"}
        style={{ background: `url(/header.png)`, backgroundSize: "cover" }}
      >
        {children}
      </body>
    </html>
  );
}

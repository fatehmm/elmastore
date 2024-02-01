import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "@/trpc/react";
import { Suspense } from "react";
import Nav from "./components/nav";
import Providers from "providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Elma Store",
  description: "Elma Store provides cheaper iPhones 😭",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          <Suspense>
            <TRPCReactProvider>
              <Nav />
              {children}
            </TRPCReactProvider>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";
import { Header } from "@/components/Header";
import SessionWrapper from "@/components/sessionWrapper/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A saga do Ovelhera",
  description: "Acompanhe o nosso rastafari mineiro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="pt-br" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/maconha_2.png" sizes="32" />
          <meta
            http-equiv="Permissions-Policy"
            content="interest-cohort=()"
          ></meta>
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            enableSystem
            defaultTheme="system"
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main>{children}</main>
              <Toaster />
            </div>
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}

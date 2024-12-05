import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {StoreProvider} from "@/shared/providers/StoreProvider";
import {Navbar} from "@/widgets/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ticket App",
  description: "Test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <StoreProvider>
        <main>
          <Navbar/>
            <div className="p-10">
                {children}
            </div>
        </main>
      </StoreProvider>
      </body>
    </html>
  );
}

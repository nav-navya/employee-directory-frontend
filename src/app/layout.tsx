// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { ApolloProvider } from "@apollo/client";
// import { client } from "@/lib/apolloClient";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Employee Directory",
//   description: "GraphQL + Next.js App",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       ><ApolloProvider client={
//         client
//       }>
//         {children}
//         </ApolloProvider>
// {/* This sets up Apollo Client so you can now make GraphQL queries in your components! (backend frontend connection) */}
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import { Inter } from "next/font/google";
import ApolloWrapper from '../lib/ApolloWrapper' // 👉 we’ll create this next

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Employee Directory",
  description: "GraphQL + Next.js App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}


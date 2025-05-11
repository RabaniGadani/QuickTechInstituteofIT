import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Quick Tech",
  description: "Quick Tech Institute Of Information Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#0d9488', // Tailwind teal-900
              color: '#ffffff', // White text
              borderRadius: '8px',
              padding: '12px',
            },
            success: {
              style: {
                background: '#16a34a', // Tailwind green-600
              },
            },
            error: {
              style: {
                background: '#dc2626', // Tailwind red-600
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

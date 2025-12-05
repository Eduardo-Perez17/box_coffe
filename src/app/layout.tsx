import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Envía tus paquetes fácil y rápido | Box coffe",
  description:
    "Completa un formulario sencillo para enviar paquetes, documentos y productos. Ingresa direcciones, información básica del remitente y destinatario, y gestiona tus envíos de forma rápida y segura.",
  keywords: [
    "envíos",
    "paquetes",
    "formularios de envío",
    "delivery",
    "logística",
    "envío de dirección",
    "envío rápido",
  ],
  openGraph: {
    title: "Envía tus paquetes fácil y rápido",
    description:
      "Formulario simple para gestionar envíos: direcciones, información básica y detalles del paquete.",
    url: "https://box-coffe.vercel.app/",
    siteName: "Box coffe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

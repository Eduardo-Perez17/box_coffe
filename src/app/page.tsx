// Components
import { Metadata } from "next";
import { Grid, Header, Footer } from "@/components";

// Components form
import { Form } from "@/components/Form";

export const metadata: Metadata = {
  title: "Envía tus paquetes fácil y rápido | MiAppEnvios",
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
    url: "",
    siteName: "MiAppEnvios",
    type: "website",
  },
};

export default function Home() {
  return (
    <Grid>
      <Header />
      <div className="sm:grid sm:grid-cols-[60px_1fr_60px] md:grid-cols-[10px_1fr_10px]">
        <div className="sm:grid gap-8 sm:col-end-3 sm:col-start-2">
          <div className="flex flex-col gap-2 mb-7 sm:mb-0">
            <h1 className="text-center sm:text-left font-bold text-2xl text-[#4D5568]">
              Crea una orden
            </h1>
            <p className="text-center sm:text-left text-sm text-[#7682A0]">
              Dale una ventaja competitiva a tu negocio con entregas{" "}
              <strong>el mismo día</strong> (Área Metropolitana) y{" "}
              <strong>el día siguiente</strong> a nivel nacional.
            </p>
          </div>
          <Form />
        </div>
      </div>
      <Footer />
    </Grid>
  );
}

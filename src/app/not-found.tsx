import Link from "next/link";

// Components
import { Footer, Grid, Header } from "@/components";

export default function NotFoundPage() {
  return (
    <Grid>
      <Header />
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-[#4D5568]">Página no encontrada</h1>
        <p className="text-lg text-[#7682A0] mb-6">
          La ruta que intentas acceder no existe o fue movida.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-[#FF4300] text-white font-bold rounded-lg hover:bg-[#FF4300]/90 transition"
        >
          Volver al inicio
        </Link>
      </div>

      <Footer />
    </Grid>
  );
}

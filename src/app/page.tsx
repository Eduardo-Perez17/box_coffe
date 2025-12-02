// Components
import { Grid, Header, Footer } from "@/components";

// Components form
import { Form } from "@/components/Form";

export default function Home() {
  return (
    <Grid>
      <Header />
      <div className="sm:grid sm:grid-cols-[60px_1fr_60px] md:grid-cols-[80px_1fr_80px] lg:grid-cols-[160px_1fr_160px]">
        <div className="sm:grid gap-8 sm:col-end-3 sm:col-start-2">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-[#4D5568]">
              Crea una orden
            </h1>
            <p className="text-sm text-[#7682A0]">
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

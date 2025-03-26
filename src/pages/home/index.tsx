import { Container } from "../../components/container";

export function Home() {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-4xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          placeholder="Digite o modelo do carro"

        />

        <button className=" bg-red-500 text-white font-medium text-lg h-9 px-8 rounded-lg">
          Buscar
        </button>

      </section>

      <h1 className="font-semibold text-center text-2xl mt-6 mb-4">
        Carros Novos e Usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 houver:scale-105 transition-all"
            src='https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250314/lexus-es-300h-2.5-16v-hibrido-luxury-cvt-wmimagem13353781251.jpg?s=fill&w=1920&h=1440&q=75'
            alt="carro"
          />

          <p className="font-bold mt-1 mb-2 px-2 ">Nome do Veiculo | 00.000 km</p>
          
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6 ">Ano do Veiculo</span>
            <strong className="text-black font-medium text-xl">Valor</strong>
          </div>

          <div className="w-full h-px bg-slade-200 my-2 "></div>
          
          <div className="px-2 pb-2">
            <span className="text-zinc-700">
              Cidade - Estado
            </span>
          </div>

        </section>


      </main>


    </Container>
  );
}
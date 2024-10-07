import { Header } from "@/components/custom/Header";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  BankIcon,
  HammerIcon,
  CheckedClipboard,
} from "@/components/custom-icons";

export function Home() {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col items-center">
        <div
          id="home"
          className={`flex h-[600px] w-full items-center justify-center bg-[url('/src/assets/home-bg-image.jpg')] from-transparent to-white bg-cover bg-center bg-no-repeat`}
        >
          <div className="flex flex-col items-center justify-center text-grayLight">
            <h1 className="text-6xl font-bold">MULTI</h1>
            <h1 className="text-center text-3xl font-bold">UEPB</h1>
            <p className="mt-6 w-40 text-center">Um breve slogan do projeto</p>
          </div>
        </div>
        <div className="mt-[-144px] h-36 w-full bg-gradient-to-b from-transparent to-white"></div>
        <div
          id="about-us"
          className="flex w-full flex-col items-center pt-20 text-center"
        >
          <h1 className="flex flex-col items-center text-2xl font-bold">
            Quem somos?
            <hr className="mt-[-4px] w-24 border-[1.5px] border-orangeNormal" />
          </h1>
          <div className="mt-24 flex w-[670px] items-center justify-between">
            {/* <img src="" alt="" /> */}
            <img
              src="src/assets/multi-logo.jpg"
              alt="Logo do Multi"
              className="h-[144px] w-[200px]"
            />
            <p className="w-72">
              A plataforma Multi UEPB é projetada para ser uma solução
              abrangente e eficiente para o gerenciamento de aluguel de espaços,
              serviços e equipamentos em diversas instituições, atendendo a
              diferentes tipos de usuários: individuais, empresas, instituições
              públicas e instituições públicas/privadas.
            </p>
          </div>
        </div>
        <div
          id="features"
          className="flex w-full flex-col items-center pt-20 text-center"
        >
          <h1 className="flex flex-col items-center text-2xl font-bold">
            Funcionalidades
            <hr className="mt-[-4px] w-24 border-[1.5px] border-orangeNormal" />
          </h1>
          <div className="flex w-[750px] justify-between pt-20">
            <Card className="w-">
              <CardHeader className="flex items-center">
                <BankIcon size={50} />
                <h1>Instituições parceiras</h1>
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            <Card>
              <CardHeader>
                <HammerIcon size={50} />
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckedClipboard size={50} />
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
        <div id="faq" className=""></div>
      </div>
    </>
  );
}

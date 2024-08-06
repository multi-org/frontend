import { Header } from "@/components/custom/Header";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { BankIcon } from "@/components/custom-icons";


export function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col w-full items-center">
				<div id="home" className={`flex bg-center w-full justify-center items-center bg-[url('/src/assets/home-bg-image.jpg')] h-[600px] bg-no-repeat from-transparent to-white`}>
          <div className="flex flex-col items-center text-grayLight justify-center">
            <h1 className="text-6xl font-bold">MULTI</h1>
            <h1 className="text-3xl font-bold text-center">UEPB</h1>
            <p className="w-40 text-center mt-6">Um breve slogan do projeto</p>
          </div>
        </div>
        <div className="w-full h-36 mt-[-144px] bg-gradient-to-b from-transparent to-white">
        </div>
        <div id="about-us" className="w-full flex flex-col items-center pt-20 text-center">
          <h1 className="font-bold text-2xl flex flex-col items-center">
            Quem somos?
            <hr className="w-24 border-[1.5px] border-orangeNormal mt-[-4px]" />
          </h1>
          <div className="flex justify-between w-[670px] items-center mt-24">
            {/* <img src="" alt="" /> */}
            <h1 className="w-40 h-32 content-center text-4xl font-bold bg-[#d9d9d9]">LOGO</h1>
            <p className="w-72">
              A plataforma Multi UEPB é projetada para ser uma solução abrangente e eficiente para o gerenciamento de aluguel de espaços, serviços e equipamentos em diversas instituições, atendendo a diferentes tipos de usuários: individuais, empresas, instituições públicas e instituições públicas/privadas.
            </p>
          </div>
        </div>
        <div id="features" className="">
          <h1 className="font-bold text-2xl flex flex-col items-center">
            Quem somos?
            <hr className="w-24 border-[1.5px] border-orangeNormal mt-[-4px]" />
          </h1>
          <div className="pt-20">
            <Card>
              <CardHeader>
                <BankIcon size={50} />
              </CardHeader>
              <CardContent>

              </CardContent>
            </Card>
          </div>
        </div>
        <div id="faq" className="">
          AAAAAAAAAAAAAAAAAAAAAAA
        </div>
      </div>
    </>

  )
}

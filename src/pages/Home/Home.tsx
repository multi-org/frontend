import { Header } from '@/components/custom/Header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import {
  BankIcon,
  HammerIcon,
  CheckedClipboard,
} from '@/components/custom-icons'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { faqCarouselItems } from './Home.helpers'

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
          className="flex w-full flex-col items-center py-20 text-center"
        >
          <h1 className="flex flex-col items-center text-2xl font-bold">
            Funcionalidades
            <hr className="mt-[-4px] w-24 border-[1.5px] border-orangeNormal" />
          </h1>
          <div className="flex w-[750px] justify-between pt-20">
            <Card className="size-60">
              <CardHeader className="flex items-center">
                <BankIcon size={50} />
                <h1 className="text-sm font-medium">Instituições parceiras</h1>
              </CardHeader>
              <CardContent className="text-xs">
                As instituições parceiras disponibilizam suas centrais de forma
                visível e acessível, além de apoiar os pesquisadores na gestão
                dos equipamentos.
              </CardContent>
            </Card>

            <Card className="size-60">
              <CardHeader className="flex items-center">
                <HammerIcon size={50} />
                <h1 className="text-sm font-medium">
                  Equipamentos disponivéis
                </h1>
              </CardHeader>
              <CardContent className="text-xs">
                As centrais oferecem seus equipamentos de uso coletivo como um
                serviço para os usuários que necessitam.
              </CardContent>
            </Card>

            <Card className="size-60">
              <CardHeader className="flex items-center">
                <CheckedClipboard size={50} />
                <h1 className="text-sm font-medium">Requisição de serviços</h1>
              </CardHeader>
              <CardContent className="text-xs">
                Ao encontrar o equipamento necessário, o usuário faz uma
                requisição de serviço, preenchendo os detalhes e dados para
                cobrança.
              </CardContent>
            </Card>
          </div>
        </div>
        <div
          id="find-equipment"
          className="flex w-full flex-col items-center justify-center bg-blueNormal py-8 text-center text-white"
        >
          <div className="flex flex-col">
            <h1 className="w-[450px] text-center text-[32px] font-bold">
              ENCONTRE O EQUIPAMENTO QUE PRECISA
            </h1>
            <p className="w-60 self-center text-sm">
              Faça seu cadastro e descubra os equipamentos disponíveis
            </p>
          </div>
          <Button className="mt-6 h-10 w-44 bg-yellowDark">Comece agora</Button>
        </div>
        <div id="faq" className="mb-28 mt-20 pb-20">
          <h1 className="flex flex-col items-center text-2xl font-bold">
            Perguntas frequentes
            <hr className="mb-20 mt-[-4px] w-20 border-[1.5px] border-orangeNormal" />
          </h1>
          <Carousel className="flex justify-center">
            <CarouselContent className="w-[950px] gap-8 px-10">
              {faqCarouselItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="h-72 basis-1/3 rounded-[6px] border px-4 pt-8"
                >
                  <div className="flex h-32 items-center justify-center rounded-[6px] bg-[#D9D9D9]">
                    {item.image}
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    {item.question}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  )
}

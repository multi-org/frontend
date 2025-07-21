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
import { Footer } from '@/components/custom/Footer'
import { FrequentlyAskedQuestions } from '@/components/custom/AskedQuestions'


export function Home() {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col items-center">
        {/* HERO */}
        <div
          id="home"
          className="flex h-[500px] w-full items-center justify-center bg-[url('/src/assets/home-bg-image.jpg')] bg-cover bg-center bg-no-repeat"
        >
          <div className="flex flex-col items-center justify-center text-grayLight text-center">
            <h1 className="text-5xl font-bold sm:text-6xl">MULTI</h1>
            <h1 className="text-2xl font-bold sm:text-3xl">UEPB</h1>
            <p className="mt-6 w-64 text-sm">Um breve slogan do projeto</p>
          </div>
        </div>

        {/* GRADIENT */}
        <div className="mt-[-144px] h-36 w-full bg-gradient-to-b from-transparent to-white" />

        {/* SOBRE */}
        <div
          id="about-us"
          className="flex w-full max-w-6xl flex-col items-center px-4 pt-20 text-center"
        >
          <h1 className="text-2xl font-bold">
            Quem somos?
            <hr className="mx-auto mt-[-4px] w-24 border-[1.5px] border-orangeNormal" />
          </h1>
          <div className="mt-16 flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <img
              src="src/assets/multi-logo.jpg"
              alt="Logo do Multi"
              className="h-[120px] w-[180px] object-contain"
            />
            <p className="max-w-md text-sm text-justify">
              A plataforma Multi UEPB é projetada para ser uma solução
              abrangente e eficiente para o gerenciamento de aluguel de espaços,
              serviços e equipamentos em diversas instituições, atendendo a
              diferentes tipos de usuários: individuais, empresas, instituições
              públicas e privadas.
            </p>
          </div>
        </div>

        {/* FUNCIONALIDADES */}
        <div
          id="features"
          className="flex w-full max-w-7xl flex-col items-center px-4 py-20 text-center"
        >
          <h1 className="text-2xl font-bold">
            Funcionalidades
            <hr className="mx-auto mt-[-4px] w-24 border-[1.5px] border-orangeNormal" />
          </h1>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:justify-between">
            {[{
              Icon: BankIcon,
              title: "Instituições parceiras",
              desc: "As instituições parceiras disponibilizam suas centrais de forma visível e acessível, além de apoiar os pesquisadores na gestão dos equipamentos."
            }, {
              Icon: HammerIcon,
              title: "Equipamentos disponíveis",
              desc: "As centrais oferecem seus equipamentos de uso coletivo como um serviço para os usuários que necessitam."
            }, {
              Icon: CheckedClipboard,
              title: "Requisição de serviços",
              desc: "Ao encontrar o equipamento necessário, o usuário faz uma requisição de serviço, preenchendo os detalhes e dados para cobrança."
            }].map(({ Icon, title, desc }, index) => (
              <Card className="w-full max-w-[280px]" key={index}>
                <CardHeader className="flex flex-col items-center">
                  <Icon size={50} />
                  <h1 className="mt-2 text-sm font-medium">{title}</h1>
                </CardHeader>
                <CardContent className="text-xs text-justify">{desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ENCONTRE EQUIPAMENTOS */}
        <div
          id="find-equipment"
          className="flex w-full flex-col items-center justify-center bg-blueNormal px-4 py-12 text-center text-white"
        >
          <h1 className="text-2xl font-bold sm:text-3xl max-w-md">
            ENCONTRE O EQUIPAMENTO QUE PRECISA
          </h1>
          <p className="mt-2 text-sm max-w-xs">
            Faça seu cadastro e descubra os equipamentos disponíveis
          </p>
          <Button
            className="mt-6 h-10 w-44 bg-yellowDark"
            onClick={() => (window.location.href = '/produtos')}
          >
            Comece agora
          </Button>
        </div>

        {/* FAQ */}
        <div id="faq" className="mb-28 mt-20 px-4 pb-20  flex flex-col items-center">
          
            <div id="faq" className="mb-28 mt-20 px-4 pb-20 flex flex-col items-center ">


          <FrequentlyAskedQuestions onNext={() => console.log("Abrir formulário")} />
        </div>




        </div>
      </div>
      <Footer />
    </>
  )
}


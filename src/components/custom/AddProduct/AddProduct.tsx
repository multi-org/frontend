type AddProductProps = {
    onChosenProduct: (chosenProduct: number) => void;
}

export default function AddProduct({ onChosenProduct }: AddProductProps) {
    return (
        <>
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl font-bold">
                        Cadastro de Produtos
                    </h1>
                    <span className="font-medium">
                        Qual tipo de produto você deseja cadastrar?
                    </span>
                </div>
            </header>
            <div className="grid auto-rows-min gap-2 md:grid-cols-3 p-6">
                <div
                    className="bg-muted/50 aspect-video rounded-xl p-6 bg-[url('/src/assets/multi-prod-esp.png')] bg-cover bg-center bg-no-repeat hover:cursor-pointer overflow-hidden"
                    onClick={() => onChosenProduct(1)}
                >
                    <h1
                        className="flex items-center text-2xl text-grayLight font-bold justify-center"
                    >
                        Espaços
                    </h1>
                </div>
                <div
                    className="bg-muted/50 aspect-video rounded-xl p-6 bg-[url('/src/assets/multi-prod-serv.png')] bg-cover bg-center bg-no-repeat hover:cursor-pointer overflow-hidden"
                    onClick={() => onChosenProduct(2)}
                >
                    <h1
                        className="flex items-center justify-center text-2xl text-grayLight font-bold"
                    >
                        Serviços
                    </h1>
                </div>
                <div
                    className="bg-muted/50 aspect-video rounded-xl p-6 bg-[url('/src/assets/multi-prod-equip.png')] bg-cover bg-center bg-no-repeat hover:cursor-pointer overflow-hidden"
                    onClick={() => onChosenProduct(3)}
                >
                    <h1
                        className="flex items-center text-2xl text-grayLight font-bold justify-center"
                    >
                        Equipamentos
                    </h1>
                </div>
            </div>
        </>
    )
}

export { AddProduct }
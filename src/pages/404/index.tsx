export default function Custom404() {
    return (
        <div className="flex flex-1 justify-center items-center bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-secondary">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Erro!</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Desculpe, não conseguimos encontrar essa página. Continue explorando a partir da página inicial.</p>
                    <a href="/" className="inline-flex text-white bg-primary hover:bg-primary-second-tone focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4 dark:bg-secondary dark:hover:bg-secondary-second-tone">Voltar a Página Inicial</a>
                </div>
            </div>
        </div>
    )
}
import * as _ from "lodash";

interface PaginationProps {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  prevPage: number;
  nextPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  totalItems,
  currentPage,
  prevPage,
  nextPage,
  onPageChange,
}: PaginationProps) {
  const pages = _.range(1, totalPages + 1);

  function buscarPaginasProximas(values: number[], targetIndex: number): number[] {
    // Calcula a diferença entre o índice desejado e os índices dos valores
    const proximidade = values.map((value, index) => Math.abs(index - targetIndex));

    // Cria uma matriz de pares (valor, diferença)
    const matrizValorDiferenca = values.map((valor, index) => ({ valor, diferenca: proximidade[index] }));

    // Classifica os pares com base na diferença
    matrizValorDiferenca.sort((a, b) => a.diferenca - b.diferenca);

    // Retorna os quatro valores com as menores diferenças
    const valoresProximos = matrizValorDiferenca.slice(0, 5).map(pair => pair.valor);
    // Reordena a lista conforme valores originais
    return valoresProximos.sort((a, b) => values.indexOf(a) - values.indexOf(b));
  }

  return (
    <nav
      className="flex flex-1 items-center justify-between p-3 bg-white dark:bg-theme-dark.100 rounded-md shadow-md"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Total de Registros:{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>
      <ul className="inline-flex -space-x-px text-sm h-8">
        <li
          onClick={() => {
            if (prevPage) {
              onPageChange(prevPage);
            }
          }}
        >
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-theme-dark.100 dark:border-theme-dark.200 dark:text-gray-400 dark:hover:bg-theme-dark.200 dark:hover:text-white"
          >
            {"<-"}
          </a>
        </li>
        {buscarPaginasProximas(pages, pages.indexOf(currentPage)).map((page) => (
          <li key={page} onClick={() => onPageChange(page)}>
            <a
              href="#"
              className={
                page !== currentPage
                  ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-theme-dark.100 dark:border-theme-dark.200 dark:text-gray-400 dark:hover:bg-theme-dark.200 dark:hover:text-white"
                  : "flex items-center justify-center px-3 h-8 text-white bg-primary hover:bg-primary-second-tone dark:border-gray-700 dark:bg-secondary dark:hover:bg-secondary-second-tone dark:text-white"
              }
            >
              {page}
            </a>
          </li>
        ))}
        <li
          onClick={() => {
            if (nextPage) {
              onPageChange(nextPage);
            }
          }}
        >
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-theme-dark.100 dark:border-theme-dark.200 dark:text-gray-400 dark:hover:bg-theme-dark.200 dark:hover:text-white"
          >
            {"->"}
          </a>
        </li>
      </ul>
    </nav>
  );
}

import * as _ from 'lodash';

interface PaginationProps {
    items: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ items, pageSize, currentPage, onPageChange }: PaginationProps) {
    const pageCount: number = items / pageSize;
    const pages = _.range(1, pageCount + 1);
    return (
        <nav className="flex flex-1 items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-md" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Total de Registros: <span className="font-semibold text-gray-900 dark:text-white">{items}</span></span>
            <ul className="inline-flex -space-x-px text-sm h-8">
                <li onClick={() => onPageChange((currentPage != 1 ? currentPage - 1 : currentPage))}>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{"<-"}</a>
                </li>
                {pages.map((page) => (
                    <li key={page} onClick={() => onPageChange((page))} className={page === currentPage || ((page === currentPage + 1 || page === currentPage + 2) || (page === currentPage - 1 || page === currentPage - 2)) || (currentPage < 3 && (page <= 5)) || ((currentPage > Math.ceil(pageCount) - 3) && (page > Math.ceil(pageCount) - 5)) ? "block" : "hidden"}>
                        <a href="#" className={page !== currentPage ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" : "flex items-center justify-center px-3 h-8 text-white bg-primary hover:bg-primary-second-tone dark:border-gray-700 dark:bg-secondary dark:hover:bg-secondary-second-tone dark:text-white"}>{page}</a>
                    </li>
                ))}
                <li onClick={() => onPageChange(((currentPage != Math.ceil(pageCount) ? currentPage + 1 : currentPage)))}>
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{"->"}</a>
                </li>
            </ul>
        </nav>
    )
}
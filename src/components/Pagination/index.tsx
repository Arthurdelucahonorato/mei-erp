import * as _ from 'lodash';

interface PaginationProps {
    items: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ items, pageSize, currentPage, onPageChange }: PaginationProps) {

    const pageCount: number = items / pageSize;
    if (Math.ceil(pageCount) === 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li key={page} onClick={() => onPageChange((page))} className={page === currentPage ? "relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"}>
                        {page}

                    </li>
                ))}
            </ul>
        </nav>
    )
}
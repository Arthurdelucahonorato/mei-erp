import _ from 'lodash';

export const paginate = (items: any[], pageNumber: number, pageSize: number) => {
    const startIndex: number = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();

}
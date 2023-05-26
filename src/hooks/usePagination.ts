import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { parseInt } from "lodash";

export function usePagination<T>(list: T[]) {
  const [page, _setPage] = useState<number>(0);
  const [perPage] = useState<number>(10);

  const currentPage = page >= 0 ? page : 0;

  const newList = [...list].splice(currentPage * perPage, perPage);

  const pages = list.length / perPage;

  const setPage = (index) => {
    if (index >= 0 && index < pages) {
      _setPage(index);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [list.length]);

  return {
    list: newList,
    pagination: Pagination({
      pages: `${pages}`.includes(".") ? parseInt(`${pages}`) + 1 : pages,
      current: currentPage,
      setPage,
    }),
  };
}

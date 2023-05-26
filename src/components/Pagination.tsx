import React from "react";
import classNames from "classnames";

interface PaginationProps {
  pages: number;
  current: number;
  setPage: (number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pages,
  current,
  setPage,
}) => {
  return (
    <>
      {pages > 1 && (
        <nav>
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <a
                className={classNames("page-link", current === 0 && "disabled")}
                href="#"
                onClick={() => setPage(current - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {[...Array(pages)].map((_, index) => (
              <li className="page-item" key={`pagination${index}`}>
                <a
                  className={classNames(
                    "page-link",
                    index === current && "active"
                  )}
                  href="#"
                  onClick={() => setPage(index)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                className={classNames(
                  "page-link",
                  current === pages - 1 && "disabled"
                )}
                href="#"
                onClick={() => setPage(current + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

import React, { JSX } from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPaginationButtons = () => {
    const buttons: JSX.Element[] = []; // Explicitly type as JSX.Element[]

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &lt;
      </button>
    );

    // First page always shown
    buttons.push(
      <button
        key={1}
        className={currentPage === 1 ? "active" : ""}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    // If we're not at the beginning, maybe add ellipsis
    if (currentPage > 3) {
      buttons.push(
        <button key="ellipsis1" disabled>
          ...
        </button>
      );
    }

    // Show current page and neighbors
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i !== 1 && i !== totalPages) {
        buttons.push(
          <button
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    // If we're not at the end, maybe add ellipsis
    if (currentPage < totalPages - 2) {
      buttons.push(
        <button key="ellipsis2" disabled>
          ...
        </button>
      );
    }

    // Last page always shown if more than 1 page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? "active" : ""}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &gt;
      </button>
    );

    return buttons;
  };

  return (
    <div className="dashboard__table-pagination">
      <span>
        Showing {indexOfFirstItem}-{indexOfLastItem} of {totalItems} results
      </span>
      <div className="pagination-controls">{renderPaginationButtons()}</div>
    </div>
  );
};

export default Pagination;

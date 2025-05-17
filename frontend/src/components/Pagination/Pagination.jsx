import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import './Pagination.css';

const Pagination = ({ currentPage, totalProducts, productsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  // Handle clicking on a page number
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
      // Scroll to the top when changing page
      window.scrollTo(0, 0);
    }
  };

  // Generate page items
  const renderPageItems = () => {
    const items = [];
    
    // Add "First" page
    items.push(
      <BootstrapPagination.First 
        key="first" 
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
    );
    
    // Add "Previous" page
    items.push(
      <BootstrapPagination.Prev 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Calculate range of page numbers to display
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      items.push(
        <BootstrapPagination.Item 
          key={1} 
          onClick={() => handlePageChange(1)}
          active={currentPage === 1}
        >
          1
        </BootstrapPagination.Item>
      );
      if (startPage > 2) {
        items.push(<BootstrapPagination.Ellipsis key="ellipsis1" disabled />);
      }
    }

    // Add page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <BootstrapPagination.Item 
          key={page} 
          onClick={() => handlePageChange(page)}
          active={currentPage === page}
        >
          {page}
        </BootstrapPagination.Item>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<BootstrapPagination.Ellipsis key="ellipsis2" disabled />);
      }
      items.push(
        <BootstrapPagination.Item 
          key={totalPages} 
          onClick={() => handlePageChange(totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </BootstrapPagination.Item>
      );
    }

    // Add "Next" page
    items.push(
      <BootstrapPagination.Next 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );
    
    // Add "Last" page
    items.push(
      <BootstrapPagination.Last 
        key="last" 
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center my-4 pagination-container">
      <BootstrapPagination>
        {renderPageItems()}
      </BootstrapPagination>
    </div>
  );
};

export default Pagination; 
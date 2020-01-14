import React from 'react'
import PropTypes from 'prop-types';

import '../styles/components/Paginator.css';

class Paginator extends React.Component {
  selectPageNumber(selectedPageNumber) {
    const {
      pagesTotal,
      currentPage,
    } = this.props,
      isSelectablePageNumber = selectedPageNumber > 0 && selectedPageNumber <= pagesTotal && selectedPageNumber !== currentPage;

    // If the selected page number is selectable, execute the provided 'onPageSelect' function with the selected page number
    if (isSelectablePageNumber) {
      this.props.onPageSelect(selectedPageNumber);
    }
  }

  getSelectablePageNumbers() {
    const {
      pagesTotal,
      currentPage,
    } = this.props;

    // If neither the total pages or current is provided, return an empty set of selectable page numbers
    if (isNaN(pagesTotal) || isNaN(currentPage)) {
      return [];
    }

    let startPage, endPage;
    if (pagesTotal <= 10) {
      // If there is less than 10 pages total, show all page numbers
      startPage = 1;
      endPage = pagesTotal;
    } else {
      // If there is more than 10 pages total, calculate the page numbers to start and end with
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= pagesTotal) {
        startPage = pagesTotal - 9;
        endPage = pagesTotal;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    return [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
  }

  render() {
    const {
      pagesTotal,
      currentPage,
    } = this.props,
      selectablePageNumbers = this.getSelectablePageNumbers();

    // Don't display pagination if there is only 1 page
    if (!pagesTotal || selectablePageNumbers.length <= 1) {
      return null;
    }

    return (
      <div className='pagination-container'>
        <ul className="pagination">
          <li className={currentPage === 1 ? 'disabled' : ''}>
            <a onClick={() => this.selectPageNumber(1)} alt='First'>&laquo;</a>
          </li>
          <li className={currentPage === 1 ? 'disabled' : ''}>
            <a onClick={() => this.selectPageNumber(currentPage - 1)} alt='Previous'>&lsaquo;</a>
          </li>
          {selectablePageNumbers.map((page, index) =>
            <li key={index} className={currentPage === page ? 'active' : ''}>
              <a onClick={() => this.selectPageNumber(page)}>{page}</a>
            </li>
          )}
          <li className={currentPage === pagesTotal ? 'disabled' : ''}>
            <a onClick={() => this.selectPageNumber(currentPage + 1)} alt='Next'>&rsaquo;</a>
          </li>
          <li className={currentPage === pagesTotal ? 'disabled' : ''}>
            <a onClick={() => this.selectPageNumber(pagesTotal)} alt='Last'>&raquo;</a>
          </li>
        </ul>
      </div>
    );
  }
}

Paginator.propTypes = {
  pagesTotal: PropTypes.number,
  currentPage: PropTypes.number,
  onPageSelect: PropTypes.func.isRequired,
};

export default Paginator;

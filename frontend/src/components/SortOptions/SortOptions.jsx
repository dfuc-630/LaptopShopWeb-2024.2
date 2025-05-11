import React from 'react';
import { Form } from 'react-bootstrap';
import { sortOptions } from '../../constants/filterOptions';

const SortOptions = ({ sortOption, setSortOption }) => {
  return (
    <div className="d-flex justify-content-md-end align-items-center">
      <Form.Label htmlFor="sortSelect" className="me-2">Sắp xếp:</Form.Label>
      <Form.Select
        id="sortSelect"
        className="w-auto"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default SortOptions;
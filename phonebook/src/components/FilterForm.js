import React from 'react';
import Input from './Input';

const FilterForm = ({ filterBy, handleFilterChange }) => (
  <div>
    <Input text='filter shown with' value={filterBy} onChange={handleFilterChange} />
  </div>
)

export default FilterForm;
import React from 'react';

const FilterForm = ({ filter, handler }) => (
    <div>
      <p>Find countries <input value={filter} onChange={handler} /></p>
    </div>
)

export default FilterForm;
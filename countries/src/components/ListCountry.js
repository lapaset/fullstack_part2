import React from 'react';

const ListCountry = ({ country, handleShow }) => (
  <span>
    <br />
    {country.name}<button onClick={() => handleShow([country])}>
        show
      </button>
  </span>
)

export default ListCountry;
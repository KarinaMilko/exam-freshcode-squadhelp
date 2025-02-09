import React from 'react';
import CONSTANTS from './../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;
function ButtonGroup() {
  const btnSelect = [
    {
      label: 'Yes',
      description: 'But minor variations are allowed',
    },
    {
      label: 'Yes',
      description: 'The Domain should exactly match the name',
    },
    {
      label: 'No',
      description: 'I am only looking for a name, not a Domain',
    },
  ];

  return (
    <>
      <div>
        <h3>Do you want a matching domain (.com URL) with your name?</h3>
      </div>{' '}
      <span>Recommended</span>
      <img src={`${STATIC_IMAGES_PATH}icon-check.svg`} alt="icon" />
      {btnSelect.map(id => (
        <div key={id}>
          <h4>{id.label}</h4>
          <p>{id.description}</p>
        </div>
      ))}
      <p>
        If you want a matching domain, our platform will only accept those name
        suggestions where the domain is available.
      </p>
    </>
  );
}

export default ButtonGroup;

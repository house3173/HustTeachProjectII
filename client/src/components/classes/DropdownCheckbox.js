import React, { useState } from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';

const DropdownCheckbox = ({title, options, onChange, field }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedOptions;
    if (checked) {
      updatedOptions = [...selectedOptions, value];
    } else {
      updatedOptions = selectedOptions.filter(option => option !== value);
    }
    setSelectedOptions(updatedOptions);
    onChange(field, updatedOptions);
  };

  return (
    <DropdownButton id="searcharea-select-dropdown" title={title}>
      <Form>
        {options.map((option, index) => (
          <Form.Check
            className='ml-10'
            key={index}
            type="checkbox"
            label={option}
            value={option}
            onChange={handleCheckboxChange}
          />
        ))}
      </Form>
    </DropdownButton>
  );
};

export default DropdownCheckbox;

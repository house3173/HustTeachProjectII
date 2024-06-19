import React, { useState } from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';

const DropdownRadio = ({ title, options, onChange, field }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    onChange(field, [value]);
  };

  return (
    <DropdownButton id="searcharea-select-dropdown" title={title}>
      <Form>
        {options.map((option, index) => (
          <Form.Check
            className='ml-10'
            key={index}
            type="radio"
            label={option}
            value={option}
            onChange={handleRadioChange}
            checked={selectedOption === option}
          />
        ))}
      </Form>
    </DropdownButton>
  );
};

export default DropdownRadio;

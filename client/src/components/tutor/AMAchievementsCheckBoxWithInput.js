import React, { useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

const AMAchievementsCheckBoxWithInput = ({ id, label, onChange }) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    onChange(id, e.target.checked ? inputValue : null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (checked) {
      onChange(id, e.target.value);
    }
  };

  return (
    <div className="mb-3 ml-20">
      <Form.Check 
        type="checkbox" 
        id={`checkbox-${id}`} 
        label={label} 
        checked={checked} 
        onChange={handleCheckboxChange} 
      />
      {checked && (
        <FloatingLabel controlId={`input-${id}`} label={`Thông tin bổ sung cho ${label}`} className="mt-3">
          <Form.Control 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange} 
          />
        </FloatingLabel>
      )}
    </div>
  );
};

export default AMAchievementsCheckBoxWithInput;

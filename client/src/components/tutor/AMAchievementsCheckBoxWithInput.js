import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

const AMAchievementsCheckBoxWithInput = ({ id, label, onChange, checkedBox, inputValue: initialInputValue }) => {
  const [checked, setChecked] = useState(checkedBox);
  const [inputValue, setInputValue] = useState(initialInputValue);

  useEffect(() => {
    setChecked(checkedBox);
  }, [checkedBox]);

  useEffect(() => {
    setInputValue(initialInputValue);
  }, [initialInputValue]);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onChange(id, isChecked, isChecked ? inputValue : null);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (checked) {
      onChange(id, checked, value);
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

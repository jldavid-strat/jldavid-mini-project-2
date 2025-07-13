"use client"

import { useState, useEffect } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  value?: MultiValue<Option> | SingleValue<Option>; 
  defaultValue?: MultiValue<Option> | SingleValue<Option>; 
  onChange?: (value: MultiValue<Option> | SingleValue<Option>) => void;
}

export default function CustomSelect({ 
  options, 
  isMulti = false, 
  placeholder = "Select...",
  value,
  defaultValue,
  onChange 
}: SelectProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-10 border border-gray-300 rounded px-3 py-2 bg-white">
        <span className="text-gray-500">{placeholder}</span>
      </div>
    );
  }

  return (
    <Select
      instanceId={`select-${isMulti ? 'multi' : 'single'}`}
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      value={value} 
      onChange={onChange}
      defaultValue={defaultValue}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}
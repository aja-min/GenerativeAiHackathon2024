// context/FormContext.tsx
'use client';
import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
  input1: string;
  input2: string;
  input3: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const defaultFormData: FormData = {
  input1: '',
  input2: '',
  input3: ''
};

export const FormContext = createContext<FormContextType>({
  formData: defaultFormData,
  setFormData: () => {}
});

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

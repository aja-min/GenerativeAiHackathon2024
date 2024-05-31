'use client';

import React, { useContext } from 'react';
import { FormContext } from '../../../src/context/FormContext';
import styles from '../page.module.css';

const PageB: React.FC = () => {
  const { formData } = useContext(FormContext);

  return (
    <div className={styles.container}>
      <h1>Page B</h1>
      <div>
        <p>Input 1: {formData.input1}</p>
        <p>Input 2: {formData.input2}</p>
        <p>Input 3: {formData.input3}</p>
      </div>
    </div>
  );
};

export default PageB;

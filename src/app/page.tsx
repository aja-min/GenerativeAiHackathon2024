'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormContext } from '../../src/context/FormContext';
import styles from './page.module.css';

const Home: React.FC = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [input1, setInput1] = useState(formData.input1);
  const [input2, setInput2] = useState(formData.input2);
  const [input3, setInput3] = useState(formData.input3);
  const [input4, setInput4] = useState(formData.input4);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentQuestion === 3) {
      setFormData({ input1, input2, input3, input4 });
      router.push('/pageB');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider} style={{ transform: `translateX(-${currentQuestion * 100}%)` }}>
        <div className={styles.question}>
          <label>
            名前は？:
            <input
              type="text"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.question}>
          <label>
            趣味は？:
            <input
              type="text"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.question}>
          <label>
            何か一言！:
            <input
              type="text"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.question}>
          <label>
            自己紹介のテイストは？:
            <input
              type="text"
              value={input4}
              onChange={(e) => setInput4(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button className={styles.nextButton} onClick={handleNext}>Next</button>
    </div>
  );
};

export default Home;

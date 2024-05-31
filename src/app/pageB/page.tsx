'use client';

import React, { useEffect, useContext, useState } from 'react';
import { FormContext } from '../../../src/context/FormContext';
import styles from '../page.module.css';
// import getConfig from 'next/config'; // next/config パッケージのインポート
//
// const { serverRuntimeConfig } = getConfig(); // サーバーサイドの環境変数を取得

const PageB: React.FC = () => {
  const { formData } = useContext(FormContext);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY
        if (!apiKey) {
          console.error('API key not found');
          throw new Error('API key not found');
        }

        console.log(`Using API key: ${apiKey}`);

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'あなたは一流の自己紹介作成職人です。ユーザーの情報をもとに、適切な自己紹介文を作成してください。なお、自己紹介の時間は1分程度です。' },
              { role: 'user', content: `名前は${formData.input1},趣味は${formData.input2},一言は${formData.input3}です。${formData.input4}な感じで自己紹介を作成してください。` },
            ],
          }),
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data.choices[0].message.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [formData]);

  return (
    <div className={styles.container}>
      <h1>Page B</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>ChatGPT Response:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default PageB;

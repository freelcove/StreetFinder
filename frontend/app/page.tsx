"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/hello')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Hello from Next.js!</h1>
      <h2>Message from backend: {message}</h2>
    </div>
  );
}

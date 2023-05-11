"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';


//Coloque o código dos demais componentes aqui...

export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  
  fetch('https://...')
    .then(response => response.json())
    .then(data => {
        setBlogMessages(data);
    });
    
    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
      </main>
    )
}


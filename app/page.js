"use client"; 
import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange,
  onInStockOnlyChange }) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox"
          value={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

function SearchBar(props) {
  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  }

  const handleInStockChange = (e) => {
    props.onInStockChange(e.target.checked);
  }

  return (
    <form>
      <input type="text" placeholder="Search..." value={props.filterText} onChange={handleFilterTextChange} />
      <p>
        <input type="checkbox" checked={props.inStockOnly} onChange={handleInStockChange} />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

function Home() {
  const [blogMessages, setBlogMessages] = useState([]);

  useEffect(() => {
    fetch('https://...')
      .then(response => response.json())
      .then(data => setBlogMessages(data))
      .catch(error => console.error(error));
  }, []);

  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleFilterTextChange = (filterText) => {
    setFilterText(filterText);
  }

  const handleInStockChange = (inStockOnly) => {
    setInStockOnly(inStockOnly);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my blog
        </h1>
        <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={handleFilterTextChange} onInStockChange={handleInStockChange} />
        <div className={styles.grid}>
          {blogMessages.filter((message) => message.includes(filterText) && (!inStockOnly || message.stocked)).map((message, index) => (
            <div className={styles.card} key={index}>
              <h3>{message.name}</h3>
              <p>{message.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Home;

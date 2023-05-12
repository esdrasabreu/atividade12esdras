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

function Home() {
  const [blogMessages, setBlogMessages] = useState([]);

  useEffect(() => {
    fetch('https://...')
      .then(response => response.json())
      .then(data => {
        setBlogMessages(data);
      })
      .catch(error => {
        console.error('Error fetching blog messages:', error);
      });
  }, []);

  return (
    <main className={styles.main}>
      <FilterableMessageTable messages={blogMessages} />
    </main>
  );
}

function MessageRow({ message }) {
  return (
    <tr>
      <td>{message.author}</td>
      <td>{message.subject}</td>
      <td>{message.body}</td>
    </tr>
  );
}

function MessageCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="3">{category}</th>
    </tr>
  );
}

function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </form>
  );
}

function MessageTable({ messages, filterText }) {
  const rows = [];
  let lastCategory = null;

  messages.forEach((message) => {
    if (message.subject.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (message.category !== lastCategory) {
      rows.push(
        <MessageCategoryRow
          category={message.category}
          key={message.category}
        />
      );
    }
    rows.push(<MessageRow message={message} key={message.id} />);
    lastCategory = message.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Subject</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableMessageTable({ messages }) {
  const [filterText, setFilterText] = useState('');

  const filteredMessages = messages.filter((message) => {
    return message.author.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 ||
      message.subject.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 ||
      message.body.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
  });

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <MessageTable messages={filteredMessages} filterText={filterText} />
    </div>
  );
}

export default Home;

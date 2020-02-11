import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      products: [],
      productsInfo: {},
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productsInfo } = response.data

    this.setState({ products: docs, productsInfo, page });
  }

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.fetchProducts(pageNumber);
  }

  nextPage = () => {
    const { page, productsInfo } = this.state;

    if (page === productsInfo.pages) return;

    const pageNumber = page + 1;

    this.fetchProducts(pageNumber);
  }

  render() {
    const { products, productsInfo, page } = this.state;

    return (
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Adicionar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={page === productsInfo.pages} onClick={this.nextPage}>
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
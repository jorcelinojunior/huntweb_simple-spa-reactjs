import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
// import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ... productInfo } = response.data;

        this.setState({ 
            products: response.data.docs,
            productInfo,
            page
        });

        console.log(response.data.docs);
    };

    prevPage = () => {
        const { page, productInfo } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber); 
    }
    nextPage = () => {
        const { page, productInfo } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }
    
    render () {
        const { products, page, productInfo } = this.state;

        return (
                <div className='row product-list'>
                    {products.map(product => (
                        <div className="col-12 col-md-4 px-0">
                            <article className="card mt-4 mx-3" key="{product._id}">
                                <img src="https://source.unsplash.com/random/400x400" className="card-img-top" alt="{product.title}" />
                                <div className="card-body">
                                    <strong className="card-title">{product.title}</strong>
                                    <p className="card-text" style={{minHeight: '44px'}}>{product.description}</p>

                                    <Link className="btn btn-outline-warning w-100" to={`/products/${product._id}`}>Acessar</Link>
                                </div>
                            </article>
                        </div>
                    ))}

                    <div className="actions col-12 my-4">
                        <div className="row px-md-3">
                            <div className="col-12 col-md-5 pl-md-0">
                                <button disabled={page === 1} className="btn btn-warning w-100" onClick={this.prevPage}>Anterior</button>
                            </div>
                            <div className="col-12 col-md-2 mt-2"></div>
                            <div className="col-12 col-md-5 pr-md-0">
                                <button disabled={page === productInfo.pages } className="btn btn-warning w-100" onClick={this.nextPage}>Próximo</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
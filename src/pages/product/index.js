import React, { Component } from 'react';
import api from '../../services/api';

export default class Product extends Component {
    state = { 
        product: {},

    }

    async componentDidMount(){
        const { id } = this.props.match.params;
        const response = await api.get(`/products/${id}`);

        this.setState({product: response.data});
    }

    render() {
        const { product } = this.state;

        return (
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card py-3 px-4">
                        <h1 className="h1">{product.title}</h1>
                        <p>{product.description}</p>

                        <p className="alert alert-primary">
                            URL: <a className="text-primary" href={product.url}>{product.url}</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
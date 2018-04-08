import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm'; 


const Product = ({ product, updateProduct })=> {
  return (
    <ProductForm {...product } onSave={ updateProduct }/>
  );
};


const mapDispatchToProps = (dispatch, { id })=> {
  return {
    updateProduct: (product)=> {
      console.log('updating', product);
      console.log('with an id of', id);
    }
  };
};
const mapStateToProps = ({ products }, { id })=> {
  return {
    product: products.find( product => product.id === id )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

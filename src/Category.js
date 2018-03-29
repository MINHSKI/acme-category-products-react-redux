import React from 'react';
import { connect } from 'react-redux';
import { createProduct, deleteCategory } from './store';

const Category = ({ category, products, createProduct, deleteCategory })=> {
  if(!category){
    return null
  }
  return (
    <div>
      <h1>{ category.name }</h1>
      <button onClick={()=> deleteCategory(category)}>Delete Category</button>
      <button onClick={()=> createProduct(category)}>Add Product</button>
      <ul>
      {
        products.map( product => {
          return (
            <li key={ product.id }>
              { product.name }
            </li>
          );
        })
      }
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createProduct: (category)=> dispatch(createProduct(category)),
    deleteCategory: (category)=> dispatch(deleteCategory(category))
  };
};

const mapStateToProps = ({ categories, products }, { id })=> {
  const category = categories.find( category => category.id === id );
  const filtered = products.filter( product => product.categoryId === id );
  return {
    category,
    products: filtered
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);

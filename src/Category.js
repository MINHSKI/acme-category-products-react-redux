import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct, deleteCategory } from './store';
import ProductForm from './ProductForm';


const Category = ({ category, products, createProduct, deleteCategory, editProduct, createNewProduct })=> {
  if(!category){
    return null
  }
  return (
    <div>
      <h1>{ category.name }</h1>
      <ProductForm onSave={ createNewProduct }/>
      <button onClick={()=> deleteCategory(category)}>Delete Category</button>
      <button onClick={()=> createProduct(category)}>Add Product</button>
      <ul>
      {
        products.map( product => {
          return (
            <li key={ product.id }>
              <ProductForm { ...product } onSave={ editProduct }/>
              <Link to={`/products/${product.id}`}>{ product.name }</Link>
            </li>
          );
        })
      }
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { id })=> {
  return {
    editProduct: (product)=> {
      console.log('editing', product);
      console.log('btw the category is', id);
    },
    createNewProduct: (product)=> {
      console.log('inserting', product);
      console.log('btw the category is', id);
    },
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

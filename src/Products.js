import React from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from './store';

const Products = ({ products, categoriesMap, deleteProduct })=> {
  return (
    <div>
      <ul>
      {
        products.map( product => {
          return (
            <li key={ product.id }>
              { product.name }
              &nbsp;
              <button onClick={()=> deleteProduct(product)}>Delete Product</button>
              <br />
              {
                categoriesMap[product.categoryId] && categoriesMap[product.categoryId].name
              }
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
    deleteProduct: (product)=> dispatch(deleteProduct(product))
  };
};

const mapStateToProps = ({ categories, products })=> {
  const categoriesMap = categories.reduce((memo, category)=> {
    memo[category.id] = category;
    return memo;
  }, {});
  return {
    products,
    categoriesMap
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);

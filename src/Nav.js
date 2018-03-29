import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createCategory } from './store';

const Nav = ({ categories, products, categoryCounts, createCategory })=> {
  return (
    <ul>
      <li>
        <button onClick={()=> createCategory()}>
        Add A Category
        </button>
      </li>
      <li>
        <Link to='/products'>
          All Products ({ products.length })
        </Link>
      </li>
      {
        categories.map( category=> {
          return (
            <li key={ category.id }>
              <Link to={`/categories/${ category.id }`}>
                { category.name }
                ({ categoryCounts[category.id] || '0' })
              </Link>
            </li>
          );
        })
      }
    </ul>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createCategory: ()=> dispatch(createCategory())
  };
}

const mapStateToProps = ({ categories, products })=> {
  const categoryCounts = products.reduce((memo, product)=> {
    const id = product.categoryId;
    if(!memo[id]){
      memo[id] = 0;
    }
    memo[id]++;
    return memo;
  }, {});
  return {
    categoryCounts,
    categories,
    products
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

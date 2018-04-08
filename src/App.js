import React, { Component } from 'react';
import Nav from './Nav';
import { loadCategories, loadProducts } from './store';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Category from './Category';
import Products from './Products';
import Product from './Product';

class App extends Component{
  componentDidMount(){
    this.props.loadCategories();
    this.props.loadProducts();
  }
  render(){
    return (
      <Router>
      <div>
        <Nav />
        <Route exact path='/products' render={()=> <Products />} />
        <Route path='/products/:id' render={({ match})=> <Product id={ match.params.id * 1 }/>} />
        <Route path='/categories/:id' render={({match})=> <Category id={ match.params.id * 1}/>} />
      </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    loadCategories: ()=> dispatch(loadCategories()),
    loadProducts: ()=> dispatch(loadProducts())
  };
};


export default connect(null, mapDispatchToProps)(App);



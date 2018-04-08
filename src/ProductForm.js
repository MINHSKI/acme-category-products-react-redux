import React, { Component } from 'react';

class ProductForm extends Component{
  constructor({ name = '' }){
    super();
    this.state = {
      name
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.name){
      this.setState({ name: nextProps.name });
    }
  }
  onSave(){
    this.props.onSave(this.state);
  }
  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render(){
    const { name } = this.state;
    const { onChange, onSave } = this;

    return (
      <div style={{border: 'solid 5px black', margin: '5px'}}>
        <div>
          Name:
          <input value={ name } name='name' onChange={ onChange }/>
        </div>
        <button disabled={ !name } onClick={ onSave }>Save</button>
      </div>
    );
  }
}

export default ProductForm;

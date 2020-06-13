import React, {useState, useEffect, Component } from 'react';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';


class Customdelbtn extends React.Component { 

  handleDeleteButtonClick = (onClick) => {
    console.log('xxx');
    console.log(onClick);
  }

  render() { 
    return (
      <DeleteButton
        btnText='CustomDeleteText'
        btnContextual='btn-success'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={ e => this.handleDeleteButtonClick(e) }/>
    );
  }
}
 
export default Customdelbtn 
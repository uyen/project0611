import React, {useState, useEffect, Component } from 'react'; 

//  Bootstrap 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {BootstrapTable, TableHeaderColumn , 
  InsertModalHeader , HandleModalClose , 
  InsertButton , DeleteButton } from 'react-bootstrap-table';

class MyCustomBody extends Component {

  getFieldValue() {
    const newRow = {}; 

    this.props.columns.forEach((column, i) => { 

    	if(this.refs[column.field] !== undefined){
    		newRow[column.field] = this.refs[column.field].value;
    	} 
      	
    }, this); 
    return newRow;
  }

  render() { 
    const { columns, validateState } = this.props;
    return (
      <div className='modal-body'> 
        <div>
          {
			this.props.columns.map((column, i) => {
				const {
					editable,
					format,
					field,
					name,
					hiddenOnInsert
				} = column;

			if (hiddenOnInsert) { 
				return null;
			}

			const error = null
			if (validateState[field]) {
				error = "<span className='help-block bg-danger'>{ validateState[field] }</span>"
			}

			if(field == 'population'){
				return (
					<div className='form-group' key={ field }>
					  <label>{ name }</label>
					  <input ref={ field } type='number' min="0" max="9999999" defaultValue={ '' } class=" form-control editor edit-text"/>
					  { error }
					</div>
				);
			}else{
				return (
					<div className='form-group' key={ field }>
					  <label>{ name }</label>
					  <input ref={ field } type='text' defaultValue={ '' } class=" form-control editor edit-text"/>
					  { error }
					</div>
				);
			}
              
			
            })
          }
        </div>
      </div>
    );
  }
}


export default MyCustomBody
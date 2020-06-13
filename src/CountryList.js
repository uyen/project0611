import React, {useState, useEffect, Component } from 'react'; 

//  Bootstrap 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

//  other stuff
import Toast from 'react-bootstrap/Toast';

const TableTemplate = (props) => {
  return (
    <>
      <Toast show="true" onClose={props.updatesuperstate} style={{maxWidth: "none"}}>
        <Toast.Header>
          <strong className="mr-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>
          {props.children}
        </Toast.Body>
      </Toast>
    </>
  );
}

const CountryList = (props) => {
  const [show, toggleShow] = useState(true); 

  if(!show){
    
    var html = (<p>.</p>)

  }else{
    
    var html = (
        <Toast show="true" onClose={props.updatesuperstate} style={{maxWidth: "none"}}>
                  <Toast.Header>
                    <strong className="mr-auto">List of Country from {props.superstate.selectedcontinent}/{props.superstate.selectedregion}</strong>
                  </Toast.Header>
                  <Toast.Body>
                    {props.children}
                  </Toast.Body>
                </Toast>
      )
  }
  return (
    <>
      {html} 
    </>
  );
};

export {CountryList, TableTemplate};
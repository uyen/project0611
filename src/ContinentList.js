import React, {useState, useEffect, Component } from 'react'; 

//  Bootstrap 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

//  other stuff
import Toast from 'react-bootstrap/Toast';


const ContinentList = (props) => {
  const [show, toggleShow] = useState(true); 
  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Continent</Button>}
      <Toast show={show} onClose={() => toggleShow(false)} style={{maxWidth: "none"}}>
        <Toast.Header>
          <strong className="mr-auto">List of Continent</strong>
        </Toast.Header>
        <Toast.Body>{props.children}</Toast.Body>
      </Toast>
    </>
  );
};

export default ContinentList;
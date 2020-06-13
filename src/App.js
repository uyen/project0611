import React, {useState, useEffect, Component } from 'react'; 

//  Bootstrap 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {BootstrapTable, TableHeaderColumn , 
  InsertModalHeader , HandleModalClose , 
  InsertButton , DeleteButton } from 'react-bootstrap-table';

//  other UI stuff
import Toast from 'react-bootstrap/Toast';

//  CSS 
import './App.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// import the library
import { faHome, faPlus , faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//  other components
import ContinentList from './ContinentList';
import {CountryList, TableTemplate} from './CountryList'; 
import MyCustomBody from './MyCustomBody'; 


//  util  

function percentageFormatter(cell, row) {
  return cell + "%";
}

function officiallangFormatter(cell, row) {
  if(cell){
    return 'Yes'
  }else{
    return 'No'
  }
}




//  main app comp
class App extends Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {
      _isMounted: false,
      isLoading: true,
      showcontinent:true,
      allcontinent: [], 
      country:[],
      showcountry:false,
      city:[],
      showcity:false,
      selectedcontinent:'',
      selectedregion:''
    };

    //  table options all table
    this.options = { 
      defaultSortOrder: 'desc'  // default sort order
    }; 

    //  cb func when selected a row from continent table 
    this.selectrowcontinent = {
      mode: 'checkbox',
      hideSelectColumn: true, 
      clickToSelect: true,
      onSelect: (row, isSelected, e)=>{
        // selected row value 
        this.get_region_by_continent_name(row);
        this.forceUpdate()
      }
    };

    //  cb func when selected a row from region table 
    this.selectrowregion = {
      mode: 'checkbox',
      hideSelectColumn: true, 
      clickToSelect: true,
      onSelect: (row, isSelected, e)=>{
        // selected row value 
        this.get_countries_by_continent_name(row);
        this.forceUpdate()
      }
    }

    //  cb func when selected a row from country table 
    this.selectrowcountry = {
      mode: 'checkbox',
      hideSelectColumn: true, 
      clickToSelect: true,
      onSelect: (row, isSelected, e)=>{
        // selected row value
        this.get_city_by_country_id(row);
        this.forceUpdate()
      }
    };

    //  cb func when selected a row from country table 
    this.selectrowcity = {
      mode: 'radio', 
      clickToSelect: true,
      onSelect: (row, isSelected, e)=>{ 
        this.forceUpdate()
      }
    };

  }  
 


  createCustomDeleteButton = (onClick) => {
    return (
      <button style={ { color: 'red' } } onClick={ onClick }>Delete rows</button>
    );
 
  }

 //  get list of region from a continent_id
  get_region_by_continent_name(item){
    //  fetch data from API
    fetch('/region/' + item.continent)
      .then(res =>res.json())
      .then(data => {   
        if(data.length>=0){ 
          var continentname = item.continent
          this.setState(prevState => ({
              showcontinent:false,
              region:data,
              showregion:true,
              selectedcontinent : continentname,
              showcountry:false,
              showcity:false 
          })) 
        }
      })  

  }
  
  //  get list of city from a country_id
  get_city_by_country_id(item){
     
    //  fetch data from API
      fetch('/city/' + item.code)
      .then(res =>res.json())
      .then(data => {   
        if(data.length>=0){
          this.setState(prevState => ({
              showcontinent:false,
              city:data,
              showcity:true,
              selectedcountry:item.name,
              showcountry:false,
              countryinfo: item
          }))
        }
      })       
      fetch('/countrylanguage/' + item.code)
      .then(res =>res.json())
      .then(data => {   
        if(data.length>=0){
          this.setState(prevState => ({
              countrylanguage:data 
          }))
        }
      })    

      this.forceUpdate() 

  }
  //  get list of country from a continent 
  get_countries_by_continent_name(item){
    if(item.continent !='' ){

      //  fetch data from API
      fetch('/country/' + item.region)
      .then(res =>res.json())
      .then(data => {   
        if(data.length>=0){
          this.setState(prevState => ({
              country: data , 
              showcountry: true , 
              selectedregion: item.region,
              showcontinent:false,
              showregion:false,
          }))
        }
      })       
      this.forceUpdate() 
    }    
    return ('')
  } 

  //  only call API after component is rendered
  componentDidMount() {
    this.state._isMounted = true;    
    
    fetch('/continent')
    .then(res =>res.json())
    .then(data => {   
      this.setState(prevState => ({
          allcontinent: data
      }))
            
    })
    
  }

  componentWillUnmount() {
    this.state._isMounted = false;
  }

  //  sorting on table s
  handleBtnClick = () => {
    if (this.options.defaultSortOrder === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      this.options.defaultSortOrder = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      this.options.defaultSortOrder = 'desc';
    }
  }
 
  showcontinent = () => { 

    this.setState(prevState => ({
      showcontinent: true,
      showregion:false,
      showcountry: false,
      showcity: false,
    }))         
  }

  showregion = () => {
    this.setState(prevState => ({
      showcontinent: false,
      showregion:true,
      showcountry: false,
      showcity: false
    }))  
  }

  showcountry = () => {
    this.setState(prevState => ({
      showcontinent: false,
      showregion:false,
      showcountry: true,
      showcity: false
    }))  
  } 

  Customdelbtn = (onClick) => {
    return (
      <DeleteButton
        btnText="Delete City"
        btnContextual='btn-warning'
        className='faTrash'/>
    );
  } 

  onDeleteRow = (rowKeys) => { 
  
  }

  //
  handleInsertedRow = (formdata) => { 

    formdata.countrycode = this.state.countryinfo.code
 
 
      //  fetch data from API
      fetch('/city/new' , {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formdata)
      }).then(res =>res.json())
        .then(data => {   
          // console.log(data) 
          // console.log('forceUpdate')
          this.get_city_by_country_id({"code" : data.params.countrycode , "name":this.state.selectedcountry})
          this.forceUpdate()
        }) 

    
  }

  afterDeleteRow = (rowKeys) => {  
  
    //  fetch data from API
    fetch('/city/remove' , {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({"city_id": rowKeys[0] })
    }).then(res =>res.json())
      .then(data => {   
        // console.log(data) 
        // console.log('forceUpdate')
        this.get_city_by_country_id(this.state.countryinfo)
        this.forceUpdate()
      })

  }

  //  INSERT new city modal
  createCustomModalHeader = (closeModal, save) => {
    return (
      <InsertModalHeader 
        className='modal-header-custom-class'
        title='New City' />
    );
  }
  createCustomModalBody = (columns, validateState, ignoreEditable) => { 
    
    return (
      <MyCustomBody columns={ columns }
        validateState={ validateState }
        ignoreEditable={ ignoreEditable }
        countrycode={ this.state.countryinfo.countrycode } />
    );
  }

  onAfterSaveCell = (row, cellName, cellValue) => { 


    let rowStr = '';
    for (const prop in row) {
      rowStr += prop + ': ' + row[prop] + '\n';
      if(prop == cellName && row[prop] != cellValue){
         
        row[prop] = cellValue
        
        var params = {} //{"city_id" : row["id"]  , "updateon" : cellName , "updatevalue":cellValue } 
        params.city_id = row["id"] 
        params.updateon = cellName 
        params.updatevalue = cellValue 

        //  fetch data from API
        fetch('/city/update' , {
          method: "POST",
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(params)
        }).then(res =>res.json())
          .then(data => {    
            this.get_city_by_country_id({"code" : row["countrycode"] , "name":this.state.selectedcountry})
            this.forceUpdate()
          })  

      }
    }

  }

  //  validate edited vals
  onBeforeSaveCell = (row, cellName, cellValue) => {  

    if(cellValue.trim() == '' ){
      alert("Please enter value!") ; 
      return false;
    }else if(cellName == "population" && parseInt(cellValue)<=0 ){
      alert("Please enter number!") ; 
      return false;
    } 
 
    return true;
  }


  render() { 

    //  this let me click on row to edit
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell

    };

    var tblregiontitle = '';
    if(this.state.selectedcontinent && this.state.selectedcontinent.length>0 ){
      var tblregiontitle = this.state.selectedcontinent
    }

    var tblcountrytitle = this.state.selectedregion  ;
    if(tblregiontitle.length >0 ){
      tblcountrytitle = tblregiontitle + " / " + this.state.selectedregion    
    } 

    var tblcitytitle='';
    if(this.state.selectedcountry && this.state.selectedcountry.length>0){
      tblcitytitle = tblcountrytitle + ' / '+ this.state.selectedcountry
    }


    //  table city options 
    const tblcityoptions = { 
      defaultSortOrder: 'desc' ,  
      afterDeleteRow: this.afterDeleteRow,
      afterInsertRow: this.handleInsertedRow,
      deleteBtn: this.Customdelbtn,
      insertModalHeader : this.createCustomModalHeader,
      insertModalBody: this.createCustomModalBody
    };

    return (
      <Container className="p-12">    
        <div className="row p-12" id="table1">
          <h1 className="header">Welcome <FontAwesomeIcon icon={faHome} /> !</h1>
        </div> 

        {this.state.showcontinent && 
            <div className="row p-12" id="div1">
              <ContinentList name="table1">
                <BootstrapTable id="table1" data={this.state.allcontinent} striped hover selectRow={this.selectrowcontinent } options={ this.options }>
                  <TableHeaderColumn isKey dataField='continent' dataSort={ true }>Continent</TableHeaderColumn>
                  <TableHeaderColumn dataField='count' dataSort={ true }># Country</TableHeaderColumn>
                </BootstrapTable>
              </ContinentList>
            </div>
        }

        {this.state.showregion && 
            <div className="row p-12" id="div4">
              <TableTemplate name="table4" title={tblregiontitle} updatesuperstate={this.showcontinent} superstate={this.state}>
                <BootstrapTable id="table4" data={this.state.region} striped hover selectRow={this.selectrowregion } options={ this.options }>
                  <TableHeaderColumn isKey dataField='region' dataSort={ true }>Region Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='count' dataSort={ true }># Country</TableHeaderColumn>
                </BootstrapTable>
              </TableTemplate>
            </div>
        }  

        {this.state.showcountry && 
            <div className="row p-12" id="div2">
              <TableTemplate name="table4" title={tblcountrytitle} updatesuperstate={this.showcontinent} superstate={this.state}>
                <BootstrapTable id="table2" data={this.state.country} striped hover selectRow={this.selectrowcountry } options={ this.options }>
                  <TableHeaderColumn isKey dataField='code' dataSort={ true }>Code </TableHeaderColumn>
                  <TableHeaderColumn dataField='name' dataSort={ true }>Country Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='region' dataSort={ true }>Region</TableHeaderColumn>
                  <TableHeaderColumn dataField='population' dataSort={ true }>Population</TableHeaderColumn>
                  <TableHeaderColumn dataField='headofstate' dataSort={ true }>Head of State</TableHeaderColumn>
                </BootstrapTable>
              </TableTemplate> 
            </div>
        }   

        {this.state.showcity &&  
            <div className="row p-12" id="div3"> 

              <TableTemplate name="table3" title={tblcitytitle} updatesuperstate={this.showcountry} superstate={this.state}>
                <BootstrapTable id="table5" data={this.state.countrylanguage}>
                  <TableHeaderColumn isKey dataField='language' dataSort={ true }>Language </TableHeaderColumn>
                  <TableHeaderColumn dataField='isofficial' dataSort={ true }  dataFormat={ officiallangFormatter }>Official</TableHeaderColumn>
                  <TableHeaderColumn dataField='percentage' dataSort={ true } dataFormat={ percentageFormatter } >Percentage</TableHeaderColumn>
                </BootstrapTable>
                <br></br>
                <BootstrapTable id="table3" data={this.state.city} striped hover selectRow={ { mode: 'radio' } } remote={ true } options={ tblcityoptions } insertRow={ true } deleteRow remote={ true } cellEdit={ cellEditProp } >
                  <TableHeaderColumn isKey dataField='id' dataSort={ true } hidden hiddenOnInsert={true} >id</TableHeaderColumn>
                  <TableHeaderColumn dataField='name' dataSort={ true }>City Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='countrycode' dataSort={ true } hidden autoValue={true} hiddenOnInsert={true} editable={false}>Country Code</TableHeaderColumn>
                  <TableHeaderColumn dataField='district' dataSort={ true }>District</TableHeaderColumn>
                  <TableHeaderColumn dataField='population' dataSort={ true }>Population</TableHeaderColumn>
                </BootstrapTable>
              </TableTemplate>
            </div>
        }    

      </Container> 
    );
  }

}

export default App;

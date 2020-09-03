import React, { Component } from 'react';
import './App.scss';
import Tabletop from 'tabletop';
import AppHeader from './shared/header/AppHeader';
import TabMonth from './shared/tab/TabMonth';
import { getMonth } from './shared/utils/utils';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class App extends Component {
   constructor(props){
     super(props)
     this.state = {
       data: [],
       months: [],
       roles: [],
       curMonth: 'May'
    }
    this.distributeMonts = this.distributeMonts.bind(this)
    this.distributeRoles = this.distributeRoles.bind(this)
    this.getMonths = this.getMonths.bind(this)
    this.getMonthsRoles = this.getMonthsRoles.bind(this)
    this.getOrganigram = this.getOrganigram.bind(this)
    
    
   }

   distributeMonts(data) {
    for (const row of data) {
      const month = getMonth(row.Mes.split('-')[0])
      if(this.state.months.indexOf(month)===-1){
        this.state.months.push(month)
      }
    }
   }

   distributeRoles(data){
    for (const row of data) {
      const role = row["Nivel Jerárquico"]
      if(this.state.roles.indexOf(role)===-1){
        this.state.roles.push(role)
      }
    }
   }

   tabCliked(ev){
     this.setState({
       curMonth: ev
     })
   }

  componentDidMount() {
    Tabletop.init({
      key: '1y5vJUysvtar2PU_ngIGug1KC6Qq104kacOBg1LV5qAg',
      callback: googleData => {
        const data = googleData;
        console.log(data)
        
        this.distributeMonts(data)
        this.distributeRoles(data)
        console.log(this.state.roles)

        this.setState({
          data: data
        })
      },
      simpleSheet: true
    })
  }

  getMonths() {
    if (this.state?.months){
    return this.state.months.map((value, index) => <a className={"tab" + (this.state.curMonth === value ? " active " : "") }  onClick={this.tabCliked.bind(this, value)} key={index}> {value}</a>)
    } else {
        return []
    }
}

getMonthsRoles(month, role) {
  if(this.state?.months){
    if (month){
      console.log(month)
      console.log(role)
      const workers = this.state?.data.filter(worker => {
        return (getMonth(worker.Mes) === month) && worker["Nivel Jerárquico"] == role;
      })
      console.log(workers)
      return workers.map((value, index) => <div className={"card "+ (value["Nivel Jerárquico"])} key={index}> <h3>{value["Nombre "]}</h3> <h5>{value["Nivel Jerárquico"]}</h5> </div>)
    } 
  } else {
      return []
  }
}

getOrganigram(){
  if (this.state?.roles){
    console.log(this.state.roles)
    return <div>
      {this.state.roles.map((value,index)=>{
        return <div className="month-organ">
          {this.getMonthsRoles(this.state.curMonth, value)}
          </div>
      })}
    </div>
  }
}

  render() {
    return (
      <div>
      <AppHeader></AppHeader>
        <div className="App">
          <div className="tabs">
            {this.getMonths()}
          </div>
          <div>
            {this.getOrganigram()}
          </div>
      </div>
      </div>
    );
  }
}

export default App;
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
       curMonth: 'May'
    }
    this.distributeMonts = this.distributeMonts.bind(this)
    this.getMonths = this.getMonths.bind(this)
   }

   distributeMonts(data) {
    for (const row of data) {
      const month = getMonth(row.Mes.split('-')[0])
      if(this.state.months.indexOf(month)===-1){
        this.state.months.push(month)
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
        this.setState({
          data: data
        })
      },
      simpleSheet: true
    })
  }

  getMonths() {
    if (this.state?.months){
      const reversed = this.state?.months.reverse()
    return reversed.map((value, index) => <a className={"tab" + (this.state.curMonth === value ? " active " : "") }  onClick={this.tabCliked.bind(this, value)} key={index}> {value}</a>)
    } else {
        return []
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
      </div>
      </div>
    );
  }
}

export default App;
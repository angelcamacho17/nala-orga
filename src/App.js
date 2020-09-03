  import React, { Component } from 'react';
  import './App.scss';
  import Tabletop from 'tabletop';
  import AppHeader from './shared/header/AppHeader';
  import { Input } from 'antd';
  import { getMonth } from './shared/utils/utils';
  import { Tabs } from 'antd';
  import { UserOutlined } from '@ant-design/icons';
  import { AudioOutlined } from '@ant-design/icons';

  const { Search } = Input;
  const { TabPane } = Tabs;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

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
      this.filtering = this.filtering.bind(this)
    }

    /**
     * Get current months
     * @param {*} data 
     */
    distributeMonts(data) {
      for (const row of data) {
        const month = getMonth(row.Mes.split('-')[0])
        if(this.state.months.indexOf(month)===-1){
          this.state.months.push(month)
        }
      }
    }

    /**
     * Get current roles
     * @param {*} data 
     */
    distributeRoles(data){
      for (const row of data) {
        const role = row["Nivel Jerárquico"]
        if(this.state.roles.indexOf(role)===-1){
          this.state.roles.push(role)
        }
      }
    }

    /**
     * Set current month
     */
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

  /**
   * Return months tabs.
   */
  getMonths() {
      if (this.state?.months){
      return this.state.months.map((value, index) => <a className={"tab" + (this.state.curMonth === value ? " active " : "") }  onClick={this.tabCliked.bind(this, value)} key={index}> {value}</a>)
      } else {
          return []
      }
  }

  /**
   * Get employees according months and role.
   * @param {*} month 
   * @param {*} role 
   */
  getMonthsRoles(month, role) {
    if(this.state?.months){
      if (month){
        const workers = this.state?.data.filter(worker => {
          if (this.state.filter) {
            return (getMonth(worker.Mes) === month) && worker["Nivel Jerárquico"] == role &&  worker["Nombre "].toLowerCase().includes(this.state.filter);
          } else {
            return (getMonth(worker.Mes) === month) && worker["Nivel Jerárquico"] == role ;
          }
        })
        return workers.map((value, index) => 
              <div className={"card "+ (value["Nivel Jerárquico"])} key={index}> 
                    <h3>{value["Nombre "]}</h3> 
                    <p>{value["Nivel Jerárquico"]}</p> 
                    <p>{value["Area"]}</p> 
                    <p>{value["Fecha de ingreso"]}</p> 
                    <p>{value["Subarea"]}</p> 
                    <p>{value["Sueldo bruto"]}</p> 
              </div>)
      } 
    } else {
        return []
    }
  }

  /**
   * Get organigram per month.
   */
  getOrganigram(){
    if (this.state?.roles) {
      return <div>
        {this.state.roles.map((value,index)=>{
          return <div className="month-organ" key={index}>
            {this.getMonthsRoles(this.state.curMonth, value)}
            </div>
        })}
      </div>
    }
  }

  /**
   * Filter employees.
   * @param {*} ev
   */
  filtering(ev) {
    this.setState({
      filter: ev.target.value.toLowerCase()
    })
  }

    render() {
      return (
        <div>
        <AppHeader></AppHeader>
          <div className="App">
            <div className="filter">
              <UserOutlined></UserOutlined>
              <input
                  className="search"
                  placeholder="Look for an employee"
                  onChange={this.filtering}
                />
            </div>
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
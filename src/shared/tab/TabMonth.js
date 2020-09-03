import React, { Component } from 'react';
import { PageHeader } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class TabMonth extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
    }
    
    render() {
        return (
            <div className="tab">
                {this.props.month}
            </div>
        ) 
    }

}

export default TabMonth;
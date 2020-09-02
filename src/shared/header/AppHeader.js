import React, { Component } from 'react';
import { PageHeader } from 'antd';
import './AppHeader.scss'



class AppHeader extends Component {
    
    render() {
        return (
            <PageHeader
            className="header"
            title="Nala organigram"
          />
        ) 
    }

}

export default AppHeader;
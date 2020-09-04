import React, { Component } from 'react';
import './Worker.scss'



class Worker extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount() { }
    
    render() {
        return (
            <div className={"card "+ (this.props.worker["Nivel Jerárquico"])}> 
                    <h3>{this.props.worker["Nombre "]}</h3> 
                    <div>
                      <p className="label">nivel: </p> 
                        <p className="this.props.worker">
                          {this.props.worker["Nivel Jerárquico"]}
                        </p>
                    </div> 
                    <div>
                      <p className="label">area: </p> 
                      <p className="this.props.worker">
                        {this.props.worker["Area"]}
                      </p>
                    </div> 
                    <div>
                      <p className="label">ingreso:</p> 
                      <p className="this.props.worker">
                        {this.props.worker["Fecha de ingreso"]}
                      </p>
                    </div> 
                    <div>
                      <p className="label">subarea: </p>
                      <p className="this.props.worker">
                        {this.props.worker["Subarea"]}
                      </p>
                    </div> 
                    <div>
                      <p className="label">sueldo: </p>
                      <p className="this.props.worker">
                        {this.props.worker.Sueldo}
                      </p>
                    </div> 
              </div>
        ) 
    }

}

export default Worker;
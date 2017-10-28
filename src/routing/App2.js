import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import App from '../App'
import AdicionarUsuario from '../components/AdicionarUsuario'

class App2 extends Component{


    render(){
        return(
            <div>
                <div>
                    <Link to="/">Usuarios</Link>
                    <Link to="/adicionarUsuario">Adicionar usuario</Link>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/adicionarUsuario" component={AdicionarUsuario}/>
                    </Switch>  
                </div>
            </div>
        );
    }

}

export default App2
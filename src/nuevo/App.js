import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import DPizza from './DPizza';
import AdicionarProducto from './AdicionarProducto';
import EditarSucursal from './EditarSucursal';
import Menu from './Menu';
import '../stylesheets/App.css';

class App extends Component{

    render(){
        return(
            <div id="rutas">
                <DPizza/>
                <Switch>
                    <Route path="/editarSucursal/:id" component={EditarSucursal} />
                    <Route path="/adicionarProducto/:id" component={AdicionarProducto} />
                    <Route path="/sucursal/:id" component={Menu} />
                </Switch>
            </div>
        );
    }
}

export default App;
import React, { Component } from 'react';
import SubirCancion from './SubirCancion';
import ActualizarUsuario from './ActualizarUsuario';
import EliminarUsuario from './EliminarUsuario';

class Usuario extends Component{
    
    render(){
        return(
            <div>
                <h3>{this.props.nombre}</h3>
                {this.darCanciones()}
            </div>
        );
    }

    darCanciones = () =>{

        var canciones = this.props.canciones.map(function(cancion){
            return (
                <div key={cancion.cId}>
                    <label>{cancion.dNombre}</label>
                    <audio src={cancion.dUri} controls></audio>
                </div>
            )
        });

        return(
            canciones
        );
    }
}

export default Usuario;
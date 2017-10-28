import React, { Component } from 'react';

class ComboUD extends Component{
    
    constructor(props){
        super(props);
        this.state = {idActual: -1, nombre:""}
    }

    render(){
        
        return(
            <div>
                <select onChange={this.cambiarId}>
                    {this.darCombo()}
                </select>
                <input type="button" value="Borrar" onClick={this.eliminarUsuario}></input>
                <input type="text" placeholder="Nuevo nombre" onChange={this.cambiarNombre}/>
                <input type="button" value="editar" onClick={this.actualizarNombre}/>
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.usuarios[0]){
                this.setState({idActual: nextProps.usuarios[0].props.id});
            }else{
                this.setState({idActual: -1, nombre:""});
            }
        }
    }	

    eliminarUsuario = (e) =>{
        e.preventDefault();
        this.enviarDelete(this.state.idActual);
    }

    enviarDelete = (id) =>{
        let datos = {
            method: 'DELETE',
            headers:{
                'Accept': 'text/plain'
            }
        }

        fetch("https://shielded-escarpment-86252.herokuapp.com/eliminarUsuario/" + id, datos)
            .then(this.actualizar)
            .catch(err => console.log( "err" + err.message));
    }

    actualizar = (resp) =>{
        if(resp.ok){
            this.props.actualizar();
        }else{
            resp.text().then(text => console.log(text));
        }
    }

    cambiarId = (e) =>{
        e.preventDefault();
        this.setState({idActual:e.target.value})
    }

    cambiarNombre = (e) =>{
        e.preventDefault();
        this.setState({nombre:e.target.value});
    }

    actualizarNombre = (e) =>{
        e.preventDefault();
        this.enviarPut(this.state.idActual);
    }

    enviarPut = (id) =>{
        
        let datos = {
			method: 'PUT',
			body: JSON.stringify({nombre: this.state.nombre}),
			headers:{
				'Accept': 'text/plain',
				'Content-Type': 'application/json',
				'X-Custom-Header': 'value' //con ganas de borrarlo
			}
		}

		fetch("https://shielded-escarpment-86252.herokuapp.com/actualizarUsuario/" + id, datos)
        .then(this.actualizar)
        .catch(err => console.log( "err" + err.message));
    }

    darCombo = () =>{

        var usuarios = [];
        usuarios = this.props.usuarios.map(function(usuario){
            return <option key={usuario.props.id} value={usuario.props.id}>{usuario.props.nombre}</option>
        })
        
        return(	usuarios );
    }
}

export default ComboUD;
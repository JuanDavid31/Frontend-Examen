import React, { Component } from 'react';

class ActualizarUsuario extends Component{
	constructor(){
		super();
		this.state = {nombre:""};
	}

	onChange = (event)  =>{
		this.setState({nombre: event.target.value});
	}

	actualizarUsuario = (event) =>{
		event.preventDefault();
		console.log(this.state.nombre);
		this.enviarPut(this.state.nombre);
	}

	enviarPut = (nomb) =>{

		let datos = {
			method: 'PUT',
			body: JSON.stringify({nombre: nomb}),
			headers:{
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'X-Custom-Header': 'value'
			}
		}

		fetch("https://shielded-escarpment-86252.herokuapp.com/actualizarUsuario/" + this.props.id, datos)
			.then(resp => resp.json())
			.then(algo => this.actualizar(algo))
			.catch(err => console.log(err));
    }
    
    actualizar = (json) =>{
        console.log(json);
        if(json.respuesta){
            this.props.pedirUsuarios();
        }
    }

	render(){
		return(
			<form onSubmit={this.actualizarUsuario}>
				<label>Nuevo nombre:</label>
				<input type="text" value={this.state.nombre} onChange={this.onChange} placeholder="put"/>
				<input type="submit" value="Actualizar"/>
			</form>
		);
	}	
}

export default ActualizarUsuario;
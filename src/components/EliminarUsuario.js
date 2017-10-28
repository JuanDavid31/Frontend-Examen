import React, { Component } from 'react';

class EliminarUsuario extends Component{
	constructor(){
		super();
		this.state = {nombre:""};
	}

	onChange = (event)  =>{
		this.setState({nombre: event.target.value});
	}

	borrarUsuario = (event) =>{
		event.preventDefault();
		console.log(this.state.nombre);
		this.enviarDelete(this.state.nombre);
	}

	enviarDelete = (nomb) =>{

		let datos = {
			method: 'DELETE',
			body: JSON.stringify({nombre: nomb}),
			headers:{
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'X-Custom-Header': 'value'
			}
		}

		fetch("https://shielded-escarpment-86252.herokuapp.com/eliminarUsuario/" + this.props.id, datos)
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
			<form onSubmit={this.borrarUsuario}>
				<input type="submit" value="Borrar"/>
			</form>
		);
	}	
}

export default EliminarUsuario;
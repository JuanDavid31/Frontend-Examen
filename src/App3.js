import React, { Component } from 'react';

class App3 extends React.Component {
	constructor(){
		super();
		this.state = {
			usuarios:[]
		};
	}
  
	componentDidMount(){
		this.pedirUsuarios();
	}

	pedirUsuarios = () =>{
		fetch("https://shielded-escarpment-86252.herokuapp.com/usuarios.json")
		.then( resp => resp.json() )
		.then(json => this.setState({usuarios: json}))
		.catch((err) => console.log(err));
	}

	render() {
		var usuarios = [];

		usuarios = this.state.usuarios.map((u) => {
			return <Usuario key={u.cId} id={u.cId} nombre={u.dNombre} pedirUsuarios={this.pedirUsuarios} />
		});

		return (
    	<div>
            <AdicionarUsuario pedirUsuarios={this.pedirUsuarios}/>
            {usuarios}
        </div>
		);
	}
}

class AdicionarUsuario extends React.Component{
    constructor(){
        super();
        this.state = {nombre:""};
    }

    onChange = (event)  =>{
        this.setState({nombre: event.target.value});
    }

    adicionarUsuario = (event) =>{
        event.preventDefault();
        this.enviarPost(this.state.nombre);
    }

    enviarPost = (nomb) => {
        let datos = {
            method: 'POST',
            body: JSON.stringify({nombre: nomb}),
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://shielded-escarpment-86252.herokuapp.com/adicionarUsuario", datos)
            .then(this.actualizar)
            .catch(err => console.log(err));
    }

    actualizar = (resp) =>{
        if(resp.ok){
			this.props.pedirUsuarios();
		}else{
			resp.text().then(text => console.log(text));
		}
    }

    render(){
        return(
            <form onSubmit={this.adicionarUsuario}>
                <label>Nombre:</label>
                <input type="text" value={this.state.nombre} onChange={this.onChange} placeholder="Post"/>
                <input type="submit" value="Adicionar"/>
            </form>
        );
    }
}

class Usuario extends React.Component{

    render(){
        return(
            <div>
                <h3>{this.props.nombre}</h3>
                <ActualizarUsuario id={this.props.id} pedirUsuarios={this.pedirUsuarios}/>
                <EliminarUsuario id={this.props.id} pedirUsuarios={this.pedirUsuarios}/>
            </div>
        );
    }

    pedirUsuarios = () =>{
        this.props.pedirUsuarios();
    }
}

class ActualizarUsuario extends React.Component{
	constructor(){
		super();
		this.state = {nombre:""};
	}

	onChange = (event)  =>{
		this.setState({nombre: event.target.value});
	}

	actualizarUsuario = (event) =>{
		event.preventDefault();
		this.enviarPut(this.state.nombre);
	}

	enviarPut = (nomb) =>{
		let datos = {
			method: 'PUT',
			body: JSON.stringify({nombre: nomb}),
			headers:{
				'Accept': 'text/plain',
				'Content-Type': 'application/json',
			}
		}

		fetch("https://shielded-escarpment-86252.herokuapp.com/actualizarUsuario/" + this.props.id, datos)
        .then(this.actualizar)
        .catch(err => console.log(err));
    }
    
    actualizar = (resp) =>{
        if(resp.ok){
			this.props.pedirUsuarios();
		}else{
			resp.text().then(text => console.log(text));
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

class EliminarUsuario extends React.Component{
	constructor(){
		super();
		this.state = {nombre:""};
	}

	onChange = (event)  =>{
		this.setState({nombre: event.target.value});
	}

	borrarUsuario = (event) =>{
		event.preventDefault();
		this.enviarDelete(this.state.nombre);
	}

	enviarDelete = (nomb) =>{
        let datos = {
            method: 'DELETE',
            body: JSON.stringify({nombre: nomb}),
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
        }
    }

    fetch("https://shielded-escarpment-86252.herokuapp.com/eliminarUsuario/" + this.props.id, datos)
    .then(this.actualizar)
    .catch(err => console.log(err));
  }
    
  actualizar = (resp) =>{
        if(resp.ok){
            this.props.pedirUsuarios();
        }else{
            resp.text().then(text => console.log(text));
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

export default App3;
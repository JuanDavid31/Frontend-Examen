import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

constructor(){
	super();
	this.state = {usuarios:[]};
}

render() {

	var usuarios = this.state.usuarios.map(function(u){
		return <Usuario key={u.dNombre} nombre={u.dNombre} />
	});

	return (
	<div className="App">
		<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<h1 className="App-title">Welcome to React</h1>
		</header>
		<AdicionarUsuario />
		{usuarios}
	</div>
	);
}

	componentDidMount(){
		fetch("https://shielded-escarpment-86252.herokuapp.com/rutaSecreta")
		.then( resp => resp.json() )
		.then(json => this.setState({usuarios: json}))
		.catch((err) => console.log(err));
	}
}

class Usuario extends Component{

	render(){
		return(
			<div>
				<p>{this.props.nombre}</p>
			</div>
		);
	}
}

class AdicionarUsuario extends Component{

	constructor(){
		super();
		this.state = {nombre:""};
	}

	onChange = (event)  =>{
		this.setState({nombre: event.target.value});
	}

	adicionarUsuario = (event) =>{
		event.preventDefault();
		console.log(this.state.nombre);
		this.enviarPost(this.state.nombre);
	}

	enviarPost = (nomb) =>{

		let datos = {
			method: 'POST',
			body: JSON.stringify({nombre: nomb, str: 'Some string: &=&'}),
			headers:{
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}

		fetch("https://shielded-escarpment-86252.herokuapp.com/rutaSecreta2", datos)
			.then(resp => resp.json())
			.then(algo => console.log(algo))
			.catch(err => console.log("error:" + err));
	}

	render(){
		return(
			<form onSubmit={this.adicionarUsuario}>
				<label>Nombre:</label>
				<input type="text" value={this.state.nombre} onChange={this.onChange}/>
				<input type="submit" value="Agregar"/>
			</form>
		);
	}

}

export default App;

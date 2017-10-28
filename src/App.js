import React, { Component } from 'react';
import logo from './images/logo.svg';
import Usuario from './components/Usuario';
import AdicionarUsuario from './components/AdicionarUsuario';
import ComboUD from './components/ComboUD';
import SubirCancion from './components/SubirCancion';
import './stylesheets/App.css';

class App extends Component {

	constructor(){
		super();
		this.state = {
			usuarios:[], 
			hayUsuarios: false
		};
	}

	render() {

		var usuarios = [];

		usuarios = this.state.usuarios.map(function(u){
			return <Usuario key={u.cId} id={u.cId} nombre={u.dNombre} canciones={u.canciones}/>
		});

		return (
			<div className="App">
				<SubirCancion id={263}/>
				<AdicionarUsuario actualizar={this.pedirUsuarios}/>
				<ComboUD usuarios={usuarios} actualizar={this.pedirUsuarios}/>
				{usuarios}
			</div>
		);
	}

	componentDidMount(){
		this.pedirUsuarios();
	}

	pedirUsuarios = () =>{
		fetch("https://shielded-escarpment-86252.herokuapp.com/usuarios.json")
		.then( resp => resp.json() )
		.then(json => this.setState({usuarios: json, hayUsuarios:true}))
		.catch((err) => console.log(err));
	}
}


export default App;
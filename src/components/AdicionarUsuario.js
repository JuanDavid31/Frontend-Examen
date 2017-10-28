import React, { Component } from 'react';

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
        this.enviarPost(this.state.nombre);
    }

    enviarPost = (nomb) =>{

        let datos = {
            method: 'POST',
            body: JSON.stringify({nombre: nomb}),
            headers:{
                'Accept':'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://shielded-escarpment-86252.herokuapp.com/adicionarUsuario", datos)
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

export default AdicionarUsuario;
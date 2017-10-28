import React, {Component} from 'react';

class Producto extends Component{

    render(){
        return(
            <div>
                <label>Nombre</label>
                <label>{this.props.nombre}</label>
                <label>Precio</label>
                <label>{this.props.precio}</label>
                <label>Fecha</label>
                <label>{this.props.fecha}</label>
                <img src={this.props.urlImagen} alt="Comida!"></img>
                <input type="button" value="Eliminar" onClick={this.eliminar}></input>
                <ul>
                    {this.darIngredientes()}
                </ul>
            </div>
        );
    }

    eliminar = (e) =>{
        e.preventDefault();
        this.enviarDelete();
    }

    enviarDelete = () =>{
        let datos = {
            method: 'DELETE',
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://stark-river-37912.herokuapp.com/eliminarProducto/" + this.props.id, datos)
        .then(this.atenderRespuesta)
        .catch(err => console.log(err));
    }

    atenderRespuesta = (resp) =>{
        if(resp.ok){
            this.props.actualizar();
        }else{
            resp.text().then(text => console.log(text));
        }
    }

    darIngredientes = () =>{
        var ingredientes = this.props.ingredientes.split(", ").map( ingrediente =>{
            return <li key={ingrediente}>{ingrediente}</li>
        });
        return ingredientes;
    }
    
}

export default Producto;
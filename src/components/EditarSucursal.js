import React, {Component} from 'react';

class EditarSucursal extends Component{

    constructor(){
        super();
        this.state = {
            nombre:"", 
            direccion:""
        };
    }

    render(){
        return(
            <form onSubmit={this.editarSucursal}>
                <input type="text" placeholder="Nuevo nombre" value={this.state.nombre} onChange={this.cambiarNombre}></input>
                <input type="text" placeholder="Nueva direccion" value={this.state.direccion} onChange={this.cambiarDireccion}></input>
                <input type="submit" className="btn teal darken-4" value="Guardar"></input>
            </form>
        );
    }

    componentDidMount(){
        this.hacerPeticion();
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.hacerPeticion();
        }
    }

    hacerPeticion = () =>{
        fetch("https://stark-river-37912.herokuapp.com/sucursales.json/" + this.props.match.params.id)
        .then(resp => resp.json())
        .then(json => this.setState({nombre:json.dNombre, direccion:json.aDireccion}));
    }

    cambiarNombre = (e) =>{
        e.preventDefault();
        this.setState({nombre: e.target.value});
    }

    cambiarDireccion = (e) =>{
        e.preventDefault();
        this.setState({direccion: e.target.value});
    }

    editarSucursal = (e) =>{
        e.preventDefault();
        this.enviarPut();
    }

    enviarPut = () => {
        let datos = {
            method: 'PUT',
            body: JSON.stringify({
                nombre: this.state.nombre,
                direccion: this.state.direccion
            }),
            headers:{
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }

        fetch("https://stark-river-37912.herokuapp.com/actualizarSucursal/" + this.props.match.params.id, datos)
            .then(this.atenderRespuesta)
            .catch(err => console.log(err));
    }

    atenderRespuesta = (resp) =>{
        if(resp.ok){
			this.props.history.push("/");
		}else{
			resp.text().then(text => console.log(text));
		}
    }
}

export default EditarSucursal;
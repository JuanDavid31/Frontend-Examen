import React, {Component} from 'react';
import AdicionarProducto from './AdicionarProducto';
import Producto from './Producto';

class Menu extends Component{

    constructor(props){ 
        super(props);
        this.state = {
            productos:[]
        };
    }

    render(){//Un cargando... y no existen los productos
        return(
            <div id="menu">
                <AdicionarProducto idSucursal={this.props.match.params.id} actualizar={this.actualizar}/>
                {this.darProductos()}
            </div>
        );
    }

    componentDidMount(){
        this.actualizar();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.actualizar();
        }
    }

    actualizar = () =>{
        fetch("https://stark-river-37912.herokuapp.com/productos.json/" + this.props.match.params.id)
        .then(resp => resp.json())
        .then(json => this.setState({productos:json}))
        .catch(err => console.log(err))
    }

    darProductos = () =>{
        var productos = this.state.productos.map(producto =>{
            return <Producto key={producto.cId} 
                            id={producto.cId}
                            nombre={producto.dNombre}
                            precio={producto.nPrecio}
                            fecha={producto.fLimite}
                            urlImagen={producto.dUrlFoto}
                            ingredientes={producto.aIngredientes}
                            actualizar={this.actualizar}/>
        })
        return <div>{productos}</div>;
    }
}

export default Menu;
import React, { Component } from 'react';
import $ from 'jquery';

class SubirCancion extends Component{
    
    subirCancion = (event) =>{

        event.preventDefault()

        var data = new FormData();
        var datosArchivo = document.querySelector('input[type="file"]').files[0];
        data.append("data", datosArchivo);

        $(window).on('beforeunload', function() {
          return 'Mensaje11111';
        });console.log("Empezo la subida");
    
        fetch("https://shielded-escarpment-86252.herokuapp.com/adicionarCancionAjax/" + this.props.id, {
            method: "POST",
            body: data
        }).then(this.revisar)
        .catch(err => console.log(err));
        
    }

    revisar = (resp) =>{
        $(window).unbind('beforeunload');
        if(resp.ok){
            console.log("cancion subida");
        }else{
            console.log("No sé, un error");
        }
    }

    render(){
        return(
            <div>
                <form encType="multipart/form-data">
                    <input type="file" name="cancion"/>
                    <p>
                    <input type="submit" onClick={this.subirCancion} value="Subir cancion"/>
                    </p>
                </form>
            </div>
        );
    }
}

export default SubirCancion;
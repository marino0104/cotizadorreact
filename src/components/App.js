import React, {Component} from 'react';
import Header from './header';
import Formulario from './Formulario';
import Resultado from './Resultado';
import Resumen from './Resumen';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';




class App extends Component  {
 state={
   resultado:'',
   datos:{}
 }
  cotizarSeguro=(datos)=>{
    const {marca, plan, year}=datos;

    // agregar una base de 2000
    let resultado=2000;

    // obtener diferencia de años y por cad año restar 3% al valor del seguro
    const diferencia=obtenerDiferenciaAnio(year);

    resultado-=((diferencia*3)*resultado)/100;
    
    //americano 15% asiatico 5% y europeo 30% de incremento al valor actusl

    resultado=calcularMarca(marca)*resultado
    

    // el plan del AudioTrack, el básico incrementa el valor 20% y cobertura completa 50%
    let incrementoPlan=obtenerPlan(plan)
    
    // dependiendo del plan incrementar
    resultado= parseFloat(incrementoPlan*resultado).toFixed(2);

    // crear objeto para el resumen
    const datosAuto={
      marca: marca,
      plan: plan,
      year: year
    }

    this.setState({
      resultado:resultado,
      datos:datosAuto
    })
  }
  render(){
    return (
      <div className="contenedor">
        <Header titulo="Cotizador de Seguros de Auto"/>
        
        <div className="contenedor-formulario">
        
          <Formulario
            cotizarSeguro={this.cotizarSeguro}
          />
          <Resumen
            datos={this.state.datos}
            resultado={this.state.resultado}
          />
          <Resultado
                resultado={this.state.resultado}
              />
        </div>
      </div>
    );
  }
  
}

export default App;

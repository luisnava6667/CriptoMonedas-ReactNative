/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, ActivityIndicator} from 'react-native';
import Formulario from './components/Formulario';
import Hearder from './components/Hearder';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptoMoneda, setCriptoMoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    //consultar la api para obtener la cotizacion
    const cotizarCriptoMoneda = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        setCargando(true);
        //Ocultar el spinner y muestra el resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptoMoneda();
  }, [consultarAPI]);
  //mostrar el spinner o el resultado
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );
  return (
    <>
      <Hearder />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptoMoneda={criptoMoneda}
          setMoneda={setMoneda}
          setCriptoMoneda={setCriptoMoneda}
          setConsultarAPI={setConsultarAPI}
        />
      </View>
      <View style={{marginTop: 40}}>{componente}</View>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;

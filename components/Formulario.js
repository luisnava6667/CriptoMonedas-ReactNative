/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
const Formulario = ({
  moneda,
  setMoneda,
  criptoMoneda,
  setCriptoMoneda,
  setConsultarAPI,
}) => {
  const [criptoMonedas, setCriptoMonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptoMonedas(resultado.data.Data);
      // console.log(resultado.data.Data);
    };
    consultarAPI();
  }, []);
  const obtenerMoneda = mon => {
    setMoneda(mon);
  };
  //almacena la seleccion del usuario
  const obtnenerCriptomoneda = cripto => {
    setCriptoMoneda(cripto);
  };
  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptoMoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    //cambiar el state de consultar api
    setConsultarAPI(true);
  };
  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        onValueChange={mone => obtenerMoneda(mone)}
        selectedValue={moneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Dolar Estados Unidos" value="USD" />
        <Picker.Item label="Peso Argentino" value="ARS" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        onValueChange={mone => obtnenerCriptomoneda(mone)}
        itemStyle={{height: 120}}
        selectedValue={criptoMoneda}>
        <Picker.Item label="--Seleccione--" value="" />
        {criptoMonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;

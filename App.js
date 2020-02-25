/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';

import RNPrint from 'react-native-print';

class App extends React.Component {
  state = {
    selectedPrinter: null,
    request: null,
  };

  //ESTE METODO SI ME FUNCIONO
  sendRequestFormData = () => {
    let data = new FormData();
    data.append('car_number', 'data');
    data.append('licence_plate', 'licence_plate');
    data.append('driverName', 'driverName');
    data.append('km', 'km');
    data.append('cost', 'cost');
    data.append('fch', 'fch');
    data.append('hra', 'hra');
    data.append('dispatcher', 'dispatcher');
    data.append('station', 'station');

    fetch('http://189.194.249.170:83/atsem/url/ticket/guardaTicket.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: data,
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => {
        console.log(error);
        this.setState({request: 'ocurrio un error al realizarla peticion'});
      });
  };
  //ESTE METODO NO FUNCIONA, ASI ES COMO LO HABIA ECHO SIEMPRE
  sendRequest = () => {
    fetch('http://189.194.249.170:83/atsem/url/ticket/guardaTicket.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        car_number: 'data',
        licence_plate: 'licence_plate',
        driverName: 'driverName',
        driverName: 'driverName',
        cost: 'cost',
        fch: 'fch',
        hra: 'hra',
        station: 'station',
      }),
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => {
        console.log(error);
        this.setState({request: 'ocurrio un error al realizarla peticion'});
      });
  };

  printHTML = async () => {
    await RNPrint.print({
      html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
    });
  };

  customOptions = () => {
    return (
      <View>
        {this.state.selectedPrinter && (
          <View>
            <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
          </View>
        )}
        <Button onPress={this.selectPrinter} title="Select Printer" />
        <Button onPress={this.silentPrint} title="Silent Print" />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && this.customOptions()}
        <Button onPress={this.printHTML} title="Print HTML" />
        <Button onPress={this.sendRequest} title="Send request" />
        <Text>{this.state.request}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;

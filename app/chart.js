'use strict'
import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  View,
  StyleSheet
} from 'react-native'
import { StockLine } from 'react-native-pathjs-charts'
import moment from 'moment'
import * as LocalStorage from './storage';

//Set different sizes of chart depending on phone screen size
const {height, width} = Dimensions.get('window');

export default class Charts extends Component {

  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this);
    this.getData = this.getData.bind(this);
    LocalStorage.Storage.subscribe(this.updateState);
    this.state = { loading: true };
  }

  updateState() {
    this.setState(() => {
      loading: !this.state.loading;
    });
  }
  
  getData = () => {
    let dataSet = LocalStorage.Storage.get('fitnessData');
    if (dataSet != undefined && dataSet[this.props.dataSetName] != undefined){
      return dataSet[this.props.dataSetName];
    }
    return;
  }

  options = {
    width: width - 65,
    height: height / 2.5,
    color: '#058bc4',
    strokeWidth: '1.5',
    margin: {
      top: 30,
      left: 50,
      bottom: 30,
      right: 30
    },

    animate: {
      type: 'delayed',
      duration: 200
    },
    axisX: {
      showAxis: false,
      showLines: false,
      showLabels: true,
      showTicks: false,
      zeroAxis: false,
      orient: 'bottom',
      tickValues:[],
      labelFunction: ((timestamp) => {
        return moment(timestamp).format('DD/MM');
      }),
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: false,
        fill: '#C0C0C0',
      }
    },
    axisY: {
      showAxis: false,
      showLines: true,
      showLabels: true,
      showTicks: false,
      zeroAxis: true,
      orient: 'left',
      labelFunction: this.props.axisYLabelFunc || undefined,
      tickValues: [
      ],
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: false,
        fill: '#C0C0C0',
      }
    }
  }

  render() {
    let dataSet = this.getData();
    if (dataSet != undefined) {
      return (
        <View style={styles.container}>
          <StockLine data={[dataSet]} options={this.options} xKey='date' yKey='value' />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            style={[styles.centering, styles.gray, { height: 250 }]}
            size="large"
          />
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
import React, { Component } from 'react';
import { Platform } from 'react-native';

import GoogleFitService from './googleFitService'
import AppleHealthKit from './healthKitService'

import * as CONST from './const';
import * as LocalStorage from './storage';
import SelfAnalytics from './analytics';

//Middleware class between application and Google Fit / Health Kit services
class DataProvider {
  constructor() {
    this.getFitnessDataForFiveDays = this.getFitnessDataForFiveDays.bind(this);
    this.getFitnessDataForOneDay = this.getFitnessDataForOneDay.bind(this);
  }

  getFitnessDataForFiveDays(callback) {
    const analytics = new SelfAnalytics();
    try {
      if (LocalStorage.Storage.get('fitnessData') == undefined) {
        if (Platform.OS === CONST.PLATFORM_IOS) {
          AppleHealthKit.isAvailable((err, available) => {
            if (available) {
              AppleHealthKit.initHealthKit((err, res) => {
                if (err) {
                  console.log(err);
                  return;
                }
                AppleHealthKit.fetchDataForFiveDays((data) => {
                  LocalStorage.Storage.set('fitnessData', data);
                  console.log('Health Kit statistic: ', data);
                  analytics.track('retrieve_data_result', { 'API': CONST.HEALTH_KIT, 'Result': JSON.stringify(data) });
                  callback(data);
                })
              })
            }
          })
          
        } else
          if (Platform.OS === CONST.PLATFORM_ANDROID) {
            GoogleFitService.onAuthorize((res) => {
              console.log(res);
            });
            GoogleFitService.authorize();

            GoogleFitService.getFiveDaysData(function (d) {
              LocalStorage.Storage.set('fitnessData', d);
              console.log('Google Fit statistic: ', d);
              analytics.track('retrieve_data_result', { 'API': CONST.GOOGLE_FIT, 'Result': JSON.stringify(d) });
              callback(d);
            });
          }
      }
      else {
        let existingData = LocalStorage.Storage.get('fitnessData');
        console.log('Google Fit statistic from globalStore: ', existingData);
        callback(existingData);
      }
    } catch (e) {
      console.log(e);
      analytics.track('retrieve_data_result', { 'API': Platform.OS === CONST.PLATFORM_ANDROID ? CONST.GOOGLE_FIT : CONST.HEALTH_KIT, 'Error message': JSON.stringify(e) });
      callback(undefined);
    }
  }

  getFitnessDataForOneDay() {
    if (LocalStorage.Storage.get('fitnessData') != undefined) {
      let allData = LocalStorage.Storage.get('fitnessData');
      let currDayData = {};
      currDayData.calories = allData['calories'][allData['calories'].length - 1].value;
      currDayData.steps = allData['steps'][allData['steps'].length - 1].value;
      currDayData.distance = allData['distance'][allData['distance'].length - 1].value;
      currDayData.activetime = allData['activetime'][allData['activetime'].length - 1].value;
      return currDayData;
    }
    else {
      return;
    }
  }
}

export default new DataProvider();
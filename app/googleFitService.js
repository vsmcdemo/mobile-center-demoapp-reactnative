'use strict'

import GoogleFit from 'react-native-google-fit'

class GoogleFitService {
    constructor() {
        this.currentDateString = this.currentDateString.bind(this);
        this.currentFiveDaysRangeObj = this.currentFiveDaysRangeObj.bind(this);
        this.currentOneDayRangeObj = this.currentOneDayRangeObj.bind(this);
        this.getAggregatedStepsByDays = this.getAggregatedStepsByDays.bind(this);
        this.getAggregatedCaloriesByDays = this.getAggregatedCaloriesByDays.bind(this);
        this.getAggregatedDistanceByDays = this.getAggregatedDistanceByDays.bind(this);
        this.getAggregatedActiveTimeByDays = this.getAggregatedActiveTimeByDays.bind(this);
        this.getOneDayData = this.getOneDayData.bind(this);
    }

    currentDateString(days, hours, minutes) {
        let currDate = new Date();
        let dateString = new Date(currDate.getFullYear(), currDate.getMonth(), days, hours, minutes, 0, 0);
        return dateString.toISOString();
    }

    currentFiveDaysRangeObj() {
        const hoursStart = 0, minutesStart = 0, hoursFinish = 23, minutesFinish = 59;
        let finish = this.currentDateString((new Date()).getDate(), hoursFinish, minutesFinish);
        let start = new Date(finish);
        start.setDate(start.getDate() - 4);
        start.setHours(hoursStart);
        start.setMinutes(minutesStart);
        let options = {
            startDate: start.toISOString(),
            endDate: finish
        }
        return options;
    }

    currentOneDayRangeObj() {
        const hoursStart = 0, minutesStart = 0, hoursFinish = 23, minutesFinish = 59;
        let finish = this.currentDateString((new Date()).getDate(), hoursFinish, minutesFinish);
        let start = new Date(finish);
        start.setHours(hoursStart);
        start.setMinutes(minutesStart);
        let options = {
            startDate: start.toISOString(),
            endDate: finish
        }
        return options;
    }

    getAggregatedStepsByDays(timeRange) {
        return new Promise(function(resolve, reject) {
            GoogleFit.getAggregatedStepsByDays(timeRange, function(msg, data) {
                if (data == false) {
                    return reject(msg);
                }
                return resolve(data);
            });
        });
    }

    getAggregatedCaloriesByDays(timeRange) {
        return new Promise(function(resolve, reject) {
            GoogleFit.getAggregatedCaloriesByDays(timeRange, function(msg, data) {
                if (data == false) {
                    return reject(msg);
                }
                return resolve(data);
            });
        });
    }

    getAggregatedDistanceByDays(timeRange) {
        return new Promise(function(resolve, reject) {
            GoogleFit.getAggregatedDistanceByDays(timeRange, function(msg, data) {
                if (data == false) {
                    return reject(msg);
                }
                return resolve(data);
            });
        });
    }

    getAggregatedActiveTimeByDays(timeRange) {
        return new Promise(function(resolve, reject) {
            GoogleFit.getAggregatedActiveTimeByDays(timeRange, function(msg, data) {
                if (data == false) {
                    return reject(msg);
                }
                return resolve(data);
            });
        });
    }

    getFiveDaysData(callback) {
        let data = {};
        let timeRange = this.currentFiveDaysRangeObj();
        Promise.all([this.getAggregatedStepsByDays(timeRange), this.getAggregatedCaloriesByDays(timeRange), this.getAggregatedDistanceByDays(timeRange), this.getAggregatedActiveTimeByDays(timeRange)])
            .then(function(allData) {
                data.steps = allData[0] || [];
                data.calories = allData[1] || [];
                data.distance = allData[2] || [];
                data.activetime = allData[3] || [];
                callback(data);
            });
    }

    getOneDayData(callback) {
        let data = {};
        let timeRange = this.currentOneDayRangeObj();
        Promise.all([this.getAggregatedStepsByDays(timeRange), this.getAggregatedCaloriesByDays(timeRange), this.getAggregatedDistanceByDays(timeRange), this.getAggregatedActiveTimeByDays(timeRange)])
            .then(function(allData) {
                data.steps = allData[0][0].value || 0;
                data.calories = allData[1][0].value || 0;
                data.distance = allData[2][0].value || 0;
                data.activetime = allData[3][0].value || 0;
                callback(data);
            });
    }
    
    authorize() {
        GoogleFit.authorizeFit();
    }

    onAuthorize(action) {
        GoogleFit.onAuthorize((result) => {
            if (action) {
                action(result);
            }
        });
    }
};

export default new GoogleFitService();
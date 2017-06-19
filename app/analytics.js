import React, { Component } from 'react';
import Analytics from "mobile-center-analytics";

export class SelfAnalytics extends Component {
    constructor(props) {
        super(props);
    }

//Describing application events, which will be sent to Mobile Center
    eventConfigs = {
        'fb_login': {
            message: "Facebook login button clicked",
            defaultProps: { "Page": "Login", "Category": "Clicks" },
            getProps(prop) {
                return this.defaultProps;
            },
        },
        'tw_login': {
            message: "Twitter login button clicked",
            defaultProps: { "Page": "Login", "Category": "Clicks" },
            getProps(prop) {
                return this.defaultProps;
            },
        },
        'login_api_request_result': {
            message: "Trying to login in Facebook/Twitter.",
            defaultProps: { "Page": "Login", "Category": "Request", "API": "Social network" },
            getProps(prop) {
                let resProps = this.defaultProps;
                if (prop["Social network"] !== undefined) {
                    resProps["Social network"] = prop["Social network"];
                }
                if (prop["Result"] !== undefined) {
                    resProps["Result"] = prop["Result"];
                } 
                if (prop["Error message"] !== undefined) {
                    resProps["Error message"] = prop["Error message"];
                } 
                return resProps;
            },
        },
        'retrieve_data_result': {
            message: "Trying to retrieve data from HealthKit/Google Fit API.",
            defaultProps: {"Category": "Request"},
            getProps(prop) {
                let resProps = this.defaultProps;
                if (prop["Page"] !== undefined) {
                    resProps["Page"] = prop["Page"];
                }
                if (prop["API"] !== undefined) {
                    resProps["API"] = prop["API"];
                }
                if (prop["Result"] !== undefined) {
                    resProps["Result"] = prop["Result"];
                } 
                if (prop["Error message"] !== undefined) {
                    resProps["Error message"] = prop["Error message"];
                } 
                return resProps;
            },
        },
        'view_stats': {
            message: "View statistics button clicked",
            defaultProps: { "Page": "Main", "Category": "Clicks" },
            getProps(prop) {
                return this.defaultProps;
            },
        },
        'crash_app': {
            message: "Crash application button clicked",
            defaultProps: { "Page": "Profile", "Category": "Clicks" },
            getProps(prop) {
                return this.defaultProps;
            },
        },

    }

    track(key, prop, callback){
        config = this.eventConfigs[key];
        if (config === undefined) {
            console.log('Unexpected key!');
            return;
        }
        
        let properties = config.getProps.call(config, prop);
        Analytics.trackEvent(config.message, properties)
        .then((info) => {
            console.log('Analytics sent');
            console.log(info);
            if (callback && typeof callback === "function") {
                callback();
            }
        })
        .catch((err)=>{
            console.log('Analytics sending error');
            console.log(err);
        });
    }
}

export default SelfAnalytics;
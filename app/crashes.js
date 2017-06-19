import React, { Component } from 'react';
import Crashes from "mobile-center-crashes";
import SelfAnalytics from './analytics';

//Gerenate and send Mobile center crash event
export class SelfCrashes extends Component {
    constructor(props) {
        super(props);
    }
    
    crash(){
        const analytics = new SelfAnalytics();
        analytics.track('crash_app', "", function() {
            Crashes.generateTestCrash();
        }); 
    }
}

export default SelfCrashes;
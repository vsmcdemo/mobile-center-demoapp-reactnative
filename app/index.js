import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AppState,
  Alert
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import AuthorizationComponent from './auth';
import * as CONST from './const';
import DataProvider from './dataProvider';
import * as LocalStorage from './storage';
import Chart from './chart'
import RoundedButton from './roundedButton';
import SelfAnalytics from './analytics';
import SelfCrashes from './crashes';
import moment from 'moment'
import FontSizes from './fonts'

//Home screen class with present day statistic from Goolge Fit or Health Kit service
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this);
    LocalStorage.Storage.subscribe(this.updateState);
    this.state = { loading: true };
    // DataProvider.getFitnessDataForFiveDays();
  }

  updateState() {
    this.setState(() => {
      loading: !this.state.loading;
    });
  }

  render() {
    let name = LocalStorage.Storage.get('user').name;
    let photo = LocalStorage.Storage.get('user').photoUrl;
    let dataSet = DataProvider.getFitnessDataForOneDay();
    let steps = 9999;
    let calories = 999;
    let distance = 9.9;
    let activetimeHours = 5;
    let activetimeMins = 55;
    if(dataSet !== undefined){
        steps = dataSet.steps;
        calories = dataSet.calories;
        distance = dataSet.distance / CONST.METERS_IN_KM;
        
        let x = dataSet.activetime;//ms
        x = parseInt(x / CONST.MS_IN_SECOND);//seconds
        x = parseInt(x / CONST.SECONDS_IN_MINUTE);//minutes
        let fullHours = parseInt(x / CONST.MINUTES_IN_HOUR);
        let fullMinutes = x % CONST.MINUTES_IN_HOUR;

        activetimeHours = fullHours
        activetimeMins = fullMinutes;
    }

    return (
      <View style={styles.home}>
        <Image 
          source={require('../images/home_background.png')}
          style={styles.home_background}/>
        <Image 
          source={require('../images/vsmc.png')}
          style={styles.home_vsmc_logo}/>
        <View style={styles.photo}>
            {/*<Image borderRadius={100} style={styles.photo} source={require('../images/photo.png')}/>*/}
          <Image borderRadius={50} style={styles.photo_img} source={{uri: LocalStorage.Storage.get('user').photoUrl}}/>
        </View>
        <Text>{"\n"}HI, {LocalStorage.Storage.get('user').name}</Text>
        <Text> </Text>
        <Text>TODAY'S STEPS:</Text>
        <Text style={{
          color: 'dodgerblue',
          fontSize: FontSizes.FONT_TODAY_STEPS_LABEL,
          fontWeight: 'bold'
        }}>
          {steps.toFixed()}
        </Text>
        <View style={styles.home_current_day_stat}>
          <View style={styles.home_description_cell}>
            <View><Image style={styles.home_description_cell_img} source={require('../images/cal.png')}/></View>
            <View><Text>CALORIES</Text></View>
            <View>
              <Text style={{
                color: 'orange',
                fontSize: FontSizes.FONT_TODAY_LOWER_LABELS,
              }}>
                {calories.toFixed()}
                <Text style={{   
                  fontSize: 16,
                  color: 'gray',
                }}> Kcal</Text>
              </Text>
            </View>
          </View>
          <Text>|</Text>
          <View style={styles.home_description_cell}>
            <View><Image style={styles.home_description_cell_img} source={require('../images/distance.png')}/></View>
            <View><Text>DISTANCE</Text></View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              }}>
              <Text style={{
                color: 'rebeccapurple',
                fontSize: FontSizes.FONT_TODAY_LOWER_LABELS,
                textAlignVertical: 'bottom'
              }}>
                {distance.toFixed(2)}
                <Text style={{   
                  fontSize: 16,
                  color: 'gray',
                }}> Km</Text></Text>
            </View>
          </View>
          <Text>|</Text>
          <View style={styles.home_description_cell}>
            <View><Image style={styles.home_description_cell_img} source={require('../images/time.png')}/></View>
            <View><Text>ACTIVE TIME</Text></View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              }}>
              <Text style={{
                color: 'limegreen',
                fontSize: FontSizes.FONT_TODAY_LOWER_LABELS,
              }}>
              {activetimeHours.toFixed()}
              <Text style={{fontSize: 16, color: 'gray'}}>
                h
              </Text>
              {activetimeMins.toFixed()}
              <Text style={{fontSize: 16, color: 'gray'}}>
                m
              </Text>
              </Text>
            </View>
          </View>
        </View>
        <HomeButtons activeBtn="home" navigation={this.props.navigation}/>
      </View>
    );
  }
}

//Crash screen, if something went wrong on receiving data from Goolge Fit or Health Kit service
class CrashScreen extends React.Component {
  static navigationOptions = {
    title: 'Crash',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.error_container}>
          <Image style={styles.error_logo} source={require('../images/error_image.png')}/>
          <Text style={{
            color: 'lightgrey',
            fontSize: 25,
            textAlign: 'center'
          }}>
            ERROR{"\n"}{"\n"}SORRY SOMETHING{"\n"}WENT WRONG!
          </Text>
        </View>
        <HomeButtons navigation={this.props.navigation}/>
      </View>
    )
  }
}

//Start screen with login buttons
class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      spinnerStatus: false
    }

    LocalStorage.Storage.subscribe(() => {
      this.setState({spinnerStatus: (LocalStorage.Storage.get(CONST.AUTH_IN_PROGRESS) || LocalStorage.Storage.get(CONST.GETTING_FIT_DATA_IN_PROGRESS)) });
    });
    this.onAppStateChange = this.onAppStateChange.bind(this);
  }

  static navigationOptions = {
    title: 'Login',
  }

  //if user presses back and do not authorize; to prevent spinner block Login screen
  onAppStateChange = (appState) => {
    if (appState == CONST.ACTIVE_APP_STATE) {
      setTimeout(function() {
        LocalStorage.Storage.set(CONST.AUTH_IN_PROGRESS, false);
      }, 2000)
    }
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this.onAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChange);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Image style={styles.login_container} source={require('../images/login_background.png')}>
          <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
          <Image 
            source={require('../images/vsmc.png')}
            style={styles.vsmc_logo}/>
          <Text>{"\n"}{"\n"}{"\n"}</Text>
          <Image 
            source={require('../images/login_logo.png')}
            style={styles.login_logo}/>
          <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
          <AuthorizationComponent  redirect={this.props.navigation.navigate}/>
          </Image>
        </View>

        {this.state.spinnerStatus ? 
        <View style={[styles.spinner]}>
          <ActivityIndicator
            animating={true}
            size="large"
            color="white"
          />
        </View>
        : null}
      </View>
    );
  }
}

//Second ligin screen. User redirects here after errors on authorize with facebook or twitter
class Login2Screen extends React.Component {
  static navigationOptions = {
    title: 'Login2 ',
  }

  render() {
    return (
      <Image style={styles.login_container} source={require('../images/login_background.png')}>
        <Text>{"\n"}{"\n"}{"\n"}</Text>
        <Image  style={styles.error_logo} source={require('../images/error_image.png')}/>
         <Text style={{
          color: 'lightgrey',
          fontSize: 25,
          textAlign: 'center'
        }}>
          ERROR{"\n"}{"\n"}SORRY SOMETHING{"\n"}WENT WRONG!
        </Text>
        <AuthorizationComponent redirect={this.props.navigation.navigate}/>
      </Image>
    );
  }
}

//Statistic screen
class StepsScreen extends React.Component {
  static navigationOptions = {
    title: 'Steps ',
  };

  render() {
    return (
     <View style={styles.container}>
        <Text style={{marginTop: 20}}>DAILY STATISTICS</Text>
        <Chart dataSetName={'steps'} axisYLabelFunc={(value)=>{ return value.toFixed()}} />
        <StatisticButtons activeBtn="steps" navigation={this.props.navigation}/>
        <View style={styles.stats_controls_space}>
          <RoundedButton 
            onPress={() => {
              (new SelfCrashes).crash();
              Alert.alert('Crash was generated and sent to Mobile Center analytics service');
            }}
            title='SEND CRASH EVENT'
            backgroundColor="red"
            style={styles.crash_btn}
          />
        </View>
        <HomeButtons activeBtn="stat" navigation={this.props.navigation}/>
      </View>
    );
  }
}

//Statistic screen
class CalScreen extends React.Component {
  static navigationOptions = {
    title: 'Calories ',
  };

  render() {
    return (
     <View style={styles.container}>
        <Text style={{marginTop: 20}}>DAILY STATISTICS</Text>
        <Chart dataSetName={'calories'} axisYLabelFunc={(value)=>{ return value.toFixed()}}/>
        <StatisticButtons activeBtn="calories" navigation={this.props.navigation}/>
        <View style={styles.stats_controls_space}>
          <RoundedButton
            onPress={() => {
              (new SelfCrashes).crash();
              Alert.alert('Crash was generated and sent to Mobile Center analytics service');
            }}
            title='SEND CRASH EVENT'
            backgroundColor="red"
            style={styles.crash_btn}
          />
         </View>
        <HomeButtons activeBtn="stat" navigation={this.props.navigation}/>
      </View>
    );
  }
}

//Statistic screen
class DistanceScreen extends React.Component {
  static navigationOptions = {
    title: 'Distance ',
  };

  render() {
    return (
     <View style={styles.container}>
        <Text style={{marginTop: 20}}>DAILY STATISTICS</Text>
        <Chart dataSetName={'distance'} axisYLabelFunc={(value)=>{ return value.toFixed()}} />
        <StatisticButtons activeBtn="distance" navigation={this.props.navigation}/>
        <View style={styles.stats_controls_space}>   
          <RoundedButton 
            onPress={() => {
              (new SelfCrashes).crash();
              Alert.alert('Crash was generated and sent to Mobile Center analytics service');
            }}
            title='SEND CRASH EVENT'
            backgroundColor="red"
            style={styles.crash_btn}
          />
        </View>
        <HomeButtons activeBtn="stat" navigation={this.props.navigation}/>
      </View>
    );
  }
}

//Statistic screen
class TimeScreen extends React.Component {
  static navigationOptions = {
    title: 'Time ',
  };
  
  render() {
    return (
     <View style={styles.container}>
        <Text style={{marginTop: 20}}>DAILY STATISTICS</Text>
        <Chart dataSetName={'activetime'} axisYLabelFunc={(milliseconds)=>{ return (milliseconds/CONST.MS_IN_SECOND/CONST.SECONDS_IN_MINUTE).toFixed()}}/>
        <StatisticButtons activeBtn="time" navigation={this.props.navigation}/>
        <View style={styles.stats_controls_space}>
          <RoundedButton
            onPress={() => {
              (new SelfCrashes).crash();
              Alert.alert('Crash was generated and sent to Mobile Center analytics service');
            }}
            title='SEND CRASH EVENT'
            backgroundColor="red"
            style={styles.crash_btn}
          />
        </View>
        <HomeButtons activeBtn="stat" navigation={this.props.navigation}/>
      </View>
    );
  }
}

//Navigation buttons between statistic screens
class StatisticButtons extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <View style={styles.home_description}>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Steps')}>
            <View style={[styles.stat_cell_img_container, this.props.activeBtn == "steps" ? styles.active_btn : null ]}>
              <Image style={styles.stat_cell_img} source={require('../images/stats_steps.png')}/>
              <Text>Steps</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Calories')}>
            <View style={[styles.stat_cell_img_container, this.props.activeBtn == "calories" ? styles.active_btn : null ]}>
              <Image style={styles.stat_cell_img} source={require('../images/stats_calories.png')}/>
              <Text>Calories</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Distance')}>
            <View style={[styles.stat_cell_img_container, this.props.activeBtn == "distance" ? styles.active_btn : null ]}>
              <Image style={styles.stat_cell_img} source={require('../images/stats_distance.png')}/>
              <Text>Distance</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.home_description_cell}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Time')}>
            <View style={[styles.stat_cell_img_container, this.props.activeBtn == "time" ? styles.active_btn : null ]}> 
              <Image style={styles.stat_cell_img} source={require('../images/stats_time.png')}/>
              <Text>Time</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>  
    );
  }
}

//Navigation buttons between home and statistic screen
class HomeButtons extends React.Component {
  onStatPress() {
    const analytics = new SelfAnalytics();
    analytics.track('view_stats');
    this.props.navigation.navigate('Steps');
  }
  
  render() {
    return (
    <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 50
        }}>  
      <View style={styles.home_buttons}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
          <View style={[styles.home_description_cell, (this.props.activeBtn == "home") ? styles.active_home_btn : null]}>
            <View style={styles.home_btns_cell}>
              <Image style={styles.home_buttons_img} source={require('../images/main_home.png')}/>
              <Text>HOME</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.onStatPress()}>
          <View style={[styles.home_description_cell, (this.props.activeBtn == "stat") ? styles.active_home_btn : null]}>    
            <View style={styles.home_btns_cell}>
              <Image style={styles.home_buttons_img} source={require('../images/main_stats.png')}/>
              <Text>STATISTICS</Text>
            </View>       
          </View>
        </TouchableWithoutFeedback>
      </View>  
    </View>
    );
  }
}

//Main application component with react navigation router
export const MobileCenterRouter = TabNavigator({
    Login2: { screen: Login2Screen },
    Login: { screen: LoginScreen },
    Home: { screen:  HomeScreen },
    Steps: { screen:  StepsScreen },
    Calories: { screen: CalScreen },
    Distance: { screen: DistanceScreen },
    Time: { screen: TimeScreen },
    Crash: { screen: CrashScreen },
  },
  {
    navigationOptions: {
      tabBarVisible: false
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'Login',
    headerMode : 'none',
    animationEnabled: true,
    lazy: true,
    swipeEnabled: false,
    backBehavior: 'none'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  vsmc_logo: {
    height: 30,
    resizeMode: 'contain'
  },
  home_vsmc_logo: {
    marginTop: 40,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute'
  },
  login_logo: {
    height: 100,
    resizeMode: 'contain'
  },
  home_background: {
    marginTop: -170,
    height: 350,
    resizeMode: 'contain',
    position: 'absolute'
  },
  stats_controls_space: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  stats_btns_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  login_container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  home: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 110
  },
  error_logo: {
    width: 150,
    height: 150
  },
  home_current_day_stat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  home_description: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  home_description_cell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  home_btns_cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  home_description_cell_img: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  active_btn: {
    borderRadius: 5,
    backgroundColor: '#f4f4f4'
  },
  stat_cell_img_container: {
    alignItems: 'center',
    padding: 5
  },
  stat_cell_img: {
    height: 40,
    resizeMode: 'contain'
  },
  photo: {
    width: 100,
    height: 100
  },
  photo_img: {
    width: 100,
    height: 100,
    
  },
  active_home_btn: {
    backgroundColor: "#d7d7d7"
  },
  home_buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: "#f4f4f4"
  },
  home_buttons_cell: {},
  home_buttons_img: {
    height: 20,
    resizeMode: 'contain'
  },
  crash_btn: {
    margin: 20,
    padding: 20
  },
  spinner: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
    width: '100%',
    height: '100%'
  }
});
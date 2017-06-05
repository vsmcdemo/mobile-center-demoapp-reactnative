import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import SvgUri from 'react-native-svg-uri';

import AuthorizationComponent from './app/auth';
import * as CONST from './app/const';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.home}>
        <Image source={require('./images/VSMC.png')}/>
        <Image source={require('./images/photo.png')}/>
        <Text>HI, RICK WALLACE!</Text>
        <Text> </Text>
        <Text>TODAY'S STEPS:</Text>
        <Text style={{
          color: 'skyblue',
          fontSize: 72
        }}>
          10000
        </Text>

        <View style={styles.home_description}>
          <View style={styles.home_description_cell}>
            <View><Image source={require('./images/cal.png')}/></View>
            <View><Text>CALORIES</Text></View>
            <View><Text>500</Text></View>
          </View>
          <Text>|</Text>
          <View style={styles.home_description_cell}>
            <View><Image source={require('./images/distance.png')}/></View>
            <View><Text>DISTANCE</Text></View>
            <View><Text>7.4 Km</Text></View>
          </View>
          <Text>|</Text>
          <View style={styles.home_description_cell}>
            <View><Image source={require('./images/time.png')}/></View>
            <View><Text>ACTIVE TIME</Text></View>
            <View><Text>1h34m</Text></View>
          </View>
        </View>
      </View>
    );
  }
}

class StatisticScreen extends React.Component {
  static navigationOptions = {
    title: 'Statistic',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View  style={styles.container}>
        <Text>Some Statistic</Text>
        <StatisticRouter/>
        <Button
          //onPress={() => navigate('Crash')}
          onPress={() => this.props.navigation.navigate('Crash')}
          title="Crash application"
        />
      </View>
    );
  }
}

class CrashScreen extends React.Component {
  static navigationOptions = {
    title: 'Crash',
  };
  render() {
    return (
      <View style={styles.container}>
        <Image  width="300" height="300" source={require('./images/error.png')}/>
        {/*<SvgUri width="300" height="300" source={require('./images/error.svg')} />*/}
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Login page</Text>
        <AuthorizationComponent redirect={this.props.navigation.navigate}/>
      </View>
    );
  }
}

class Login2Screen extends React.Component {
  static navigationOptions = {
    title: 'Login2 ',
  };
  render() {
    return (
     <View style={styles.container}>
        {/*<SvgUri width="300" height="300" source={require('./images/error.svg')} />*/}
        <Image  width="300" height="300" source={require('./images/error.png')}/>
        <AuthorizationComponent redirect={this.props.navigation.navigate}/>
      </View>
    );
  }
}
class StepsScreen extends React.Component {
  static navigationOptions = {
    title: 'Steps ',
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Steps</Text>
      </View>
    );
  }
}

class CalScreen extends React.Component {
  static navigationOptions = {
    title: 'Calories ',
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Calories</Text>
      </View>
    );
  }
}

class DistanceScreen extends React.Component {
  static navigationOptions = {
    title: 'Distance ',
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Distance</Text>
      </View>
    );
  }
}

class TimeScreen extends React.Component {
  static navigationOptions = {
    title: 'Time ',
  };
  render() {
    return (
     <View style={styles.container}>
        <Text>DAILY STATISTICS</Text>
        <Image  width="300" height="300" source={require('./images/graph.png')}/>
        <Text>Time</Text>
      </View>
    );
  }
}

const StatisticRouter = TabNavigator({
    Steps: { screen:  StepsScreen },
    Calories: { screen: CalScreen },
    Distance: { screen: DistanceScreen },
    Time: { screen: TimeScreen },
  }, 
  {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'Steps',
    headerMode : 'none'
});

const MobileCenterRouter = TabNavigator({
    Home: { screen:  HomeScreen },
    Statistic: { screen: StatisticRouter },
    Crash: { screen: CrashScreen },
    Login: { screen: LoginScreen },
    Login2: { screen: Login2Screen },
  },
  {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    headerMode : 'none'
});





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  home: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  home_description: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  home_description_cell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('MobileCenter', () => MobileCenterRouter);
import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import * as simpleAuthProviders from 'react-native-simple-auth';

import * as CONST from './const';
const configs = {
  facebook: {
        appId: '1945815635652325',
        appSecret: 'f5638047a74faae2250f6436a065f26c',
        callback: 'fb1945815635652325://authorize',
        scope: 'user_friends',
        fields: ['email', 'first_name', 'last_name', 'picture']
    },
    twitter: {
        appId: 'RpQDj4XFdHRvHp4l3uOKkyDJq',
        appSecret: 'qqOILC0EPMvOFdsYXbE5zkgccU5Dsuo8P7PwcDR3cGoRLRm21c',
        callback: 'com.mobilecenter://authorize',
        fields: ['email', 'name', 'profile_image_url']
    }
}

class Login extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to MobileCenterAndroidDemo!
        </Text>
        
       <Button
         onPress={this.onBtnPressed.bind(this,'facebook', configs['facebook'])} 
         title = 'LOGIN VIA FACEBOOK'>
        </Button>
        {/*test*/}
        <Button
          onPress = {this.onBtnPressed.bind(this,'twitter', configs['twitter'])}
          title = 'LOGIN VIA TW'>
        </Button>
      </View>
    )
  }

  onBtnPressed(provider, opts) {
    const _this = this;
    const redirection = this.props.redirect;
    let user = this.props.user;
    this.setState({
      loading: true
    });
    simpleAuthProviders[provider](opts)
      .then((info) => {
        //DoMethod(info)
        if(provider == 'facebook'){
            Alert.alert(provider, info.user.first_name + ' ' + info.user.last_name + '\n ' + info.user.picture.data.url);
          console.log('!!!!');
          console.log(info.user);
          user = {
            name: info.user.first_name + ' ' + info.user.last_name,
            photoUrl: info.user.picture.data.url
          };

          
        } else if(provider == 'twitter'){
            Alert.alert(provider, info.user.name + '\n ' + info.user.profile_image_url);
          console.log('!!!!');
          console.log(info.user);
          user = {
            name: info.user.name,
            photoUrl: info.user.profile_image_url
          };
        }
        redirection(CONST.HOME_SCREEN);  
      })
      .catch((error) => {
        Alert.alert(
          'Authorize Error',
          error.message
        );
       redirection(CONST.LOGIN2_SCREEN);
      });
  }
}

export default class AuthorizationComponent extends Component {
  render() {
    return (
            <Login redirect={this.props.redirect}/>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
  google: {
    backgroundColor: '#ccc'
  },
  facebook: {
    backgroundColor: '#3b5998'
  },
  twitter: {
    backgroundColor: '#48BBEC'
  },
});
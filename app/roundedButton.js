import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

export default class RoundedButton extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={this.props.onPress}>
            <View style={{
                marginTop: this.props.marginTop,
                height: 60,
                width: 300,
                borderRadius: 60,
                backgroundColor: this.props.backgroundColor,           
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                }}>

                { this.props.img == null ? null :                 
                    <View style={{
                        height: 60,
                        width: 70,
                        backgroundColor: 'rgba(0,0,0,0)',          
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image 
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: 'contain'}}
                            source={this.props.img}></Image>
                    </View> 
                }

                <View style={{
                    height: 60,
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0)',       
                    flexDirection: 'row',
                    justifyContent: this.props.img == null ? 'center' : 'flex-start',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>{this.props.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
  }
}
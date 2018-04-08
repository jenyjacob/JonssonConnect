import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Clipboard,
  Button,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableHighlight
} from 'react-native'

//import { CLIENT_ID, CLIENT_SECRET } from './config'

import LinkedInModal from 'react-native-linkedin'



var STORAGE_KEY = 'token';
var DEMO_TOKEN = "0";

export default class LoginSceen extends React.Component {

  state = {
    access_token: undefined,
    expires_in: undefined,
    refreshing: false
  }

  constructor(props) {
    super(props);
    StatusBar.setHidden(true);
    // this.state = { hasToken: false, isLoaded: false };
    // if(AsyncStorage.getItem('token')) {
      // this.props.navigation.navigate("HomeFeedStack")
    // }
  }

  storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }

  async getUser({ access_token }) {
    this.setState({ refreshing: true })
    const baseApi = 'https://api.linkedin.com/v1/people/'
    const qs = { format: 'json' }
    const params = [
      'first-name',
      'last-name',
      'email-address',
      'summary',
      'picture-url',
      'id',
    ]
    const response = await fetch(`${baseApi}~:(${params.join(',')})?format=json`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    const payload = await response.json()
    this.setState({
       ...payload,
        refreshing: false
    })
    const accessToken = payload
    this.storeToken(accessToken)


    AsyncStorage.setItem('lastName', this.state.lastName),
    AsyncStorage.setItem('firstName', this.state.firstName),
    AsyncStorage.setItem('email', this.state.emailAddress),
    AsyncStorage.setItem('summary', this.state.summary),
    AsyncStorage.setItem('userPhoto', this.state.pictureUrl),
    AsyncStorage.setItem('token', "1")

  }
  // componentDidMount() {
   // AsyncStorage.getItem(token) => {
     // this.setState({ hasToken: token !== null, isLoaded: true })
   // });
 // }

  renderItem(label, value) {
    return (
      <View style={styles.item}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { emailAddress, pictureUrl, refreshing, firstName, lastName, summary, id, } = this.state;
    return (
      <View style={styles.container}>
        {!emailAddress &&
          !refreshing && (
            <View style={styles.linkedInContainer}>
              <LinkedInModal
                ref={ref => {
                  this.modal = ref
                }}
                linkText=""
                clientID="86c3k9s35z8di0"
                clientSecret="ptaW1pqjV26iefkz"
                redirectUri="https://github.com/mendoza-git/JonssonConnect"
                onSuccess= {
                  data => this.getUser(data),
                  ()=>this.state.hasToken,
                  ()=>this.props.navigation.navigate("HomeFeedStack")
                }
              />
              <TouchableHighlight onPress={()=>this.modal.open()}>
              <Image
                 style={styles.logo}
                 source={require('../images/link1logo.png')}/>
            </TouchableHighlight>

            </View>
          )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    marginRight: 10,
  },
  value: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  linkedInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 0.7,
    alignItems: 'flex-end',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo:{
    resizeMode:'contain'
  }
})

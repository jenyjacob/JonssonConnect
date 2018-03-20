import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Clipboard,
  Button,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableHighlight,
} from 'react-native'

//import { CLIENT_ID, CLIENT_SECRET } from './config'

import LinkedInModal from 'react-native-linkedin'



export default class LoginScreen extends React.Component {
  state = {
    access_token: undefined,
    expires_in: undefined,
    refreshing: false,
  }

  constructor(props) {
    super(props)
    StatusBar.setHidden(true)
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
      'id'

    ]

    const response = await fetch(`${baseApi}~:(${params.join(',')})?format=json`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    const payload = await response.json()
    this.setState({ ...payload, refreshing: false })
  }

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
    const { emailAddress, pictureUrl, refreshing, firstName, lastName, summary,id} = this.state;
    return (
      <View style={styles.container}>
        {!emailAddress &&
          !refreshing && (
            <View>
              <LinkedInModal
                ref={ref => {  this.modal = ref
                }}

                clientID="86c3k9s35z8di0"
                clientSecret="ptaW1pqjV26iefkz"
                redirectUri="https://github.com/mendoza-git/JonssonConnect"
                 linkText=""
                onSuccess= {
                    data => this.getUser(data),
                    (data)=>this.props.navigation.navigate('Profile') ,
                   ()=> this.props.navigation.navigate('Home')}


                />
                <TouchableHighlight onPress={()=>this.modal.open()}>
                <Image
                   style={styles.logo}
                   source={require('../images/link1logo.png')}/>
              </TouchableHighlight>

            </View>
          )}

        {refreshing && <ActivityIndicator size="large" />}

        {emailAddress && (
          <View style={styles.userContainer}>
            {this.renderItem('Email', emailAddress)}
            <Image
              style={{width: 50, height: 50}}
              source={{uri: pictureUrl}}
            />
            {this.renderItem('First name', firstName)}
            {this.renderItem('Last name', lastName)}
            {this.renderItem('Summary', summary)}
            {this.renderItem('ID', id)}

          </View>
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
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

import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, AsyncStorage } from 'react-native'
import AlarmCreator from './AlarmCreator'
import AlarmDisplayer from './AlarmDisplayer'
import { Permissions, Notifications } from 'expo'

const PUSH_KEY = 'push_token3'
const PUSH_ENDPOINT = 'https://your-server.com/users/push-token'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingAlarm: false,
      existingAlarms: [],
      alarmCount: 0,
      pushToken: "nope",
    }
    this.getPushToken()
  }

  getPushToken = () => {
    let push_token
    AsyncStorage.getItem(PUSH_KEY).then((token)=>{
      if (token == null) {
        this._getExponentPushToken()
      } else {
        this.setState({pushToken: token})
      }
    })
  }

  _getExponentPushToken = () => {
    this._getExponentPushTokenAsync()
  };

  async _getExponentPushTokenAsync() {
    try {
      let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
      let pushToken = await Notifications.getExponentPushTokenAsync();
      AsyncStorage.setItem(PUSH_KEY, pushToken)
      this.setState({ pushToken });
    } catch (error) {
      this.setState({ pushToken: "Error"});
    }
  }

  createNewAlarm = () => {
    this.setState({creatingAlarm: true})
  }

  handleCreate = state => {
    this.setState({creatingAlarm: false})
    this.createAndDisplay(state)
  }

  createAndDisplay = data => {
    let newAlarm = {
      name: data.creatingAlarmName,
      contact: data.creatingAlarmContact,
      repeatInterval: data.creatingRepeatInterval,
      responseInterval: data.creatingResponseInterval,
      startDate: data.creatingDate,
      id: this.state.alarmCount,
      message: data.message,
    }
    this.setState({alarmCount: this.state.alarmCount + 1})
    // add alarm to list of alarms
    let newAlarmArray = this.state.existingAlarms.slice();
    newAlarmArray.push(newAlarm);
    this.setState({existingAlarms: newAlarmArray})

    let repeatIntervalCode = 1
    if (newAlarm.repeatInterval == "Daily")
      repeatIntervalCode = 2
    else if (newAlarm.repeatInterval == "Weekly")
      repeatIntervalCode = 3

    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        push_token: this.state.pushToken,
        alarm_id: newAlarm.id,
        start_time: newAlarm.startDate.getTime(),
        interval: repeatIntervalCode,
        warning_time: newAlarm.responseInterval,
        message: newAlarm.message,
        contact: newAlarm.contact,
      })
    })
  }

  render() {
    this.getPushToken()
    if (this.state.creatingAlarm) {
      return <AlarmCreator handleCreate={this.handleCreate} />
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Dead Man's Switch</Text>
        <AlarmDisplayer alarms={this.state.existingAlarms} />
        <TouchableHighlight
          style={styles.submit}
          onPress={this.createNewAlarm}
          underlayColor='#fff'>
            <Text style={styles.submitText}>Create a New Alarm</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    borderRadius: 3,
  },
  submit: {
    width: 300,
    marginTop: 20,
    marginBottom: 50,
    marginRight:40,
    marginLeft:40,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#d3d3d3'
  },
  submitText: {
    color:'#fff',
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

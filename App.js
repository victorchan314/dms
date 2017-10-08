import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';
import AlarmCreator from './AlarmCreator'
import AlarmDisplayer from './AlarmDisplayer'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingAlarm: false,
      existingAlarms: [],
      alarmCount: 0,
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

    // make api call
    // hourly, daily, weekly (1, 2, 3) integer
    // start date (milliseconds -integer)
    // time to respond (integer from 5 to 55)
    // push token (string)
    // contacts (comma delimited string)
    // message (string)
    // alarmid (integer)
  }

  render() {
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
            <Text style={styles.submitText}>Create a new alarm:</Text>
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
    width: 200,
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
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

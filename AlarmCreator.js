import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';

module.exports = class AlarmCreator extends React.Component {
  static propTypes = {
    handleCreate: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      creatingAlarmName: "Enter the name of your alarm...",
      creatingEmailContact: "Enter your emergency email contact...",
      creatingMessage: "Enter your emergency message...",
      creatingRepeatInterval: "Hourly",
      creatingResponseInterval: 30,
      creatingDate: new Date(),
      creatingDateTimePickerVisible: false,
    }
  }

  parseEmails = text => {
    //takes in string and returns array of valid email addresses
    //(separated by comma, semicolon, space, or combination)
    var emailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (emailRegex.test(text)) {
      return true
    }
    return false
  }

  _showDateTimePicker = () => this.setState({ creatingDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ creatingDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    this.setState({creatingDate: date})
    this._hideDateTimePicker();
  }

  _handleRepeatIntervalPicked = (index, value) => {
    this.setState({creatingRepeatInterval: value})
  }

  _handleResponseIntervalPicked = (index, value) => {
    this.setState({creatingResponseInterval: value})
  }

  _handleCompletion = () => {
    if (!this.parseEmails(this.state.creatingEmailContact))
      return
    this.props.handleCreate(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.alarmCreatorContainer}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Alarm Name:</Text>
          <TextInput
            onChangeText={(creatingAlarmName) => this.setState({creatingAlarmName})}
            value={this.state.creatingAlarmName}
            editable = {true}
            maxLength = {100}
            style={styles.textInput}
          />
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Emergency Contact Email:</Text>
          <TextInput
            onChangeText={(creatingEmailContact) => this.setState({creatingEmailContact})}
            value={this.state.creatingEmailContact}
            editable = {true}
            maxLength = {100}
            style={styles.textInput}
          />
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Emergency Message:</Text>
          <TextInput
            onChangeText={(creatingMessage) => this.setState({creatingMessage})}
            value={this.state.creatingMessage}
            editable = {true}
            maxLength = {100}
            style={styles.textInput}
          />
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Repeat Interval:</Text>
          <ModalDropdown
            defaultValue={this.state.creatingRepeatInterval}
            options={["Hourly", "Daily", "Weekly"]}
            onSelect={this._handleRepeatIntervalPicked}
            style={styles.timeInputWrapper}
            dropdownStyle={styles.timeInputDropdown}
            textStyle={styles.timeInputText}
          />
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Time to Respond (minutes):</Text>
          <ModalDropdown
            defaultValue={this.state.creatingResponseInterval}
            options={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}
            onSelect={this._handleResponseIntervalPicked}
            style={styles.timeInputWrapper}
            dropdownStyle={styles.timeInputDropdown}
            textStyle={styles.timeInputText}
          />
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Start date:</Text>
          <TouchableHighlight
            onPress={this._showDateTimePicker}
            style={styles.textInput}
          >
            <Text style={styles.dateText}>{this.state.creatingDate.toString()}</Text>
          </TouchableHighlight>
          <DateTimePicker
            mode="datetime"
            minimumDate={new Date()}
            isVisible={this.state.creatingDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <TouchableHighlight
            style={styles.submit}
            onPress={this._handleCompletion}
            underlayColor='#fff'>
              <Text style={styles.submitText}>Create!</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
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
  alarmCreatorContainer: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 325,
    borderRadius: 3,
    padding: 20,
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
  submitText:{
    color:'#fff',
    textAlign:'center',
  },
  textInput: {
    height: 35,
    width: 300,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 5,
    fontSize: 14,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  timeInputWrapper: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 15,
    height: 35,
    width: 300,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
  },
  timeInputDropdown: {
    backgroundColor: 'white',
    width: 300,
    height: 105,
  },
  timeInputText: {
    fontSize: 14,
    paddingTop: 8,
    paddingLeft: 5,
  },
  dateText: {
    paddingTop: 8,
  }
});

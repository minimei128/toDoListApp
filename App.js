import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity } from 'react-native';

  import {Item} from './components/Item';

export default class App extends Component {

  state = {
    taskName: '',
  }

  listData = []

  render() {
    return (
// start --- main app container 
      <SafeAreaView>
          {/* start --- text input container */}
          <View style = {styles.main}>
              
              <Text>To Do List</Text>
              
              {/* section: enter/input category on app */}
             <TextInput
                style={styles.input}
                placeholder="Enter a task"
                onChangeText={ text => this.setState({taskName: text})}
                ref={(input) => (this._textInput = input)}
            />
        </View>
        {/* end --- text input container */}

        {/* start --- add button container */}
        <View>
            <TouchableOpacity style={styles.button} onPress={this.addItem}>
            <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
        {/* end --- add button container */}

        {/* User input item display in a list */}
        <FlatList
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={ item => item.id} 
          />

      </SafeAreaView>
      // end --- main app container 
    )
  }


  renderList = ({item}) => (
    <Item task={item.task} />
  )

  addItem = () => {
    // check if the text input is empty
    if(this.state.taskName == '') {
        return;
      }
      let itemId = new Date().getTime().toString()
      let listItem = {
        id: itemId,
        task: this.state.taskName
      }
      this.listData.push(listItem)
      this.setState({expenseCategory: null})
      console.log('adding')
      this._textInput.clear()
      this._textInput.focus()
    }

  }

const colors = {
      primary : 'hsla(330,38%,65%,1)'
    }

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 15
  },
  button: {
    padding: 15,
    backgroundColor: colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
})
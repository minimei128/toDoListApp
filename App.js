import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  FlatList,
  TextInput,
  Button,
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
      <SafeAreaView style={{flex:1}}>
        <View style = {styles.header}>
          <Text style = {styles.title} >To Do List</Text>
        </View>
          {/* start --- text input container */}
          <View style = {styles.main}>
              
              {/* section: enter/input category on app */}
             <TextInput
                style={styles.input}
                placeholder="Enter a task"
                onChangeText={ text => this.setState({taskName: text},
                () => {this.validate()}
                )}
                ref={(input) => (this._textInput = input)}
            />
        </View>
        {/* end --- text input container */}

        {/* start --- add button container */}
        <View>
            <TouchableOpacity 
            // Disabled add button until there's an input
            style={this.state.validInput ? styles.button : styles.buttonDisabled} 
            onPress={this.addItem}
            disabled = {!this.state.validInput ? true : false}
            >
            <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
        {/* end --- add button container */}
        
        <View style={{flex:1}}>
        {/* User input item display in a list */}
        
        <FlatList
          
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={ item => item.id} 
          />
          </View>
        
        
      </SafeAreaView>
      // end --- main app container 
    )
  }


  renderList = ({item}) => (
    <TouchableOpacity 
    onPress={this.deleteItemById}>
    <Item task={item.task} />
    </TouchableOpacity>
  )

  //add input task to list clicking add button using this function
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
      //sort list in descending order
      this.sortList()
      this.setState({taskName: null, validInput: false})
      console.log('adding')
      this._textInput.clear()
      this._textInput.focus()
    }

    //validate the input to activate the disabled button function
    validate = () => {
      if( this.state.taskName ){
        this.setState({validInput:true})
      }
    }

    //when input task it gets sorted to the top of list
    sortList = () => {
      //sort list by comparing two item in array to know which one is more recent
      this.listData.sort( (item1,item2)=> {
        return item2.id - item1.id
      })
    }

    // Making each render item dynamic to click
    deleteItemById = () => {
      
      console.log("delete");
    }

  }

const colors = {
      primary : 'orange',
      primaryDisabled: 'orange'
    }

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#87cefa',
    paddingTop: 20
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: "center"
  },
  main: {
    paddingHorizontal: 10,
    backgroundColor: '#87cefa'
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 15,
    backgroundColor: 'white'
  },
  button: {
    padding: 15,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  buttonDisabled:{
    padding: 15,
    backgroundColor: colors.primaryDisabled
  },
})
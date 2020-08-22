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
  TouchableOpacity,
  AsyncStorage, } from 'react-native';

  import {Item} from './components/Item';

export default class App extends Component {

  state = {
    taskName: '',
    showToast: false,
    message: '',
  }

  listData = []

  render() {

    return (
// start --- main app container 
      <SafeAreaView style={{flex:1, position: 'relative'}}>
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
        
        {/* status bar at the bottom screen tells user their action they selected */}
        <View style={[{
          display: this.state.showToast ? 'flex' : 'none'
        }, styles.toast ]}>
          <Text style={styles.toastMessage}>{this.state.message}</Text>
        </View>
        <View style={{flex:1}}>

        {/* User input item display in a list */}
        
        <FlatList
          
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={ item => item.id} 
          extraData={this.state.taskName}
          />
          </View>
        
        
      </SafeAreaView>
      // end --- main app container 
    )
  }

  componentDidMount() {
    this.loadList()
  }

  renderList = ({item}) => (
    <Item task={item.task} 
    id={item.id}
    delete={this.deleteItemById}
    buttonPressed={this.checkItemOff}
    status = {item.status}
    />
  )

  checkItemOff = ( itemId ) =>{
      this.listData.forEach( (item) => {
        if( item.id == itemId ) {
          item.status = true
        }
      } )
      this.showToast('Task Done', 1500)
      this.saveList()
      this.setState({taskName: null})
  }

  //add input task to list clicking add button using this function
  addItem = () => {
    // check if the text input is empty
    if(this.state.taskName == '') {
        return;
      }
      let itemId = new Date().getTime().toString()
      let listItem = {
        id: itemId,
        task: this.state.taskName,
        status: false,
      }
      this.listData.push(listItem)
      //sort list in descending order
      this.sortList()
      this.saveList()
      this.setState({taskName: null, validInput: false})
      this._textInput.clear()
      this._textInput.focus()
      this.showToast('Task Added', 1500)
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
    deleteItemById = (itemId) => {
      
        this.listData.forEach((item, index) => {
            if (item.id == itemId) {
                //to remove a single item starting at index
                this.listData.splice(index, 1)
            }

        })

        this.showToast('Task Deleted', 2000)
        this.saveList()
        this.setState({
            refresh: !this.state.refresh
        })
      
    }

    saveList = async () => {
        try {
          await AsyncStorage.setItem(
            'data',
            JSON.stringify(this.listData)
          )
        }
        catch( error ) {
          console.log(error)
        }
      }
    
      loadList = async () => {
        try{
          let items = await AsyncStorage.getItem('data')
          if( JSON.parse(items) ) {
            this.listData = JSON.parse( items )
          }
          this.setState({expenseAmount:0})
        }
        catch(error) {
          console.log(error)
        }
      }

      showToast = ( message, duration ) => {
        this.setState({message: message }, 
          () => { this.setState({showToast: true}) }
        )
        const timer = setTimeout( 
          () => { this.setState({showToast: false }) },
          duration 
        )
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
    backgroundColor: '#87cefa',
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
  toast: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: -30,
    zIndex: 999,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
  },
  toastMessage: {
    color: 'white',
    textAlign: 'center'
  },
  buttonArea: {
      paddingBottom:100,
  }
})

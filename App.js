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
    expenseAmount : 0,
    expenseCategory: '',
    updating: false,
  }

  listData = []

  render() {
    return (
// start --- main app container 
      <SafeAreaView>
          {/* start --- text input container */}
          <View style = {styles.main}>
              
              <Text>To Do List</Text>
              
               {/* section: enter/input amount on app */}
              <TextInput
                style={styles.input}
                placeholder= "$ amount"
                onChangeText={ text => this.setState({expenseAmount: parseFloat(text) }) }
                keyboardType="number-pad" />
              {/* section: enter/input category on app */}
             <TextInput
                style={styles.input}
                placeholder="category"
                onChangeText={ text => this.setState({expenseCategory: text})}
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
          extraData = {this.state.expenseAmount}
          />

      </SafeAreaView>
      // end --- main app container 
    )
  }


  renderList = ({item}) => (
    <Item amount={item.amount} category={item.category} />
  )

  addItem = () => {
    if(
      isNaN(this.state.expenseAmount) ||
      this.state.expenseAmount == 0 ||
      this.state.expenseCategory == '') {
        return;
      }
      let itemId = new Date().getTime().toString()
      let listItem = {
        id: itemId,
        amount: this.state.expenseAmount,
        category: this.state.expenseCategory
      }
      this.listData.push(listItem)
      console.log('adding')
      //this.setState({updating: true})
      this.setState({expenseAmount:0})
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
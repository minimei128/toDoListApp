import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Image} from 'react-native';

export const Item = (props) => {
    return(
        //render each item on the list
        <View style = {itemStyles.item}> 
        
            <View style = {itemStyles.row}>
            <Text style={itemStyles.text}>{props.task}</Text>
            </View>
            <TouchableOpacity>
                <Image style ={itemStyles.icon}source={require('../assets/trash-alt-solid.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const itemStyles = StyleSheet.create({
    item: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#dcdcdc'
    
    },
    text: {
        fontSize:16,
        color: 'black'
    },
    row: {
        flexDirection: 'row',
        flex: 1
    },
    icon: {
        width: 20, 
        height: 20,
    }

})
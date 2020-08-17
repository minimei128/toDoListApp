import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity} from 'react-native';

export const Item = (props) => {
    return(
        //render each item on the list
        <View style = {itemStyles.item}> 
            <Text style={itemStyles.text}>{props.task}</Text>
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
    }
})
import React from 'react'
import {StyleSheet, View, Text, SafeAreaView, TextInput} from 'react-native'



export default function App(){

  return (
    
    <SafeAreaView>
      <View>
    <TextInput className="input" type="checkbox"onChange={()=>props.completed(props.id)}/>
    <Text>{props.item}</Text>  
      <View> <FaTrash onClick={()=>props.deleted(props.id)}/></View>
      </View>
    </SafeAreaView>

    )
}
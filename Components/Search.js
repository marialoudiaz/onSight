import React from 'react'
import {View, Text, SafeAreaView, StyleSheet,TextInput, Button, FlatList } from 'react-native'


// here i display all the films i added
export default function App(){

const [textSearch, setSearch]= useState('')


  return (
    <SafeAreaView>

      {/* insert the searchbar */}
      <View>
        <TextInput 
        onChangeText={(textSearch)=> setSearch(textSearch)}
        value={textSearch}
        />
        
        {/* The list being displayed from search */}
        <View>{}</View>
      </View>

{/* insert the list of films being displayed from the search */}
{/* add a button "add to watchlist" */}

      <View></View>
    
    
    
    </SafeAreaView>

    )
}



// add to watchlist
//// on submit ?
// when clicked => added no item to array of ListMovies (le passer en props pour l'update)
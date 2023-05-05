import React, {useState} from 'react';
import { BottomNavigation, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
// some example of data to pass via props 
  const [someData, setSomeData]=useState('banana')

// defining routes with components to be rendered
  const ListRoute = () => <View style={styles.container}><App /></View>
  const CreateRoute = () => <View style={styles.container}><AddFilm /></View>
//imported one
//   const NotificationsRoute = () => <Notifications styleProps={styles.container} fruit={someData}/>;

// state with active route and labels/icons for routes
  const [state,setState]=useState({
    index: 0,
    routes: [
     { key: 'list', title: 'WatchList', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
     { key: 'create', title: 'Add Movie', focusedIcon: 'album' },
     ],
  })
// update route index in state
  handleIndexChange = index => setState({...state, index})

// linking keys from state to routes
  renderScene = BottomNavigation.SceneMap({
    list: ListRoute,
    create: CreateRoute,
  });

  return (
    <SafeAreaProvider >
      <BottomNavigation
      navigationState={state}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      />
    </SafeAreaProvider>
    )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#ecf0f1',
  }
});
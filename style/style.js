// const { color } = require("@rneui/themed/dist/config")

 const container= {
  flex:1
  }

  text={
    fontSize:15,
    color:'black',
    backgroundColor: 'rgba(255,255,255,0.8)'
  }

  image={
    borderRadius:50,
  }

  input={
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1  
  }

  header={
    marginLeft: 20,
    marginTop: 15,
    fontSize: 18
  }
  ////////////////////////////////////////////// SEARCHBOX ////////////////////////////////////////////////

  searchContainer={
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 50,
    paddingLeft: 25,
    paddingRight: 10
  }

  searchbox={
    fontSize: 13,
    backgroundColor: '#eee',
    width:'100%',
    height: 60,
    borderRadius: 60,
    paddingHorizontal: 20,
    paddingVertical: 8,
  }

  dropShadowInput={
    shadowColor: '#3e3c3c',
    shadowOffset: {width: 0,height: 3,},
    shadowOpacity:  0.17,
    shadowRadius: 3.05
  }

  dropShadow= {
    shadowColor: '#171717',
    shadowOffset: {width: -0.5, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  innerShadow={
    shadowColor: '#171717',
    shadowRadius:20
  }

  ////////////////////////////////////////////// BUTTONS ////////////////////////////////////////////////

  button={
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    borderWidth: 1 ,
    borderRadius: 20,
    backgroundColor: 'white'
  }
  
  addButton={
  borderRadius: 80,
  backgroundColor: 'white',
  height: 40,
  width: 40,
  }

  addWLBtn={
  borderRadius: 80,
  backgroundColor: 'transparent',
  height: 40,
  width: 40,
  }

  ////////////////////////////////////////////// BLOCKS ////////////////////////////////////////////////

  resultBlock={
    flexDirection: 'row',
    width: '99%', 
    justifyContent: 'flex-start',
    margin: 9,
    paddingTop:15,
    paddingLeft: 25,
    paddingBottom: 10,
    borderRadius: 40,
  }


  glassComponent={
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '73%',
  borderRadius: 20,
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft:15,
  paddingRight:15,
  margin: 4,
  borderWidth: 3,
  borderColor: 'rgba(255, 255, 255, 0.23)',
  overflow: 'hidden'
  }

  bottomNavigation={
    // flex: 1,
    // justifyContent: 'center',
    // alignItems:'center',
    // backgroundColor: '#192b87',
  }

module.exports={
  container, 
  header,
  input, 
  text, 
  button, 
  image,
  searchbox, 
  resultBlock,
  searchContainer,
  addButton,
  innerShadow,
  dropShadow,
  addWLBtn,
  dropShadowInput,
  glassComponent,
  bottomNavigation
}
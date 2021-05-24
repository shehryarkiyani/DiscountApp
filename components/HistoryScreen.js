import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView} from 'react-native';
import{Modal} from 'react-native-paper';
import Constants from 'expo-constants';
import color from '../config/color'
import { DataTable } from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MyButton from './Button';
import StartScreen from './StartScreen'
const HistoryScreen=({route,navigation})=>{
  let {yourhistory}=route.params
  const [modalVisible, setModalVisible] = useState(false);
  const[itemP,setItem]=useState(false)
  const changehistory=(id)=>{
    let newhistory=yourhistory.filter(item=>item.id!=id);
    if(newhistory==undefined || newhistory=={}){
      newhistory=[]
    }
   
    navigation.setParams({
      yourhistory:newhistory
    })
  }
  useEffect(()=>{
if(yourhistory.length!=0){
  setItem(false)
}else{
setItem(true)
}
  },[yourhistory])
  function renderElement(){
    if(yourhistory.length!=0){
     
      return(
        yourhistory.map(item=>{
  
  return(
    
  <DataTable.Row>
      <DataTable.Cell style={styles.content}><Text style={{color:color.yellow,fontWeight:'bold',fontSize:16}}>{item.originalPrice}</Text></DataTable.Cell>
      <DataTable.Cell style={[styles.content,{paddingLeft:25}]}><Text style={{color:color.yellow,fontWeight:'bold',fontSize:16}}>-</Text></DataTable.Cell>
      <DataTable.Cell style={{flex:3,paddingLeft:15}} ><Text style={{color:color.red,fontWeight:'bold',fontSize:16}}>{item.Discount}</Text></DataTable.Cell>
      <DataTable.Cell style={{flex:2}} >=</DataTable.Cell>
      <DataTable.Cell style={{flex:3}} ><Text style={{color:color.green,fontWeight:'bold',fontSize:16}}>{item.finalPrice}</Text></DataTable.Cell>
      <DataTable.Cell style={styles.content} >
     
      <View>
      <TouchableOpacity onPress={()=>changehistory(item.id)}>
      <MaterialCommunityIcons name="delete-forever" size={24} color="red" />
      </TouchableOpacity>
      </View>
     
      </DataTable.Cell>
    </DataTable.Row>
  )
})
      )
    }else {
      
      return(
<View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
  <Text style={{fontSize:20,fontStyle:'italic',color:color.Red}}>No item present in your History</Text></View>
      )
    }
    
  }
  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(<MyButton disable={itemP} onPress={()=>setModalVisible(true)}  txt="Clear History" btnStyle={{backgroundColor:color.lightblue,padding:10,borderRadius:50,height:40}} textStyle={{color:'white',fontSize:14}}/>)
    })
  })
  
  
return(
<View style={styles.container}>
<View style={{marginTop:10,left:245,marginBottom:10}}>

</View>
<ScrollView>
  <DataTable>
    <DataTable.Header>
      <DataTable.Title ><Text style={{color:color.yellow,fontWeight:'bold'}}>Original Price     -</Text></DataTable.Title>
      <DataTable.Title ><Text style={{color:color.red,fontWeight:'bold'}}>Dicount           =</Text></DataTable.Title>
      <DataTable.Title ><Text style={{color:color.green,fontWeight:'bold'}}>Final Price</Text></DataTable.Title>
    </DataTable.Header>
{renderElement()}
 
    </DataTable>
    <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
    <MyButton onPress={()=>navigation.navigate('Discount App',{myhistory:yourhistory
    })} txt="Go Back" btnStyle={{backgroundColor:color.purple,width:'30%',borderRadius:50,height:40}} textStyle={{color:'white',fontSize:16}}/>
    </View>
    </ScrollView>
    <Modal visible={modalVisible} animationType="slide" >
     <View style={styles.centeredView}>
     <View style={styles.modalView}>
<Text>Want To Clear Your History?</Text>
<View style={{flexDirection:'row'}}>
<MyButton  onPress={()=>{
  navigation.setParams({
      yourhistory:[]
    })
  setModalVisible(false);
  
  
  
  }} txt="OK" btnStyle={{backgroundColor:color.green,width:'25%',borderRadius:80,height:40}} textStyle={{color:'white',fontSize:16}}/>
  <MyButton  onPress={()=>{
  setModalVisible(false);
  
  
  
  }} txt="No"  btnStyle={{backgroundColor:color.reddish,width:'25%',borderRadius:80,height:40}} textStyle={{color:'white',fontSize:16}}/>
  </View>
     </View>
     </View>
     
     </Modal>
    </View>
)
}
const styles=StyleSheet.create({
  container:{
    flex:1
  },
content:{
  justifyContent:'center',
  alignItems:'center',
  flex:2
},
modalView: {
    margin:20,
    backgroundColor:'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView:{
    justifyContent:'center',
   marginTop:-60
  }
  
})
export default HistoryScreen;
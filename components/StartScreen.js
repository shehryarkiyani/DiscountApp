import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View,TextInput,Keyboard, Pressable } from 'react-native';
import{Modal} from 'react-native-paper'
import Constants from 'expo-constants';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import color from '../config/color'
import MyButton from './Button';
import HistoryScreen from './HistoryScreen'
const StartScreen=({navigation,route})=> {
  let backhis=route.params;
  let his=backhis==undefined?[]:route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const[t1,setT1]=useState('')
  const[t2,setT2]=useState('')
  const[save,setSave]=useState('')
  const[original,setOriginal]=useState('')
  const[prErr,setErr]=useState('')
  const[disErr,setDErr]=useState('')
  const[btndisable,setbtndisable]=useState(false)
  const[history,sethistory]=useState(his);
  

  const setPrice=(txt)=>{
setT2(txt)
if(txt=='' || txt==undefined){
          setOriginal('')
          setSave('')
          setbtndisable(true)
        }

  }

  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(<MyButton onPress={GoToHistory}  txt="View History" btnStyle={{backgroundColor:color.lightblue,padding:10,borderRadius:50,height:40}} textStyle={{color:'white',fontSize:14}}/>)
    })
  })

  const savehistory=()=>{
    let Myuid=uuidv4()
    const myobj={
      id:Myuid,
      originalPrice:t1,
      Discount:t2+" %",
      finalPrice:original,
    }
    
sethistory([...history,myobj])
    
    
    
    setModalVisible(true)
    Keyboard.dismiss()
  }

  useEffect(() => {
    if((t1==undefined ||t1=='')||(t2==undefined ||t2=='')){
      setbtndisable(true)
    }else{
      setbtndisable(false)
    }
    calculate()
    
   
  },[t1,t2]);
  React.useEffect(()=>{
    
    
    if (route.params?.myhistory) {
      sethistory(route.params.myhistory)
      
    }
  },[route.params?.myhistory]);

  React.useEffect(()=>{
    if(prErr!='' || disErr!=''){
setbtndisable(true)
    }
  },[prErr,disErr])
  const calculate=()=>{
     let val1=parseInt(t1)
      let val2=parseInt(t2)
    if(isNaN(t1)|| val1<0){
      setErr("Number Should be positive integer")
       setSave('')
          setOriginal('')
          if(val2<=100 && val2>0 ){
            setDErr('')
          }else{
            if(t2==''){
              setDErr('')
            }else{
 setDErr("Discount should be less than 100")
            }
            
          }
    }else{
      setErr('')
     
     
      if(val2>0){
        if(val2<=100){
          setDErr('')
          let newprice=(val1*val2)/100
          newprice=newprice.toFixed(2)
          let saveprice=val1-newprice
          saveprice=saveprice.toFixed(2)
          if(t2===''|| t1===''){
      setSave('')
          setOriginal('')
          }else{
            setSave(newprice.toString())
          setOriginal(saveprice.toString())
    
          }
        }else{
          setDErr("Discount should be less than 100")
          setSave('')
          setOriginal('')
        }
       
      }
      
    }
    
    
  };
  const GoToHistory=()=>{
    navigation.navigate('Your History',{
      yourhistory:history,
     })
  }
  return (
    
    <View style={styles.container}>
    
    <View style={{marginTop:10,left:245}}>
    
    </View>
      <View style={styles.innerContainer}>
      
      <View style={styles.midcontainer}>
      <Text style={{color:'magenta',marginLeft:-16}}>Original Price</Text>
      <TextInput keyboardType={'number-pad'} onChangeText={(txt)=>{
        setT1(txt);
        if(txt=='' || txt==undefined){
          setOriginal('')
          setSave('')
          setbtndisable(true)
        }
        
        }} style={[styles.TextInputStyle,{marginLeft:15}]} placeholder="Enter Original Price" placeholderTextColor='#ff6347'/>
      
      </View>
<Text style={[prErr==''?{display:'none'}:styles.priceErr]}>{prErr}</Text>
      <View style={styles.midcontainer}>
          <Text style={{color:'magenta'}}>Discount: </Text>
          <TextInput keyboardType={'number-pad'} onChangeText={setPrice} style={styles.TextInputStyle} placeholder="Enter Discount Percentage" placeholderTextColor='#ff6347'/>
     
        </View>
        <Text style={[disErr==''?{display:'none'}:styles.discountErr]}>{disErr}</Text>
        <View style={styles.midcontainer}>
          <Text style={{color:'magenta',marginLeft:-16}}>Amount Save:</Text>
          <TextInput style={[styles.InputStyle,{marginLeft:12}]} value={save}/>
        </View>
        <View style={styles.midcontainer}>
          <Text style={{color:'magenta'}}>New Price:</Text>
          <TextInput style={styles.InputStyle}  value={original}/>
        </View>
     
 
      
      
      </View>
      <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
      <MyButton disable={btndisable} onPress={savehistory} txt="Save" btnStyle={{backgroundColor:color.purple,width:'25%',borderRadius:80,height:40}} textStyle={{color:'white',fontSize:16}}/>
      </View>
     <Modal visible={modalVisible} animationType="slide" transparent={true}>
     <View style={styles.centeredView}>
     <View style={styles.modalView}>
<Text>History Save</Text>
<MyButton  onPress={()=>{
  setModalVisible(false);
  setbtndisable(true)
  
  
  }} txt="OK" btnStyle={{backgroundColor:color.green,width:'25%',borderRadius:80,height:40}} textStyle={{color:'white',fontSize:16}}/>
     </View>
     </View>
     
     </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  priceErr:{
    display:'flex',
color:'red'
  },
  discountErr:{
     display:'flex',
color:'red'
  },
  innerContainer:{
    flexDirection:'column',
    marginTop:90
  },
  TextInputStyle:{
    borderBottomColor:'#ff1493',
    borderWidth:1,
    borderTopWidth:0,
    borderRightWidth:0,
    borderLeftWidth:0,
    width:'60%',
    height: 40,
    paddingTop:13,
    marginLeft:15,
  },
  InputStyle:{
    width:'60%',
    height: 50,
    marginLeft:15,
    paddingTop:30,
  },

  midcontainer:{
    flexDirection:"row",
    width:'100%',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    
  },
  centeredView:{
    justifyContent:'center',
   marginTop:-60
  }
  
  
});
export default StartScreen;

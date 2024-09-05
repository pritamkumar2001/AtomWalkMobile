import React from "react";
import { View, Image } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import { SIZES, SHADOWS, assets } from "../constant_s";
import { SubInfo, EthPrice, CardTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";
import { colors } from "../Styles/appStyle";
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
const Card = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 5; /* for Android shadow */
  //shadow-color: #000; /* for iOS shadow */
  //shadow-offset: { width: 0, height: 2 }; /* for iOS shadow */
  //shadow-opacity: 0.25; /* for iOS shadow */
  //shadow-radius: 3.84; /* for iOS shadow */
`;

const CardDetails = styled.View`
  flex: 1;
`;

const CardTitles = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #000;
`;

const CardSubText = styled.Text`
  font-size: 14px;
  color: #666;
`;

const AmountDueButton = styled.TouchableOpacity`
  flex-direction: row;
  /* width: 130px; */
  height: 40px;
  align-items: center;
  background-color: '#fffff';
  border: 1px solid ;
  border-color: ${props => props.color ? '#3c9df1' : 'red'};
  border-radius: 10px;
  padding: 5px;
  margin-top: 10px;
  margin-right: 50px;
  justify-content: center;
`;

const AmountDue = styled.Text`
margin-left: 5px;
font-size: 14px;
/* color: red; */
color: ${props => props.color ? 'black' : 'red'};
`;
const AmountDues = styled.Text`
/* margin-left: 5px; */
font-size: 18px;
font-weight:500;
margin-top: 10px;
/* color: red; */
color:green;
`;


const CardActions = styled.View`
  align-items: center;
`;

const CardButtons = styled.View`
  align-items: center;
  flex-direction: column;
`;

const TaskButton = styled.TouchableOpacity`
  flex-direction: row;
  /* width: 130px; */
  height: 40px;
  align-items: center;
  background-color: '#fffff';
  border: 1px solid blue;
  border-radius: 10px;
  padding: 5px 14px ;
  margin-top: 10px;
`;

const TaskButtonText = styled.Text`
  font-size: 14px;
  color: #000;
`;

const ViewTasksButton = styled.TouchableOpacity`
  background-color: #3c9df1;
  /* width: 130px; */
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 10px;
  font-weight: 400;
`;

const ViewTasksText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const LogoImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const CardItem = ({data, navigation, screen, handleIconPress, icon, buttonTittle, colour, isAmtApplicable, 
                   handleDisplayPress, iconName1, handleIconName1Press, iconName2, iconScreen2 }) => {
    const sub_title = data.customer?data.customer.name: data.gstn_number? `GSTN ${data.gstn_number}`: data.address_line_1
    const cardColour = colour ? colour: colors.primary
    
    const handleNavigation = () => {
      console.log('Screen name', screen);
      if (screen == 'CustomerTasks'){
        navigation.navigate('CustomerTasks',  {customer_id: data.id, name: data.name, lead_id: '', call_mode:'C' });
      }else if (screen == 'LeadTasks'){
        navigation.navigate('CustomerTasks',  {customer_id: '', name: data.name, lead_id: data.id, call_mode:'L' });
      } else if (screen == 'ProductInterest' || screen == 'TaskInterest') {
        navigation.navigate(screen,  {task_id: data.id, screen: screen,
          name: data.customer? data.customer.name: data.lead? data.lead.name:'', task_name: data.name,
          call_mode: data.customer? 'C': data.lead? 'L':'' });
      } 
      else {
        navigation.navigate(screen, { data });
      }

    }

    
  const handleIconNavigation2 = () => {
      console.log('Icon Screen name', iconScreen2, data);
      if (iconScreen2 == 'ViewInterest'){
          navigation.navigate(iconScreen2, {data: data, call_mode: callMode, delete_mode: 'Y'});
      } 
      else if (iconScreen2 == 'InvoiceSendMail') {
          Alert.alert('Not Enabled')
      }
      else {
        navigation.navigate(buttonScreen, { data });
      }

    }
    return (
      <Card >
      <CardDetails>
        <CardTitles>{data.name}</CardTitles>
        <CardSubText>{sub_title}</CardSubText>
       {data.task_date && <CardSubText>Plannned on: {data.task_date}</CardSubText>}
       {isAmtApplicable&&data.outstanding_amt?<AmountDueButton onPress={() => handleDisplayPress({data})}>
          <FontAwesome name="rupee" size={20} color="red" />
          <AmountDue>{data.outstanding_amt} - DUE AMT</AmountDue>
        </AmountDueButton>:isAmtApplicable&&<AmountDues>NO OUTSTANDING</AmountDues>}
        {iconName1 && <AmountDueButton color={true} onPress={() =>   handleIconName1Press(data)}>
        <FontAwesome5 name="eye" size={25} color="#3c9df1" />
          <AmountDue color={true}>View Task Details</AmountDue>
        </AmountDueButton>}
      </CardDetails>
      <CardActions>
        <LogoImage source={{ uri: data.customer?data.customer.image: data.image }} />
        <CardButtons>
          <TaskButton onPress={()=>handleIconPress(data)} >
           {buttonTittle!='Product Interest'? <Icon name="checkmark-circle-outline" size={20} color="#3c9df1" />:<MaterialIcons name="security-update-good" size={24} color="#3c9df1" />}
           {buttonTittle!='Product Interest'? <TaskButtonText>Add Task</TaskButtonText>:<TaskButtonText>Update Task</TaskButtonText>}
          </TaskButton>
          <ViewTasksButton>
            <ViewTasksText onPress={()=>handleNavigation()}>{buttonTittle}</ViewTasksText>
          </ViewTasksButton>
          {/* <CircleButton imgUrl={assets.heart} 
                          handlePress={handleIconPress} data={data} icon={icon} right={10} top={10} /> */}
          {/* { iconName1 && (
              <CircleButton imgUrl={assets.heart} 
                          handlePress= {handleIconName1Press} data={data} icon={iconName1} right={0} bottom={5} />  
                )} */}
              { iconName2 && (
                <CircleButton imgUrl={assets.heart} 
                          handlePress={handleIconNavigation2} data={data} icon={iconName2} right={50} bottom={5} />  
                )}
                
                
        </CardButtons>
      </CardActions>
    </Card>
    );
};

export default CardItem


// return (
//   <View
//     style={{
//       backgroundColor: cardColour,
//       borderRadius: SIZES.font,
//       marginBottom: SIZES.extraLarge,
//       margin: SIZES.base,
//       ...SHADOWS.dark,
//     }}
//   >
//     <View
//       style={{
//         width: "100%",
//         height:80,
//       }}
//     >
//       <Image
//         source={{ uri: data.customer?data.customer.image: data.image }}
//         resizeMode="contain"
//         style={{
//           width: "40%",
//           height: "80%",
//           borderRadius: SIZES.font,
//           marginTop:10,
//           marginLeft:10,
//           borderTopRightRadius: SIZES.font,
//         }}
//       />

//       <CircleButton imgUrl={assets.heart} 
//                     handlePress={handleIconPress} data={data} icon={icon} right={10} top={10} />
//     </View>
        
//     {data.task_date && (<SubInfo task_date={data.task_date}/>)}    
    
//     <View style={{ width: "100%", padding: SIZES.font }}>
//       <CardTitle
//         title={data.name}
//         subTitle={sub_title}
//         titleSize={SIZES.extraLarge}
//         subTitleSize={SIZES.small}
//       />
      
//       <View
//         style={{
//           marginTop: SIZES.font,
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {isAmtApplicable && (<EthPrice price={data.outstanding_amt}
//                                        data={data}
//                                        handlePress={ handleDisplayPress }/>)}
//         { iconName1 && (
//         <CircleButton imgUrl={assets.heart} 
//                     handlePress= {handleIconName1Press} data={data} icon={iconName1} right={0} bottom={5} />  
//           )}
//         { iconName2 && (
//           <CircleButton imgUrl={assets.heart} 
//                     handlePress={handleIconNavigation2} data={data} icon={iconName2} right={50} bottom={5} />  
//           )}
        
//         <RectButton
//           minWidth={120}
//           fontSize={SIZES.font}
//           handlePress={handleNavigation}
//           title={buttonTittle}
//         />
        
//       </View>
//     </View>
//   </View>
// );
// };

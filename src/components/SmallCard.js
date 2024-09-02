import React from "react";
import { View, Alert } from "react-native";

import { SIZES, SHADOWS, assets } from "../constant_s";
import { SubInfo, CardTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";
import { colors } from "../Styles/appStyle";

const SmallCard = ({data, navigation, colour, title, subTitle, date, dateTitle, dateColour, 
                    buttonTittle, buttonScreen, iconName, iconName2, iconScreen, handleIcon, handleIcon2, text1, text2, 
                    callMode, name, task_name, handleInfo}) => {
    
    const cardColour = colour ? colour: colors.primary
    
    const handleNavigation = () => {
      // console.log('Navigation Screen name', buttonScreen, data);
      if (buttonScreen == 'UpdateInterest' || buttonScreen == 'UpdateTaskInterest'){
        navigation.navigate(buttonScreen,  
                            {task_id: data.task_id, variation_name_id: data.variation_name?data.variation_name.id: '', 
                             variation_value: data.variation_value, 
                             variation_name_1_id: data.variation_name_1?data.variation_name_1.id: '', variation_value_1: data.variation_value_1,
                             variation_name_2_id: data.variation_name_2?data.variation_name_2.id: '', variation_value_2: data.variation_value_2,
                             category_id: data.category?data.category.id:'',
                             due_date: data.due_date, product_info: data.product_info, id: data.id, 
                             call_mode: callMode? callMode:'', screen:buttonScreen,
                             name: name? name:'', task_name: task_name? task_name:''});
      }
      else if (buttonScreen == 'LeadTasks'){
        navigation.navigate('CustomerTasks',  {customer_id: '', name: data.name, lead_id: data.id, call_mode:'L' });
      }
      else if (buttonScreen == 'ViewOrderItem') {
        Alert.alert('Will be supported shortly !!!');

      }
      else {
        console.log('Not Valid screen call mode')
      }

    }

    const handleIconNavigation = () => {
        // console.log('Icon Screen name', iconScreen, data);
        if (iconScreen == 'ViewInterest' || iconScreen == 'ViewTaskInterest'){
            navigation.navigate(iconScreen, {data: data, call_mode: callMode, delete_mode: ''});
        } 
        else if (iconScreen == 'InvoiceSendMail') {
          Alert.alert('Not Enabled');
        }
        else {
          Alert.alert('Not Enabled');  
        }
  
      }
      
    const handleDeleteNavigation = () => {
        // console.log('Icon Screen name', iconScreen, data);
        if (iconScreen == 'ViewInterest' || iconScreen == 'ViewTaskInterest'){
            navigation.navigate(iconScreen, {data: data, call_mode: callMode, delete_mode: 'Y', screen:iconScreen});
        } 
        else if (iconScreen == 'InvoiceSendMail') {
            Alert.alert('Not Enabled')
        }
        else {
            Alert.alert('Not Enabled');
        }
  
      }
    
    return (
        <View
          style={{
            backgroundColor: cardColour,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark,
          }}
        >
          <View style={{
              width: "100%",
              height:50,
            }}>
          </View>    
          {date && (<SubInfo 
                    task_date={date}
                    dateColour={dateColour}
                    dateTitle={dateTitle}
                    data={data}
                    handlePress={handleInfo}/>)}    
          
          <View style={{ width: "100%", padding: SIZES.font }}>
            
            <CardTitle
              title={title}
              subTitle={subTitle}
              titleSize={SIZES.extraLarge}
              subTitleSize={SIZES.large}
            />
            
            <View
              style={{
                marginTop: SIZES.font,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CircleButton imgUrl={assets.heart} text={text1}
                          handlePress={iconScreen? handleIconNavigation: handleIcon} data={data} icon={iconName} right={5} bottom={5} />  
              
              { iconName2 && (
                <CircleButton imgUrl={assets.heart} text={text2}
                          handlePress={handleIcon2? handleIcon2: handleDeleteNavigation} data={data} icon={iconName2} right={82} bottom={5} />  
                )}
              <RectButton   
                minWidth={120}
                fontSize={SIZES.font}
                handlePress={handleNavigation}
                title={buttonTittle}
              />
              
            </View>
          </View>
        </View>
    );
};

export default SmallCard
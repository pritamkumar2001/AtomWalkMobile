import React from "react";
import { View, Image } from "react-native";

import { SIZES, SHADOWS, assets } from "../constant_s";
import { SubInfo, EthPrice, CardTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";
import { colors } from "../Styles/appStyle";

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
        <View
          style={{
            backgroundColor: cardColour,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark,
          }}
        >
          <View
            style={{
              width: "100%",
              height:80,
            }}
          >
            <Image
              source={{ uri: data.customer?data.customer.image: data.image }}
              resizeMode="contain"
              style={{
                width: "40%",
                height: "80%",
                borderRadius: SIZES.font,
                marginTop:10,
                marginLeft:10,
                borderTopRightRadius: SIZES.font,
              }}
            />
    
            <CircleButton imgUrl={assets.heart} 
                          handlePress={handleIconPress} data={data} icon={icon} right={10} top={10} />
          </View>
              
          {data.task_date && (<SubInfo task_date={data.task_date}/>)}    
          
          <View style={{ width: "100%", padding: SIZES.font }}>
            <CardTitle
              title={data.name}
              subTitle={sub_title}
              titleSize={SIZES.extraLarge}
              subTitleSize={SIZES.small}
            />
            
            <View
              style={{
                marginTop: SIZES.font,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isAmtApplicable && (<EthPrice price={data.outstanding_amt}
                                             data={data}
                                             handlePress={ handleDisplayPress }/>)}
              { iconName1 && (
              <CircleButton imgUrl={assets.heart} 
                          handlePress= {handleIconName1Press} data={data} icon={iconName1} right={0} bottom={5} />  
                )}
              { iconName2 && (
                <CircleButton imgUrl={assets.heart} 
                          handlePress={handleIconNavigation2} data={data} icon={iconName2} right={50} bottom={5} />  
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

export default CardItem
import React from "react";
import { View, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SubInfo, CardTitle } from "./SubInfo";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from "../Styles/appStyle";
import * as Linking from 'expo-linking';
import ToastMsg from "./ToastMsg";

const SIZES = {
  font: 14,
  base: 8,
  extraLarge: 24,
  large: 18,
};

const SHADOWS = {
  dark: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
};

const SmallCard = ({
  data,emails,Mobile,navigation, colour, title, subTitle, date, dateTitle, dateColour, 
  buttonTittle, buttonScreen, iconName, iconName2, iconScreen, handleIcon, handleIcon2, text1, text2, 
  callMode, name, task_name, handleInfo, logo, phone, email, whatsApp
}) => {
    const cardColour = colour ? colour : colors.primary;

    const handleNavigation = () => {
      if (buttonScreen === 'UpdateInterest' || buttonScreen === 'UpdateTaskInterest') {
        navigation.navigate(buttonScreen, {
          task_id: data.task_id,
          variation_name_id: data.variation_name ? data.variation_name.id : '',
          variation_value: data.variation_value,
          variation_name_1_id: data.variation_name_1 ? data.variation_name_1.id : '',
          variation_value_1: data.variation_value_1,
          variation_name_2_id: data.variation_name_2 ? data.variation_name_2.id : '',
          variation_value_2: data.variation_value_2,
          category_id: data.category ? data.category.id : '',
          lead_id: data.id,
          due_date: data.due_date,
          product_info: data.product_info,
          id: data.id,
          call_mode: callMode ? callMode : '',
          screen: buttonScreen,
          name: name ? name : '',
          task_name: task_name ? task_name : ''
        });
      } else if (buttonScreen === 'LeadTasks') {
        navigation.navigate('CustomerTasks', { customer_id: '', name: data.name, lead_id: data.id, call_mode: 'L' });
      } else if (buttonScreen === 'ViewOrderItem') {
        ToastMsg('Will be supported shortly !!!');
      } else {
        console.log('Not Valid screen call mode');
      }
    };

    const handleIconNavigation = () => {
      if (iconScreen === 'ViewInterest' || iconScreen === 'ViewTaskInterest') {
        navigation.navigate(iconScreen, { data: data, call_mode: callMode, delete_mode: '' });
      } else if (iconScreen === 'InvoiceSendMail') {
        Alert.alert('Not Enabled');
      } else {
        Alert.alert('Not Enabled');
      }
    };

    const handleDeleteNavigation = () => {
      if (iconScreen === 'ViewInterest' || iconScreen === 'ViewTaskInterest') {
        navigation.navigate(iconScreen, { data: data, call_mode: callMode, delete_mode: 'Y', screen: iconScreen });
      } else if (iconScreen === 'InvoiceSendMail') {
        Alert.alert('Not Enabled');
      } else {
        Alert.alert('Not Enabled');
      }
    };

    const openWhatsApp = (Mobile) => {
    if (Mobile){
         Linking.openURL(`https://wa.me/${Mobile}`);
    }
    else{
      ToastMsg('Please add Mobile Number in lead details');
    }
   
    };

    const openEmail = (emails) => {
      if(emails){
         Linking.openURL(`mailto:${emails}`);
      }
      else{
        ToastMsg('Please add Email Address in lead details');
      }
     
    };

    const openPhone = (Mobile) => {
      if(Mobile){
          Linking.openURL(`tel:${Mobile}`);
      }
      else{
        ToastMsg('Please add Mobile Number in lead details');
      }
    
    };

    return (
      <View style={[styles.cardContainer, { backgroundColor: cardColour }]}>
        
  
        {/* Info Section */}
        {date && (
          <View style={styles.infoContainer}>
            <SubInfo
              task_date={date}
              dateColour={dateColour}
              dateTitle={dateTitle}
              data={data}
              handlePress={handleInfo}
            />
          </View>
        )}
  
        {/* Content Section */}
        <View style={styles.contentContainer}>
          <CardTitle title={title} subTitle={subTitle} titleSize={20} subTitleSize={16} />
  
          {/* Button Section */}
          {buttonTittle !== 'UPDATE' ? (
            <View style={styles.buttonContainer}>
              <View style={styles.buttonContainers}>
              <TouchableOpacity style={[styles.rectButton,{width:"47%"}]} onPress={handleNavigation}>
                {!logo && <FontAwesome5 name="th-list" size={16} color="#aaa" />}
                <Text style={styles.buttonText}>{buttonTittle}</Text>
              </TouchableOpacity>
  
              {iconName2 && text2 && (
                <TouchableOpacity
                  style={styles.circleButton2}
                  onPress={handleIcon2 || handleDeleteNavigation}
                >
                  <FontAwesome5 name="th-list" size={16} color="#aaa" />
                  <Text style={styles.circleButtonText}> Product {text2}</Text>
                </TouchableOpacity>
              )}
              </View>
              {text1 && (
                <TouchableOpacity
                  style={styles.circleButton}
                  onPress={iconScreen ? handleIconNavigation : handleIcon}
                >
                  <Text style={styles.circleButtonTextWhite}>Add {text1}</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.buttonContainer}>
                  <View style={styles.buttonContainers}>
              <TouchableOpacity
                style={[styles.rectButton,{width:"47%"}]}
                onPress={iconScreen ? handleIconNavigation : handleIcon}
              >
                <FontAwesome5 name="eye" size={24} color="#3C9DF1" />
                <Text style={styles.buttonText}>Detail</Text>
              </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.rectButton, styles.deleteButton]}
                  onPress={handleIcon2 || handleDeleteNavigation}
                >
                  <FontAwesome5 name="trash" size={24} color="white" />
                  <Text style={styles.buttonTextWhite}>Delete</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.rectButton, styles.updateButton]}
                  onPress={handleNavigation}
                >
                  <MaterialIcons name="security-update-good" size={24} color="#fff" />
                  <Text style={styles.buttonTextWhite}>{buttonTittle}</Text>
                </TouchableOpacity>
              </View>
            // </View>
          )}
        </View>
        {/* Top Icons */}
        {buttonScreen !== 'ViewOrderItem'&&<View style={styles.topIconsContainer}>
          <TouchableOpacity onPress={() => openWhatsApp(Mobile)} style={styles.iconButton}>
            <FontAwesome5 name="whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openEmail(emails)} style={styles.iconButton}>
            <MaterialIcons name="email" size={24} color="#D44638" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openPhone(Mobile)} style={styles.iconButton}>
            <FontAwesome5 name="phone" size={24} color="#34B7F1" />
          </TouchableOpacity>
        </View>}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    cardContainer: {
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 10,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      overflow: 'hidden', // Prevent child elements from overflowing
    },
    topIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#F9F9F9',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    iconButton: {
      padding: 8,
      backgroundColor: '#FFF',
      borderRadius: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoContainer: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      // borderBottomWidth: 1,
      borderBottomColor: '#EAEAEA',
      flexShrink: 1, // Prevent breaking
      marginTop:5,
      marginRight:-33,
    },
    contentContainer: {
      padding: 16,
    },
    buttonContainer: {
      marginTop: 16,
      flexDirection: 'column', // Ensure buttons stack instead of overflowing
      gap: 10,
    },
    buttonContainers: {
      marginTop: 16,
      flexDirection: 'row',
      alignItems:"center",
      justifyContent:"space-between", // Ensure buttons stack instead of overflowing
      gap: 10,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'space-between',
    },
    rectButton: { 
      flexDirection: 'row',
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 24,
      backgroundColor: '#EAF4FF',
      borderWidth: 1,
      borderColor: '#CCE7FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    deleteButton: {
      backgroundColor: 'red',
      borderWidth: 0,
      width: "47%",
    },
    updateButton: {
      backgroundColor: '#3C9DF1',
      borderWidth: 0,
    },
    circleButton: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 24,
      backgroundColor: '#4491FE',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#007BFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    circleButton2: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#00BCD4',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#454545',
    },
    buttonTextWhite: {
      fontSize: 14,
      fontWeight: '500',
      color: '#FFF',
    },
    circleButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#454545',
    },
    circleButtonTextWhite: {
      fontSize: 14,
      fontWeight: '500',
      color: '#FFF',
    },
  });
  
  export default SmallCard;
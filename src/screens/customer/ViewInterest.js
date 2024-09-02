import { View, SafeAreaView, FlatList} from 'react-native';
import {React, useState} from 'react';
import { colors } from '../../Styles/appStyle';
import  Loader  from '../../components/Loader';
import DetailCard from "../../components/DetailCard";
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header'; 
import { updateTaskInterest, } from '../../services/productServices';

import ToastMsg from '../../components/ToastMsg';


const ViewInterest = ({route, navigation}) => {
    // console.log('PARAMS', route.params)
    const [loading, setLoading] = useState(false);
    const [callMode, setCallMode] = useState(route.params.call_mode? route.params.call_mode: '')
    const data = route.params.data
    const delete_mode = route.params.delete_mode
    const screen = route.params.screen 

    const onBackPressed = () => {
        navigation.pop();
    }
    
    const dleteTaskInterest = () => {
        setLoading(true);
        
        updateTaskInterest(data, 'Y').then((res) => {
            setLoading(false);
            ToastMsg('Product Interest Updated');
            if (screen == 'ViewTaskInterest'){
                navigation.pop('TaskSreen');
            } else if (callMode == 'L'){
                navigation.navigate('LeadScreen');
            } else{
                navigation.navigate('CustomerScreen');
            }
            // navigation.navigate('Task');
            })
            .catch((error) => {
                setLoading(false);
                
                // console.log('Update ERROR', {error}, error.message);
                if (error.response.data.detail){
                    error.message = error.response.data.detail;
                    ToastMsg(error.response.data.detail, 'ERROR', 'error');
                }else{
                    ToastMsg('Product Interest Updated Failed', 'ERROR', 'error');
                }
                // Alert.alert('Error', 'Something went wrong');
                
            });
        
    };

    
  return (
    <SafeAreaView style={{ flex: 1,  }}>
      <Loader visible={loading} /> 
      <Header 
            label='Product Interest'
            image=''
            icon='arrow-with-circle-left'
            onPress={onBackPressed}
            subTitle={data.variation_name.name}
            
      />
        <DetailCard colour={colors.lightgreen}
                    title={data.variation_name?data.variation_name.name + ' - ' + data.variation_value: '' }
                    subTitle={data.category? 'Category :' + data.category.name:''}
                    date={data.due_date}
                    dateTitle='Due Date'
                    status={(data.status == 'N')? 'NOT AVIALABLE': 'AVAILABLE'}
                    subInfo={'Additional Info : ' +  data.product_info}
        />
        
      { delete_mode && ( 
      <CustomButton 
            onPress={dleteTaskInterest} 
            text={'Delete Interest'} 
            bgColor={colors.red}
            icon='delete'
        /> 
        )}
    </SafeAreaView>
  );
};

export default ViewInterest
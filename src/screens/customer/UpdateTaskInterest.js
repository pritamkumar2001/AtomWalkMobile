import { View, SafeAreaView, ScrollView, Keyboard, Text } from 'react-native';
import {React, useState, useEffect} from 'react';
import { colors } from '../../Styles/appStyle';
import  Loader  from '../../components/Loader';
import NewButton from "../../components/NewButton";
import TxtInput from '../../components/TxtInput';
import DropDown from '../../components/DropDown';
import DateInput from '../../components/DateInput';
import Header from '../../components/Header'; 
import { updateTaskInterest, getProductCategoryList, getVariationNameList} from '../../services/productServices';

import ToastMsg from '../../components/ToastMsg';


const UpdateTaskInterest = ({route, navigation}) => {
    // console.log('PARAMS', route.params)
    const [inputs, setInputs] = useState({
        id: route.params.id, 
        task_id: route.params.task_id,
        customer_id: route.params.customer_id,
        lead_id: route.params.lead_id,
        category_id: route.params.category_id,
        variation_name_id: route.params.variation_name_id,
        variation_value: route.params.variation_value,
        variation_name_1_id: route.params.variation_name_1_id? route.params.variation_name_1_id:'',
        variation_value_1: route.params.variation_value_1? route.params.variation_value_1:'',
        variation_name_2_id: route.params.variation_name_2_id? route.params.variation_name_2_id:'',
        variation_value_2: route.params.variation_value_2? route.params.variation_value_2:'',
        product_info: route.params.product_info,
        due_date: route.params.due_date,
        call_mode: route.params.task_id? 'T': route.params.customer_id? 'C':'L',
      });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [variationNames, setVariationNames] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [callMode, setCallMode] = useState(route.params.call_mode? route.params.call_mode: '')
    const [screen, setScreen] = useState(route.params.screen? route.params.screen: '')
    const subTitle = (route.params.call_mode=='L')? 'LEAD - '  + route.params.name : 'CUSTOMER: ' + route.params.name 
    const pageTitle =  route.params.task_name? 'Interest For Task: ' + route.params.task_name : '' 
  
    useEffect(() => {
        setLoading(true)
        getVariationNameList().then((response) => {
            var count = Object.keys(response.data).length;
            let variationList = [];
            for (var i = 0; i < count; i++) {
                variationList.push({
                value: response.data[i].id,
                label: response.data[i].name,
                });
            }
            setVariationNames(variationList);
            
        })
        .catch((error) => {
            console.log('error', error);
        });

        getProductCategoryList().then((response) => {
            var count = Object.keys(response.data).length;
            let categoryList = [];
            for (var i = 0; i < count; i++) {
                categoryList.push({
                value: response.data[i].id,
                label: response.data[i].name,
                });
            }
            setCategoryData(categoryList);
            
        })

        .catch((error) => {
            console.log('error', error);
        });

        setLoading(false);
    }, []);

    const onSelectCategory = (item) => {
        handleOnchange(item, 'category_id')
    }
    
    const onSelectVariationName = (item) => {
        handleOnchange(item, 'variation_name_id')
    }
    
    const onSelectVariationName_1 = (item) => {
        handleOnchange(item, 'variation_name_1_id')
    }
    
    const onSelectVariationName_2 = (item) => {
        handleOnchange(item, 'variation_name_2_id')
    }
    
    const onSelectDate = (date) => {
        handleOnchange(date, 'due_date')
    }

    const onBackPressed = () => {
        navigation.pop();
    }
    
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        
        if (!inputs.category_id) {
            handleError('Please select a product category', 'category_id');
            isValid = false;
          }
        
        if (!inputs.variation_name_id) {
            handleError('Please select a variation name', 'variation_name_id');
            isValid = false;
          }
        
        if (!inputs.variation_value) {
            handleError('Please enter variation value', 'variation_value');
            isValid = false;
          }
        

        if (isValid){
            handleTaskInterest()
        }
      
    };

    const handleTaskInterest = () => {
        setLoading(true);
        
        updateTaskInterest(inputs).then((res) => {
            setLoading(false);
            ToastMsg(route.params.task_name?'Updated Interest for :' + route.params.task_name: 'Product Interest Updated' );
            if (screen == 'UpdateTaskInterest'){
                navigation.push('TaskInterest', {task_id: inputs.task_id, screen: 'TaskInterest',
                    name: route.params.name? route.params.name: '', 
                    task_name: route.params.task_name? route.params.task_name: '',
                    call_mode: callMode });
            } else if (callMode == 'L'){
                navigation.navigate('LeadScreen');
            } else {
                navigation.navigate('CustomerScreen');
            }
            
            })
            .catch((error) => {
                setLoading(false);
                
                if (error.response.data.detail){
                    error.message = error.response.data.detail;
                    ToastMsg(error.response.data.detail, 'ERROR', 'error');
                }else{
                    ToastMsg('Product Interest Updated Failed', 'ERROR', 'error');
                }
                // Alert.alert('Error', 'Something went wrong');
                
            });
        
    };


    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

  return (
    <SafeAreaView style={{backgroundColor: colors.primary, flex: 1}}>
      <Loader visible={loading} /> 
      <Header 
            label={inputs.id? 'Update Interest': 'Create Interest'}
            image=''
            icon='arrow-left'
            onPress={onBackPressed}
            subTitle={subTitle}
      /> 
      {pageTitle && (
        <Text style={{fontSize: 15, paddingLeft:20, color:colors.navyblue, fontStyle:'italic'}}>{pageTitle} </Text>
      )}

      <ScrollView contentContainerStyle={{paddingTop: pageTitle? 10:0, paddingHorizontal: 10}}>
        <>
        <View style={{marginVertical: 10}}>
            <DropDown 
            inputvalue={inputs.category_id}
            inputlabel='Product Category'
            placeholder="Category"
            data={categoryData}
            onSelect={onSelectCategory}  
            />
            { variationNames && (
            <View style={{marginHorizontal: 15, padding: 15,  marginVertical:5, 
                          backgroundColor: colors.grey, borderRadius:10}}>
            <DropDown 
            inputvalue={inputs.variation_name_id}
            placeholder="Variation Name "
            data={variationNames}
            onSelect={onSelectVariationName}  
            />
            <TxtInput
                onChangeText={text => handleOnchange(text, 'variation_value')}
                onFocus={() => handleError(null, 'variation_value')}
                iconName="order-bool-ascending-variant"
                label=""
                placeholder="Enter Varition Value"
                defaultValue={inputs.variation_value}
                error={errors.variation_value}
            />
            <DropDown 
            inputvalue={inputs.variation_name_1_id}
            placeholder="Variation Name "
            data={variationNames}
            onSelect={onSelectVariationName_1}  
            />
            <TxtInput
                onChangeText={text => handleOnchange(text, 'variation_value_1')}
                onFocus={() => handleError(null, 'variation_value_1')}
                iconName="order-bool-ascending-variant"
                label=""
                placeholder="Enter Varition Value"
                defaultValue={inputs.variation_value_1}
                error={errors.variation_value_1}
            />
            <DropDown 
            inputvalue={inputs.variation_name_2_id}
            placeholder="Variation Name "
            data={variationNames}
            onSelect={onSelectVariationName_2}  
            />
            <TxtInput
                onChangeText={text => handleOnchange(text, 'variation_value_2')}
                onFocus={() => handleError(null, 'variation_value_2')}
                iconName="order-bool-ascending-variant"
                label=""
                placeholder="Enter Varition Value"
                defaultValue={inputs.variation_value_2}
                error={errors.variation_value_2}
            />
            </View>
            )}
            <TxtInput
                onChangeText={text => handleOnchange(text, 'product_info')}
                onFocus={() => handleError(null, 'product_info')}
                iconName="information"
                label="Additional Information"
                placeholder="Additional info if any.."
                defaultValue={inputs.product_info}
                error={errors.product_info}
            />
            
            <DateInput 
            label="Due Date"
            iconName='calendar-account'
            date={inputs.due_date}
            onSelectDate={onSelectDate}
            error=''
            />
            
            <NewButton title={inputs.id?'Update Interest': 'Add Interest'}
                       icon={inputs.id?'edit':'add-box'}  
                       onPress={validate} />
        </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateTaskInterest
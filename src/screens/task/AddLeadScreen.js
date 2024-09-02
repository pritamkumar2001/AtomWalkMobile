import { View, SafeAreaView, ScrollView, Text, Keyboard, Alert } from 'react-native'
import {React, useState, useEffect} from 'react'
import { CommonActions } from '@react-navigation/native';
import { colors } from '../../Styles/appStyle'
import  Loader  from '../../components/Loader'
import TxtInput  from '../../components/TxtInput'
import NewButton from "../../components/NewButton"
import DropDown from '../../components/DropDown'
import DateInput from '../../components/DateInput'
import CheckBoxInput from '../../components/CheckBoxInput'
import Header from '../../components/Header'; 
import { addLead, getTaskTypeList } from '../../services/productServices'
import ToastMsg from '../../components/ToastMsg';
  
const AddLeadScreen = ({route, navigation}) => {
    const [inputs, setInputs] = useState({
        name: '',
        company_name: '',
        task_name: route.params.task,
        mobile_number: '',
        email_id: '',
        add_task: route.params.task? 'Y': 'N',
        task_type: '',
        task_date: '',

      });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [taskTypeList, setTaskTypeList] = useState([]);
    // const task = props.route.params.task;
    // console.log(inputs.add_task)
    
    useEffect(() => {
        setLoading(true)
        getTaskTypeList().then((response) => {
            var count = Object.keys(response.data).length;
            let dataList = [];
            for (var i = 0; i < count; i++) {
                dataList.push({
                    value: response.data[i][0],
                    label: response.data[i][1],
                });
            }
            // console.log(dataList)
            setTaskTypeList(dataList);
            
        })
        .catch((error) => {
            console.log('error', error)
        });

        setLoading(false);
    }, []);

    const onSelect = (item) => {
        handleOnchange(item, 'task_type')
     }
    
     const onSelectDate = (date) => {
        handleOnchange(date, 'task_date')
     }
     
     const onCheckAddTask = (checked) => {
        if (checked) {
            handleOnchange('Y', 'add_task');
        } else{
            handleOnchange('N', 'add_task');
        }
     }
     

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email_id && !inputs.mobile_number) {
            handleError('Please input either Email or Mobile No', 'mobile_number');
            isValid = false;
        } 
        else if (inputs.email_id && !inputs.email_id.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email_id');
            isValid = false;
        }

        if (!inputs.name) {
            handleError('Please enter a Lead name', 'name');
            isValid = false;
          }
      
        if (inputs.add_task == 'Y'){  
            if (!inputs.task_name) {
                handleError('Please input Todo', 'task_name');
                isValid = false;
          }
        }  
      
        if (isValid){
            handleLeadData()
        }  

    };

    const onBackPressed = () => {
        navigation.pop();
    }

    const handleLeadData = () => {
        setLoading(true);
        
        addLead(inputs).then((res) => {
            setLoading(false);
            ToastMsg('Lead Added Successfully');
            // delete todo
            navigation.dispatch(CommonActions.goBack())
            // navigation.navigate('Task');
            })
            .catch((error) => {
                setLoading(false);
                // console.log('Add Lead ERROR', {error}, error.message);
                if (error.response.data.detail){
                    error.message = error.response.data.detail;
                    ToastMsg(error.response.data.detail, 'ERROR', 'error');
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
            label='Add Lead'
            image=''
            icon='arrow-left'
            onPress={onBackPressed}
      /> 
       
      <ScrollView contentContainerStyle={{paddingTop: 5, paddingHorizontal: 10}}>
        <>
        <View style={{marginVertical: 10}}>
            <TxtInput
                onChangeText={text => handleOnchange(text, 'name')}
                onFocus={() => handleError(null, 'name')}
                iconName="account-outline"
                label="Lead/ Opportunity Details"
                placeholder="Enter Lead name"
                error={errors.name}
            />
            <TxtInput
                onChangeText={text => handleOnchange(text, 'company_name')}
                onFocus={() => handleError(null, 'company_name')}
                iconName="account-multiple"
                label=""
                placeholder="Enter company name"
                error={errors.name}
            />
            <TxtInput
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'mobile_number')}
                onFocus={() => handleError(null, 'mobile_number')}
                iconName="phone-outline"
                label="Mobile No"
                placeholder="Enter party mobile no"
                error={errors.mobile_number}
                
            />
            <TxtInput
                onChangeText={text => handleOnchange(text, 'email_id')}
                onFocus={() => handleError(null, 'email_id')}
                iconName="email-outline"
                label="Email"
                placeholder="Enter party email id"
                error={errors.email_id}
            />
            <CheckBoxInput 
            label=''
            title="Add a Task for Lead?"
            onCheckAddTask={onCheckAddTask}
            checked={inputs.add_task == 'Y'?true:false}
            error=''
            />
            <TxtInput
                onChangeText={text => handleOnchange(text, 'task_name')}
                onFocus={() => handleError(null, 'task_name')}
                iconName="check-circle"
                label="Task Detail"
                placeholder="Enter Task name"
                error={errors.task_name}
                defaultValue={inputs.task_name}
            />
            <DropDown 
            inputvalue={inputs.task_type}
            inputlabel=""
            data={taskTypeList}
            onSelect={onSelect}  
            />
            <DateInput 
            label=""
            iconName='calendar-account'
            taskDate={inputs.task_date}
            onSelectDate={onSelectDate}
            error=''
            />
            
            <NewButton title="Add Lead" onPress={validate} />
        </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddLeadScreen
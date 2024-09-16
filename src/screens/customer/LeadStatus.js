import { View, SafeAreaView, ScrollView, Text, Keyboard, Alert } from 'react-native'
import {React, useState, useEffect} from 'react'
import { colors } from '../../Styles/appStyle'
import  Loader  from '../../components/Loader'
import TxtInput  from '../../components/TxtInput'
import NewButton from "../../components/NewButton"
import DropDown from '../../components/DropDown'
import DateInput from '../../components/DateInput'
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header'; 
import { updateLeadStatus, getLeadStatusList } from '../../services/productServices'
import ToastMsg from '../../components/ToastMsg';
import { SIZES } from '../../constant_s';

const LeadStatus = ({route, navigation}) => {
    // console.log(route.params)
    const [inputs, setInputs] = useState({
        lead_id: route.params.data.id,
        status: route.params.data.status == 'O'?'A':'',
        curr_status: route.params.data.status,
        status_date: '',
        remarks: ['Q', 'O'].includes(route.params.data.status)?route.params.data.remarks:'',
        po_amt: route.params.data.payment_received,
        po_ref_num: route.params.data.po_ref_num,
        email_id: route.params.data.email_id
      });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [leadStatusList, setLeadStatusList] = useState([]);
    const [data, setData] = useState(route.params.data);
    const [emailRequied, setEmailRequired] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        getLeadStatusList().then((response) => {
            var count = Object.keys(response.data).length;
            let statusList = [];
            for (var i = 0; i < count; i++) {
                if (response.data[i][0] != 'O' && response.data[i][0] != route.params.data.status) {
                    statusList.push({
                    value: response.data[i][0],
                    label: response.data[i][1],
                    });
                }
            }
            // console.log(statusList)
            setLeadStatusList(statusList);
            
        })
        .catch((error) => {
            console.log('error', error);
        });

        setLoading(false);
    }, []);

    const onStatusSelect = (item) => {
        handleOnchange(item, 'status')
     }
    
    const onSelectDate = (date) => {
        handleOnchange(date, 'status_date')
    }
    
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
            
        if (inputs.remarks.length > 100){
            var error_msg = `Max length allowed is 100. Entered length [${inputs.remarks.length}]`;
            handleError(error_msg, 'remarks');
            isValid = false;
        }
        if (inputs.po_ref_num.length > 50){
            var error_msg = `Max length allowed is 50 [entered length ${inputs.po_ref_num.length}]`;
            handleError(error_msg, 'po_ref_num');
            isValid = false;
        }
        if (data.status != 'O'){
            if (inputs.curr_status == 'Q')
            {
                if (!/^\d+(\.\d+)?$/.test(inputs.po_amt)) {
                    handleError('Please enter only number 0-9', 'po_amt');
                    isValid = false;
                }
            } else {
                if (!inputs.status) {
                    handleError('Please Select a Lead Status', 'status');
                    isValid = false;
                }
                if (inputs.status == data.status) {
                    handleError('Current Lead Status and updated lead status are same', 'status');
                    isValid = false;
                }
                
                if (inputs.status == 'P' || inputs.status == 'S' || inputs.status == 'D' || inputs.status == 'Q' ) {
                    if (!inputs.status_date) {
                        handleError('Please enter status date', 'status_date');
                        isValid = false;
                    }
                }
                if (inputs.status_date){
                    var parts = inputs.status_date.split('-');
                    var day = parseInt(parts[0], 10);
                    var month = parseInt(parts[1], 10) - 1; // Month is zero-based (0-11)
                    var year = parseInt(parts[2], 10);
                    
                    var statusDate = new Date(year, month, day);
                    var today = new Date();
                    // Remove the time component from the date objects
                    statusDate.setHours(0, 0, 0, 0);
                    today.setHours(0, 0, 0, 0);
                    // console.log(inputs.status_date, statusDate, today)
                    if (statusDate > today)
                    {
                        handleError('Status date is greater that today', 'status_date');
                        isValid = false;
                    }
                }
                if (inputs.status == 'Q')
                {
                    if (!inputs.email_id) {
                        setEmailRequired(true)
                        handleError('Please enter Customer mail id', 'email_id');
                        isValid = false;
                    }
                }
            }
        } else {
            if (!/^\d+(\.\d+)?$/.test(inputs.po_amt)) {
                handleError('Please enter only number 0-9', 'po_amt');
                isValid = false;
            }
        }

        
        if (isValid){
            // console.log('Validation Success', inputs.status, inputs.curr_status, inputs.lead_id)
            handleLeadStatus()
        }  

    };

    const onBackPressed = () => {
        navigation.pop();
    }

    const handleLeadStatus = () => {
        setLoading(true);
        
        updateLeadStatus(inputs).then((res) => {
            setLoading(false);
            ToastMsg('Lead status updated successfully');
            // delete todo
            navigation.push('LeadScreen');
            // navigation.navigate('Task');
            })
            .catch((error) => {
                setLoading(false);
                console.log('Lead status ERROR', error.message);
                if (error.response.data.detail){
                    error.message = error.response.data.detail;
                    ToastMsg(error.response.data.detail, 'ERROR', 'error');
                }
                else
                {
                    ToastMsg('Status Update Failed. Pl try in browser mode.', error.message, 'error');   
                }
                // Alert.alert('Error', 'Something went wrong');
                
            });
        
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
        setErrors(prevState => ({...prevState, [input]: ''}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Loader visible={loading} /> 
      <Header 
            label='Lead Status Update'
            image=''
            icon='arrow-left'
            onPress={onBackPressed}
      /> 
       
      <ScrollView contentContainerStyle={{paddingTop: 5, paddingHorizontal: 10}}>
        <>
        <Text style={{fontWeight: 'bold', fontSize:SIZES.large, marginBottom: 5}}>Lead Name : {data.name}</Text>
        {data.company_name && (
            <Text style={{fontWeight: 'bold', fontSize:SIZES.large, marginBottom: 5}}>Company : {data.company_name}</Text>
        )}    
        
        <Text style={{fontWeight: 'bold', fontSize:SIZES.large}}>Current Status : {route.params.data.status_display}</Text>
        <View style={{marginVertical: 10}}>
        {data.status == 'O' && (
            <>
                <TxtInput
                onChangeText={text => handleOnchange(text, 'po_amt')}
                onFocus={() => handleError(null, 'po_amt')}
                iconName="cash-check"
                label="Deal Size/ Opportunity Amount"
                placeholder="Enter Deal Size "
                error={errors.po_amt}
                keyboardType="numeric"
                defaultValue={inputs.po_amt}
                />
                <TxtInput
                onChangeText={text => handleOnchange(text, 'remarks')}
                onFocus={() => handleError(null, 'remarks')}
                iconName="note-edit-outline"
                label="Remarks"
                placeholder="Enter remarks"
                error={errors.remarks}
                defaultValue={inputs.remarks}
                />
                <CustomButton onPress={validate} 
                              text={'Update - Prospects & Active'} 
                              bgColor={colors.green} />
            </>    
            
        )}
        {data.status == 'Q' && (
            <>
                <TxtInput
                onChangeText={text => handleOnchange(text, 'po_amt')}
                onFocus={() => handleError(null, 'po_amt')}
                iconName="cash-check"
                label="PO Amount"
                placeholder="Enter po amount "
                error={errors.po_amt}
                keyboardType="numeric"
                defaultValue={inputs.po_amt}
                />
                <TxtInput
                onChangeText={text => handleOnchange(text, 'po_ref_num')}
                onFocus={() => handleError(null, 'po_ref_num')}
                iconName="file-document"
                label="PO Ref Num"
                placeholder="Enter PO details"
                error={errors.po_ref_num}
                defaultValue={inputs.po_ref_num}
                />
        
                <TxtInput
                onChangeText={text => handleOnchange(text, 'remarks')}
                onFocus={() => handleError(null, 'remarks')}
                iconName="note-edit-outline"
                label="Remarks"
                placeholder="Enter remarks"
                error={errors.remarks}
                defaultValue={inputs.remarks}
                />
        
            
                <CustomButton onPress={validate} 
                              text={'Update PO Details'} 
                              bgColor={colors.green} />
            </>     
        )}
        {data.status != 'O' && data.status != 'Q' && (
            <>        
            <DropDown 
            inputvalue={inputs.status}
            inputlabel="Select New Status"
            data={leadStatusList}
            onSelect={onStatusSelect}
            error={errors.status}
            />
            <DateInput 
            label="Status Date"
            iconName='calendar-account'
            taskDate={inputs.status_date}
            onSelectDate={onSelectDate}
            error={errors.status_date}
            />
            {emailRequied && (
            <TxtInput
                onChangeText={text => handleOnchange(text, 'email_id')}
                onFocus={() => handleError(null, 'email_id')}
                iconName="email-outline"
                label="Email"
                placeholder="Enter customer email id"
                error={errors.email_id}
                defaultValue={inputs.email_id}
            />
            )}
            <TxtInput
                onChangeText={text => handleOnchange(text, 'remarks')}
                onFocus={() => handleError(null, 'remarks')}
                iconName="note-edit-outline"
                label="Remarks"
                placeholder="Enter remarks"
                error={errors.remarks}
                defaultValue={inputs.remarks}
            />
            
            <NewButton title="Update Status" onPress={validate} />
            </>
        )}

            
        </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeadStatus
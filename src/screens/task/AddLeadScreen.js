import { View, SafeAreaView, ScrollView, Text, Keyboard, Alert } from 'react-native'
import {React, useState, useEffect} from 'react'
import { CommonActions } from '@react-navigation/native';
import { colors } from '../../Styles/appStyle'
import  Loader  from '../../components/Loader'
import TxtInput  from '../../components/TxtInput'
import NewButton from "../../components/NewButton"
import DropDown2 from '../../components/DropDown'
import DateInput from '../../components/DateInput'
import CheckBoxInput from '../../components/CheckBoxInput'
import Header from '../../components/Header'; 
import { addLead, getTaskTypeList, imagetotext } from '../../services/productServices'
import ToastMsg from '../../components/ToastMsg';
import * as ImagePicker from "expo-image-picker";
  
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
    const [dropDownData,setDropDownData]=useState([]);
    const companyKeywords = ["Enterprise", "Solution", "Consultants", "Pvt.Ltd.", "Pvt.Ltd", "Technology", "Inc.", "LLC", "Corp", "Limited"];
    const scan = route.params.scan;
    console.log(taskTypeList,"hfbrhrfrf")
    useEffect(()=>{
   if(scan){
    onBackPressed()
}
    },[scan])
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
     const isCompanyName = (line) => {
        // Check if any keyword is present in the line (case-insensitive)
        return companyKeywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()));
    };
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

    };// Function to perform OCR on the captured image and extract text
    const performOCR = (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image_file', {
          uri: file.uri,
          name: file.fileName,
          type: file.mimeType,
        });
        imagetotext(formData).then((res) => {
            setLoading(false);
            ToastMsg('Lead Added Successfully');
            const extractedText = res?.data?.text.filter(item => item.trim() !== "").join("\n");

                    // Assuming OCR returns a single block of text, we can process it
                    if (extractedText) {
                        // Call function to map the text to the form fields
                        mapExtractedTextToFields(extractedText);
                        const options = extractedText.split("\n").map((item) => ({
                            label: item.trim(),
                            value: item.trim()
                        }));
                        setDropDownData(options)
                    }
            })
            .catch((error) => {
                setLoading(false);
                console.log('Add Lead ERROR', {error}, error.message);
                if (error.response.data.detail){
                    error.message = error.response.data.detail;
                    ToastMsg(error.response.data.detail, 'ERROR', 'error');
                }
            });
        // let myHeaders = new Headers();
        // myHeaders.append("apikey", "FEmvQr5uj99ZUvk3essuYb6P5lLLBS20"); // Use your API key here
        // myHeaders.append("Content-Type", "multipart/form-data");
        // let requestOptions = {
        //     method: "POST",
        //     redirect: "follow",
        //     headers: myHeaders,
        //     body: file,
        // };
        // // Send a POST request to the OCR API
        // fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         const extractedText = result["all_text"];
        //         console.log(extractedText,"hfbhfrhferufeuf")
        //         if (extractedText) {
        //             // Call function to map the text to the form fields
        //             mapExtractedTextToFields(extractedText);
        //             const options = extractedText.split("\n").map((item) => ({
        //                 label: item.trim(),
        //                 value: item.trim()
        //             }));
        //             setDropDownData(options)
        //         }
        //     })
        //     .catch((error) => console.log("error", error));
    };
    
    // Function to map extracted text to form fields
    const mapExtractedTextToFields = (text) => {
        // Parse the extracted text to find name, email, and mobile
        // This is a simple approach; actual parsing may require custom logic
        const lines = text.split("\n");
        // console.log(lines,"ufuhfhru----------->")
        let name = "";
        let mobile_number = "";
        let email_id = "";
        let company_name = "";
        lines.forEach(line => {
            // Detect email
            if (line.includes("@")) {
                email_id = line.trim();
            }
            // Detect mobile number (simple regex for mobile numbers)
            else if (line.match(/^\d{9,12}$/)) {
                mobile_number = line.trim();
            } else if (line.match(/(?:\+\d{1,3}-)?\d{5} ?\d{5}/)) {
                mobile_number = line.replace(/\D/g, '').trim(); // Remove non-digit characters
            
            } else if (!name) {
                // Set the first non-empty line as the name
                name = line.trim();
            }
            else if  (isCompanyName(line)) {
                company_name = line.trim();
            } 
        });
    
        // Update the inputs with extracted data
        setInputs(prevState => ({
            ...prevState,
            name: name,
            mobile_number: mobile_number,
            email_id: email_id,
            company_name:company_name,
        }));
    };
    

    const onBackPressed = async () => {
        // Open the camera and capture a visiting card picture
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            allowsMultipleSelection: false,
        });
    
        // Check if the image was captured successfully
        if (!result.canceled) {
            // Perform OCR on the captured image
            performOCR(result.assets[0]);
    
            // Set the image URI (if needed)
            setImage(result.assets[0].uri);
        } else {
            // If no image is captured, go back to the previous screen
            navigation.pop();
        }
    };
    

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
    // console.log(inputs,"data--------->")
  

    const handleSelect = (value, field) => {
        setInputs((prevState) => ({ ...prevState, [field]: value }));
    };
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Loader visible={loading} /> 
      <Header 
            label='Add Lead'
            image=''
            icon='scan1'
            onPress={onBackPressed}
      /> 
       
      <ScrollView contentContainerStyle={{paddingTop: 5, paddingHorizontal: 10}}>
        <>
        <View style={{marginVertical: 10}}>
       {dropDownData.length > 0 ?<DropDown2
                    inputvalue={inputs.name}
                    inputlabel="Enter Lead name"
                    data={dropDownData}
                    onSelect={onSelect}  
                />
           : <TxtInput
                onChangeText={text => handleOnchange(text, 'name')}
                onFocus={() => handleError(null, 'name')}
                iconName="account-outline"
                label="Lead/ Opportunity Details"
                placeholder="Enter Lead name"
                error={errors.name}
                defaultValue={inputs.name}
            />}
            <TxtInput
                onChangeText={text => handleOnchange(text, 'company_name')}
                onFocus={() => handleError(null, 'company_name')}
                iconName="account-multiple"
                label=""
                placeholder="Enter company name"
                error={errors.name}
                defaultValue={inputs.company_name}
            />
            <TxtInput
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'mobile_number')}
                onFocus={() => handleError(null, 'mobile_number')}
                iconName="phone-outline"
                label="Mobile No"
                placeholder="Enter party mobile no"
                error={errors.mobile_number}
                defaultValue={inputs.mobile_number}
            />
            <TxtInput
                onChangeText={text => handleOnchange(text, 'email_id')}
                onFocus={() => handleError(null, 'email_id')}
                iconName="email-outline"
                label="Email"
                placeholder="Enter party email id"
                error={errors.email_id}
                defaultValue={inputs.email_id}
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
            <DropDown2 
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
import React, {createContext, useState, useEffect} from 'react';
import { publicAxiosRequest } from "../services/httpMethod";
import { loginURL } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCompanyInfo} from '../services/authServices'
import { Alert } from 'react-native'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [dbName, setDbName] = useState(null);
    const [error, setError] = useState('');
    const [refs,setRefs]=useState(1);

    const login = async(username, password) => {
        setIsLoading(true);
        let isError = false;

        // console.log(username, loginURL);
        try {
            const res = await publicAxiosRequest.post(loginURL, {
                username: username,
                password: password,
            });
            const userToken = res.data['key']
            // console.log('After call', res.data, userToken)
            AsyncStorage.setItem('userToken', userToken);
            setUserToken(userToken)
            setError('')
            // console.log('TOKEN', getData())
        } catch (err) {
            isError = true
            // console.log('Login', err)
            setError(`Unable to Authenticate : ${err}`)
            Alert.alert(
                '❌ Incorrect E-mail ID or password', // Adding a cross icon using emoji
                '', // Empty message (if needed)
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: true }
              );
        }

        if (!isError){
            getCompanyInfo().then((res) => {
                let comanyInfo = res.data; 
                AsyncStorage.setItem('companyInfo', JSON.stringify(comanyInfo));
                let db_name = comanyInfo.db_name.substr(3)
                AsyncStorage.setItem('dbName', db_name);
                setCompanyInfo(comanyInfo);
                setDbName(db_name);
                // console.log(res.data.db_name, db_name);
                
            })
            .catch((error) => {
                    console.log('ERROR', {error}, error.message);
            });
        }
        
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('companyInfo');
        AsyncStorage.removeItem('dbName');
        
        setUserToken(null);
        setCompanyInfo([]);
        setDbName(null);
        setIsLoading(false);
        setError('')
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
                
            let dbName = await AsyncStorage.getItem('dbName');
            setDbName(dbName);
            
            let companyInfo = await AsyncStorage.getItem('companyInfo');
            
            companyInfo = JSON.parse(companyInfo);
            // console.log('isLoggedin',companyInfo);
            if (companyInfo){
                setCompanyInfo(companyInfo);
            }
            setError('');
            setIsLoading(false);
        } catch (e) {
            console.log(`Logged In Error ${e}`);
            setError(`Logged In Error ${e}`)
        }
    }
    
    useEffect( () => {
        isLoggedIn();
    }, []);

    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, companyInfo, dbName, error,setRefs,refs}}>
            {children}
        </AuthContext.Provider>
    );
}
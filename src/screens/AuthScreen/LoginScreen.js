import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Keyboard,
  ScrollView,
  Text,
  Alert,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../../assets/images/Atom_walk_logo.jpg";
import CustomButton from "../../components/CustomButton";
import TxtInput from "../../components/TxtInput";
import { AuthContext } from "../../context/AuthContext";
import { colors } from "../../Styles/appStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthScreen from "../../navigation/AuthScreen";



const LoginScreen = () => {
  const { login, isLoading } = useContext(AuthContext);
  const { height } = useWindowDimensions();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [userPin, setUserPin] = useState(null);
  const [showLogin,setshowLogin]=useState(true);
  const onForgotPasswordPressed = () => {
    setshowLogin(false);
  };
  useEffect(() => {
      const fetchUserPin = async () => {
          const storedPin = await AsyncStorage.getItem('userPin');
          setUserPin(storedPin); // storedPin will be `null` if no value is found
      };
      fetchUserPin();
  }, []);
  const userLogin = (finalUsername) => {
    // console.log("Sign In", finalUsername, inputs.password);
    login(finalUsername, inputs.password);
  };

  const validate = async () => {
    let finalUsername = inputs.username;
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.username) {
      handleError("Please input user name", "username");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else {
      if (inputs.password.length < 8) {
        handleError("Password is minimum 8 chars", "password");
        isValid = false;
      }
    }
    
    if (isValid) {
      userLogin(finalUsername);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <>
    {showLogin?<ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.white, flex: 1 }}
    >
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <Text style={{ color: colors.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: colors.grey, fontSize: 18, marginVertical: 20 }}>
          Enter Your Details to Login
        </Text>
        <TxtInput
          onChangeText={(text) => handleOnchange(text, "username")}
          onFocus={() => handleError(null, "username")}
          iconName="account-outline"
          label=""
          placeholder="Enter your user name"
          error={errors.username}
        />
        <TxtInput
          onChangeText={(text) => handleOnchange(text, "password")}
          onFocus={() => handleError(null, "password")}
          iconName="lock-outline"
          label=""
          placeholder="Enter your password"
          error={errors.password}
          password
        />
        <CustomButton onPress={validate} disable={isLoading} text={"Sign In"} />
        {userPin&&<CustomButton
          onPress={onForgotPasswordPressed}
          text={"Login With Your Pin"}
          type={"LINK_ONLY"}
        />}
      </View>
    </ScrollView>:<AuthScreen></AuthScreen>}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default LoginScreen;

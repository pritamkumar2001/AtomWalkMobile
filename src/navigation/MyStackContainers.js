import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen';
import ChangePassword from '../screens/ChangePassword';
import TaskScreen from '../screens/task/TaskScreen';
import TsakDetailScreen from '../screens/task/TaskDetailScreen';
import UpdateTaskScreen from '../screens/task/UpdateTaskScreen';
import AddTaskScreen from '../screens/task/AddTaskScreen';
import AddLeadScreen from '../screens/task/AddLeadScreen';
import TodoScreen from '../screens/task/TodoScreen';
import CustomerScreen from '../screens/customer/CustomerScreen'
import AddCustomerTask from '../screens/customer/AddCustomerTask';
import LeadScreen from '../screens/customer/LeadScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomerTasks from '../screens/customer/CustomerTasks';
import CustTaskInterest from '../screens/customer/CustTaskInterest';
import UpdateTaskInterest from '../screens/customer/UpdateTaskInterest'; 
import ViewInterest from '../screens/customer/ViewInterest';
import OrderList from '../screens/customer/OrderList'
import CompanyInfoScreen from '../screens/CompanyInfoScreen';
import LeadStatus from '../screens/customer/LeadStatus';

const ProfileStack = createNativeStackNavigator();
export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
    initialRouteName="ProfileScreen"
    screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="ProfileSreen" component={ProfileScreen} />
      <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
    </ProfileStack.Navigator>
  );
}

const TaskStack = createNativeStackNavigator();
export function TaskStackScreen() {
  return (
    <TaskStack.Navigator
    initialRouteName="TaskScreen"
    screenOptions={{headerShown: false}} >
      <TaskStack.Screen name="TaskSreen" component={TaskScreen} />
      <TaskStack.Screen name="TaskDetail" component={TsakDetailScreen} />
      <TaskStack.Screen name="TaskInterest" component={CustTaskInterest} />
      <TaskStack.Screen name="UpdateTaskInterest" component={UpdateTaskInterest} />
      <TaskStack.Screen name="AddTask" component={AddTaskScreen} />
      <TaskStack.Screen name="UpdateTask" component={UpdateTaskScreen} />
      <TaskStack.Screen name="ViewTaskInterest" component={ViewInterest} />
      
    </TaskStack.Navigator>
  );
}
export function MTaskStackScreen() {
  return (
    <TaskStack.Navigator
    initialRouteName="TaskScreen"
    screenOptions={{headerShown: false}} >
      <TaskStack.Screen name="MTaskSreen" component={TaskScreen} />
      <TaskStack.Screen name="TaskDetail" component={TsakDetailScreen} />
      <TaskStack.Screen name="TaskInterest" component={CustTaskInterest} />
      <TaskStack.Screen name="UpdateTaskInterest" component={UpdateTaskInterest} />
      <TaskStack.Screen name="AddTask" component={AddTaskScreen} />
      <TaskStack.Screen name="UpdateTask" component={UpdateTaskScreen} />
      <TaskStack.Screen name="ViewTaskInterest" component={ViewInterest} />
      
    </TaskStack.Navigator>
  );
}

const TodoStack = createNativeStackNavigator();
export function TodoStackScreen() {
  return (
    <TodoStack.Navigator 
      initialRouteName="TodoScreen"
      screenOptions={{headerShown: false}}>
      <TodoStack.Screen name="TodoSreen" component={TodoScreen} />
      <TodoStack.Screen name="AddTodoTask" component={AddTaskScreen} />
      <TaskStack.Screen name="AddLead" component={AddLeadScreen} />
    </TodoStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
  return (
    <HomeStack.Navigator 
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}} >
      <HomeStack.Screen name="HomeSreen" component={HomeScreen} />
      <HomeStack.Screen name="CustomerScreen" component={CustomerScreen} />
      <HomeStack.Screen name="LeadScreen" component={LeadScreen} />
      <HomeStack.Screen name="AddCustomerTask" component={AddCustomerTask} />
      <HomeStack.Screen name="CustomerTasks" component={CustomerTasks} />
      <HomeStack.Screen name="ProductInterest" component={CustTaskInterest} />
      <HomeStack.Screen name="UpdateInterest" component={UpdateTaskInterest} />
      <HomeStack.Screen name="ViewInterest" component={ViewInterest} />
      <HomeStack.Screen name="OrderList" component={OrderList} />
      <HomeStack.Screen name="CustTaskDetail" component={TsakDetailScreen} />
      <HomeStack.Screen name="CustUpdateTask" component={UpdateTaskScreen} />
      <HomeStack.Screen name="Company" component={CompanyInfoScreen} />
      <HomeStack.Screen name="AddNewLead" component={AddLeadScreen} />
      <HomeStack.Screen name="LeadStatus" component={LeadStatus} />
    </HomeStack.Navigator>
  );
}

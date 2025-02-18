import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Overview from "../screens/overview";
import NewTask from "screens/new";
import EditTask from "screens/edit"; // Import the EditTask component

// Define the type for navigation stack parameters
export type RootStackParamList = {
    Overview: undefined;
    Details: { name: string };
    NewTask: undefined;
    EditTask: { task: any, updateTask: (task: any) => void }; // Add EditTask parameters
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Overview">
                <Stack.Screen name="Overview" component={Overview} />
                <Stack.Screen name="NewTask" component={NewTask} options={{ title: "New Task" }} />
                <Stack.Screen name="EditTask" component={EditTask} options={{ title: "Edit Task" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
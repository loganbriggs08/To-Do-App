import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";

function NewTask({ navigation, route }: { navigation: any, route: any }) {
    const [newTask, setNewTask] = useState({ title: "", description: "", priority: 1 });

    // Function to handle the submission of a new task
    const handleNewTaskSubmit = () => {
        if (newTask.title.trim() === "" || newTask.description.trim() === "") {
            Alert.alert("Error", "Title and Description cannot be empty.");
            return;
        }
        const { addTask, filterName, filterPriority } = route.params;
        addTask(newTask, filterName, filterPriority);
        navigation.goBack();
    };

    return (
        <View className="flex-1 p-5 bg-white">
            <Text className="text-lg font-bold mb-2">Title</Text>
            <TextInput
                placeholder="Title"
                value={newTask.title}
                onChangeText={(text) => setNewTask({ ...newTask, title: text })}
                className="mb-4 border-b border-gray-300 p-2"
            />

            <Text className="text-lg font-bold mb-2">Description</Text>
            <TextInput
                placeholder="Description"
                value={newTask.description}
                onChangeText={(text) => setNewTask({ ...newTask, description: text })}
                className="mb-4 border-b border-gray-300 p-2"
            />

            <Text className="text-lg font-bold mb-2">Priority</Text>
            <Picker
                selectedValue={newTask.priority}
                onValueChange={(itemValue) => setNewTask({ ...newTask, priority: itemValue })}
                className="mb-4 border-b border-gray-300 p-2"
            >
                <Picker.Item label="High" value={1} />
                <Picker.Item label="Mid" value={2} />
                <Picker.Item label="Low" value={3} />
            </Picker>
            
            <TouchableOpacity
                className="w-full bg-blue-200 py-4 items-center rounded-xl"
                onPress={handleNewTaskSubmit}
            >
                <Text className="text-blue-500 text-lg font-bold" style={{ fontFamily: "Merriweather Sans" }}>
                    Add Task
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default NewTask;
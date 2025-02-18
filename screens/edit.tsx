import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

function EditTask({ navigation, route }: { navigation: any, route: any }) {
    const { task, updateTask, deleteTask } = route.params;
    const [editedTask, setEditedTask] = useState({ title: '', description: '', priority: 1 });

    useEffect(() => {
        if (task) {
            setEditedTask(task);
        }
    }, [task]);

    // Function to handle the submission of the edited task
    const handleEditTaskSubmit = () => {
        updateTask(editedTask);
        navigation.goBack();
    };

    const handleDeleteTask = () => {
        deleteTask(task);
        navigation.goBack();
    };

    return (
        <View className="flex-1 p-5 bg-white">
            <Text className="text-lg font-bold mb-2">Title</Text>
            <TextInput
                placeholder="Title"
                value={editedTask.title}
                onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
                className="mb-4 border-b border-gray-300 p-2"
            />

            <Text className="text-lg font-bold mb-2">Description</Text>
            <TextInput
                placeholder="Description"
                value={editedTask.description}
                onChangeText={(text) => setEditedTask({ ...editedTask, description: text })}
                className="mb-4 border-b border-gray-300 p-2"
            />

            <Text className="text-lg font-bold mb-2">Priority</Text>
            <Picker
                selectedValue={editedTask.priority}
                onValueChange={(itemValue) => setEditedTask({ ...editedTask, priority: itemValue })}
                className="mb-4 border-b border-gray-300 p-2"
            >
                <Picker.Item label="High" value={1} />
                <Picker.Item label="Mid" value={2} />
                <Picker.Item label="Low" value={3} />
            </Picker>

            <TouchableOpacity
                className='w-full bg-blue-200 py-4 items-center rounded-xl'
                onPress={handleEditTaskSubmit}
            >
                <Text className='text-blue-500 text-lg font-bold' style={{ fontFamily: 'Merriweather Sans' }}>
                    Update Task
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className='w-full bg-red-500 py-4 items-center rounded-xl mt-4'
                onPress={handleDeleteTask}
            >
                <Text className='text-white text-lg font-bold' style={{ fontFamily: 'Merriweather Sans' }}>
                    Delete Task
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default EditTask;
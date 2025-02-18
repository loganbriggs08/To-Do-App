import { useNavigation } from "@react-navigation/native";
import { Todo } from "core/types/todo";
import TodoService from "database/queries/todo";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Define the prop types for the Card component
interface CardProps {
    id: any;
    title: string; // Title of the card
    description: string; // Description text for the card
    priority: number; // Priority (1 = High, 2 = Medium, 3 = Low)
    done: boolean; // Status of the task (done or not)
    onStatusChange: (todo: Todo) => void; // Callback to change the status
    onEdit: (todo: Todo) => void; // Callback to edit the task
    onDelete: (todo: Todo) => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, priority, done, onStatusChange, onEdit, onDelete }) => {
    const navigation = useNavigation();

    // Determine the priority color
    const priorityColor = priority === 1 ? "bg-red-500" : priority === 2 ? "bg-yellow-500" : "bg-green-500";

    // Determine the color for the "done" button
    const doneButtonColor = done ? "bg-blue-500" : "bg-gray-300";

    const todo: Todo = {
        id: id,
        title: title,
        description: description,
        priority: priority,
        completed: done,
        created_at: new Date(),
    }

    function updateTask(todo: Todo) {
        // Update the todo in the database
        new TodoService().update(todo);

        // Call the onEdit callback
        onEdit(todo);
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("EditTask", { task: todo, updateTask: updateTask, deleteTask: onDelete })}
        >
            <View className="bg-white p-4 rounded-lg shadow-md mb-4">
                <View className="flex-row">
                    <View>
                        {/* Title with strikethrough if done */}
                        <Text
                            className="text-xl font-bold text-gray-800"
                            style={{ textDecorationLine: done ? "line-through" : "none" }}
                        >
                            {title}
                        </Text>

                        {/* Description */}
                        <Text className="text-gray-600 mt-2">{description}</Text>
                    </View>

                    <View className="ml-auto">
                        {/* Done status button */}
                        <TouchableOpacity
                            onPress={() => {
                                onStatusChange(todo); // Toggle done status and trigger callback
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${doneButtonColor}`}
                        >
                            {/* Checkmark svg for inside the button */}
                            <Svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </Svg>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Divider between top row and bottom priority */}
                <View className="my-2 h-px bg-gray-300" />

                {/* Priority indicator */}
                <View className={`mt-2 px-3 py-1 rounded-full ${priorityColor}`}>
                    <Text className="text-white text-sm">{priority === 1 ? "High" : priority === 2 ? "Medium" : "Low"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Card;
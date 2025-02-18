import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface FilterProps {
    title: string; // Title of filter
    priority: number; // Priority number of filter
}

// Define the prop types for the Filters component
interface FiltersProps {
    filters: FilterProps[]; // Filters to display
    onFilterPress: (filterName: string, filterPriority: number) => void; // Callback function for filter press
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterPress }) => {
    // Use a useState to track active filter, first filter in passed array by default
    const [activeFilter, setActiveFilter] = React.useState<string>(filters[0].title);

    // Handle filter press and update active filter
    const handleFilterPress = (filterName: string, filterPriority: number) => {
        setActiveFilter(filterName);
        onFilterPress(filterName, filterPriority); // Call the function with the filter name
    };

    return (
        <View className="flex-row justify-evenly items-center my-4">
            {/* Render the first filter */}
            <TouchableOpacity
                className={`py-2 px-4 rounded-xl mx-2 ${
                    filters[0].title === activeFilter ? "bg-blue-500" : "bg-gray-300"
                }`}
                onPress={() => handleFilterPress(filters[0].title, filters[0].priority)}
            >
                <Text className="text-lg text-white" style={{ fontFamily: "Merriweather Sans" }}>
                    {filters[0].title}
                </Text>
            </TouchableOpacity>

            {/* Divider */}
            <Text className="text-3xl text-gray-400 mx-2">|</Text>

            {/* Render the rest of the filters */}
            {filters.slice(1).map((filter) => (
                <TouchableOpacity
                    key={filter.title}
                    className={`py-2 px-4 rounded-xl mx-2 ${
                        filter.title === activeFilter ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onPress={() => handleFilterPress(filter.title, filter.priority)} // Call the function with the filter name
                >
                    <Text className="text-lg text-white" style={{ fontFamily: "Merriweather Sans" }}>
                        {filter.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Filters;

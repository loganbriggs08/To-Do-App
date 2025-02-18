import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Define the prop types for the Sections component
interface SectionsProps {
    sections: string[]; // Section names to display
    onSectionPress: (sectionName: string) => void; // Callback function for section press
}

const Sections: React.FC<SectionsProps> = ({ sections, onSectionPress }) => {
    // State to keep track of the active section
    const [activeSection, setActiveSection] = React.useState<string>(sections[0]);

    // Handle section press and update active section
    const handleSectionPress = (sectionName: string) => {
        setActiveSection(sectionName);
        onSectionPress(sectionName); // Call the function with the section name
    };

    return (
        <View className="my-4">
            {/* Render all sections in a row */}
            <View className="flex-row justify-evenly items-center">
                {sections.map((section) => (
                    <TouchableOpacity
                        key={section}
                        onPress={() => handleSectionPress(section)}
                        className={`py-2 px-4 mx-2 ${
                            activeSection === section ? "text-blue-500" : "text-gray-500" // Make inactive sections gray
                        }`}
                    >
                        <Text className="text-xl font-bold" style={{ fontFamily: "Merriweather Sans" }}>
                            {section}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Horizontal divider (hr) with a dynamic part below the active section */}
            <View className="relative my-2">
                {/* Thicker divider */}
                <View className="h-1 bg-gray-300" />

                {/* Highlight only the active section"s portion of the hr */}
                {activeSection && (
                    <View
                        className="absolute bottom-0 h-1 bg-black"
                        style={{
                            width: `${100 / sections.length}%`, // Each section takes up an equal width
                            left: `${(100 / sections.length) * sections.indexOf(activeSection)}%`, // Set the left position based on the active section"s index
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default Sections;
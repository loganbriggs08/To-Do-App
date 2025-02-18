import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, ScrollView, RefreshControl, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { RootStackParamList } from "../navigation";
import Filters from "../components/filters";
import Sections from "../components/sections";
import Card from "../components/card";
import TodoService from "database/queries/todo";
import { Todo } from "../core/types/todo";

// Define the navigation prop types for the Overview screen
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, "Overview">;

function Overview() {
    // Initialise navigation
    const navigation = useNavigation<OverviewScreenNavigationProps>();
    // State for managing the refreshing status
    const [refreshing, setRefreshing] = useState<boolean>(false);
    // State for storing all tasks
    const [cards, setCards] = useState<Todo[]>([]);
    // State for storing filtered tasks
    const [filteredCards, setFilteredCards] = useState(cards);
    // State for storing the current filter name
    const [filterName, setFilterName] = useState<string>("All");
    // State for storing the current filter priority
    const [filterPriority, setFilterPriority] = useState<number>(-1);
    // State for storing the active section
    const [activeSection, setActiveSection] = useState<string>("Not Done");

    // Fetch all tasks when the component mounts
    useEffect(() => {
        new TodoService().getAll().then((todos) => {
            setCards(todos as unknown as Todo[] ?? []);
        });
    }, []);

    // Update filtered tasks whenever cards, filterName, filterPriority, or activeSection change
    useEffect(() => {
        let filtered = cards;

        if (filterName !== "All") {
            filtered = filtered.filter(card => card.priority === filterPriority);
        }

        if (activeSection === "Not Done") {
            filtered = filtered.filter(card => !card.completed);
        } else if (activeSection === "Completed") {
            filtered = filtered.filter(card => card.completed);
        }

        setFilteredCards(filtered);
    }, [cards, filterName, filterPriority, activeSection]);

    // Handle section change
    const sectionChange = (section: string) => {
        setActiveSection(section);
    };

    // Handle filter change
    const filterChange = (filterName: string, filterPriority: number) => {
        setFilterName(filterName);
        setFilterPriority(filterPriority);
    };

    // Handle status change
    const statusChange = (todo: Todo) => {
        // Update the completed status on the database
        new TodoService().updateCompletedStatus(todo);
        // Fetch all tasks and update the state
        new TodoService().getAll().then((todos) => {
            setCards(todos as unknown as Todo[] ?? []);
        });
    };

    // Handle refresh action
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const todos = await new TodoService().getAll();
            setCards(todos as unknown as Todo[] ?? []);
        } catch (error) {
            console.error("Failed to fetch todos:", error);
        } finally {
            setRefreshing(false);
        }
    };

    // Handle adding a new task
    const addTask = async (newTask: Todo) => {
        try {
            const createdTask = await new TodoService().add(newTask);

            if (createdTask) {
                new TodoService().getAll().then((todos) => {
                    setCards(todos as unknown as Todo[] ?? []);
                });
            }
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const onEdit = (todo: Todo) => {
        // Fetch all tasks and update the state
        new TodoService().getAll().then((todos) => {
            setCards(todos as unknown as Todo[] ?? []);
        });
    };

    const onDelete = (todo: Todo) => {
        // Delete the task from the database
        new TodoService().delete(todo).then(() => {
            new TodoService().getAll().then((todos) => {
                setCards(todos as unknown as Todo[] ?? []);
            });
        });
    }

    return (
        <SafeAreaView className="flex-1">
            {/* Render sections component */}
            <Sections sections={["Not Done", "Completed"]} onSectionPress={sectionChange} />
            {/* Render filters component */}
            <Filters filters={[
                { title: "All", priority: -1 },
                { title: "High", priority: 1 },
                { title: "Mid", priority: 2 },
                { title: "Low", priority: 3 },
            ]} onFilterPress={filterChange} />
            {/* Render scroll view with refresh control */}
            <ScrollView
                contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#4CAF50"]}
                        progressBackgroundColor="#FFFFFF"
                    />
                }
                keyboardShouldPersistTaps="handled"
            >
                {/* Render each card */}
                {filteredCards.map((card: Todo, index: number) => (
                    <Card
                        id={card.id}
                        key={index}
                        title={card.title}
                        description={card.description}
                        priority={card.priority}
                        done={card.completed}
                        onStatusChange={statusChange}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </ScrollView>
            {/* Render button to navigate to NewTask screen */}
            <View className="w-full absolute bottom-10 left-0 right-0">
                <TouchableOpacity
                    className="w-[90%] ml-auto mr-auto bg-blue-200 py-4 items-center rounded-xl"
                    onPress={() => navigation.navigate("NewTask", { addTask, filterName, filterPriority })}
                >
                    <Text className="text-blue-500 text-lg font-bold" style={{ fontFamily: "Merriweather Sans" }}>
                        New Task
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Overview;
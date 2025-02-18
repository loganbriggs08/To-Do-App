import {Platform} from "react-native";
import {Database} from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schemas/todo";
import migrations from "./migrations";
import Todo from "./models/todo"

const adapter = new SQLiteAdapter({
    dbName: "todo-app",
    schema,
    migrations,
    jsi: Platform.OS === "ios",
    onSetUpError: error => {
        console.log(error);
    },
});

export const database = new Database({
    adapter,
    modelClasses: [
        Todo,
    ],
});
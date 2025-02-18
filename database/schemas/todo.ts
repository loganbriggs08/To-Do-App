import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
    version: 1, // Defines the schema version (important for migrations)
    tables: [
        tableSchema({
            name: "todos", // Table name: "todos"
            columns: [
                {name: "title", type: "string"},       // Title of the todo (text)
                {name: "description", type: "string"}, // Description of the task (text)
                {name: "priority", type: "number"},    // Priority level (numeric value)
                {name: "completed", type: "boolean"},  // Status of the task (true/false)
                {name: "created_at", type: "number"},  // Timestamp for when the todo was created
            ],
        }),
    ]
});

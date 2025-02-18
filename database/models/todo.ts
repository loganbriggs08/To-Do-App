import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export default class Todo extends Model {
    static table: string = "todos"; // Define the table name

    @field("title") title; // Title of the todo
    @field("description") description; // Description of the task
    @field("priority") priority; // Priority level
    @field("completed") completed; // Completion status (true/false)
    @date("created_at") createdAt; // Timestamp of creation
}
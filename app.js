import express from "express";
import bodyParser from "body-parser";
const app = express();

const port = 3000;

//app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const todos = [{
    todoId: "1",
    todoTask: "coding"
},
{
    todoId: "2",
    todoTask: "Reading"
},
{
    todoId: "3",
    todoTask: "Sleeping"
}
];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        data: todos
    });
});


//for adding new task in todo list
app.post("/", (req, res) => {
    const inputTodoId = todos.length + 1;
    const inputTodoTask = req.body.todoTask;

    todos.push({
        todoId: inputTodoId,
        todoTask: inputTodoTask
    });

    res.render("index.ejs", {
        data: todos
    });
});


//for deleting task from list
app.post("/delete", (req, res) => {
    var requestedtodoId = req.body.todoId;
    var j = 0;
    todos.forEach((todo) => {
        j = j + 1;
        if (todo.todoId === requestedtodoId) {
            todos.splice(j - 1, 1);
        }
    });
    res.redirect("/");
});






app.listen(port, () => {

    console.log(`server is running on port ${port}`);
});


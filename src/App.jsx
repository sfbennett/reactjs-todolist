import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  /* 1. This persistData function takes a single parameter 'newList' that will contain 
  an array of todos that you want to save to localStorag. 'localStorage.setItem' is a method
  used to store data in the browser's 'localStorage', it takes a key (string) and a value (string).
  The key here is "todos", the collection/name under which the data will be stored in
  localStorage and the value is 'JSON.stringify({ todos: newList }). */

  /* 2.'JSON.stringify({ todos: newList }) creates an object with a single property 'todos' 
  whose value is the 'newList' array. JSON.stringify converts this object into a JSON string. 
  This is key because localStorage can only store strings, not objects. */

  /* 3. The persistData function converts the newList array into a JSON string and saves it 
  in localStorage under the key 'todos'. This allows the data to persist across page reloads
  and browser sessions. */

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  /* useEffect HOOK --> lets you perform side effects in function components.
      1. If local storage is not available, the function exits early using 'return'. 
      2. Then 'localStorage.getItem' is used to retrieve/return an item named 'todos' from localStorage and save it in localTodos. 
      3. If there are no todos saved in localStorage the function exits early.
      4. If localTodos exists, this line parses the JSON string back into a JavaScript object, localTodos is now an object with a 
      'todos' property (an array of todos). 
      5. The 'todos' part accesses the array of todos from the parsed object.
      6. The setTodos function updates the state of 'todos', which is set to the array of todos retrieved and parsed from localStorage.
      7. The empty [] dependency array means this effect only runs once after the intial render.  */

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </>
  );
}

export default App;

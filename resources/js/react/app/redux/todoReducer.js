import { createSlice, configureStore, current } from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, todo)=>{
            state.todos = [...state.todos, todo]
        },
        deleteTodo: (state, todo)=>{
            state.todos = current(state).todos.filter(Todo=>{
                if(Todo.payload !== todo.payload){
                    return Todo
                }
            })
        }
    }
})

export const {addTodo, deleteTodo} = todoSlice.actions

const todosStore = configureStore({
    reducer: todoSlice.reducer
})

export default todosStore
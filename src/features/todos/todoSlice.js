import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    todos: [],
    isError: null,
};


export const fetchTodos = createAsyncThunk('todo/fetch', async () => {
    const {
        data
    } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const existTodo = JSON.parse(localStorage.getItem("todos")) || []

    if (existTodo.length > 0) {
        const existTodo = JSON.parse(localStorage.getItem("todos")) || [];
        return existTodo;
    } else {
        localStorage.setItem("todos", JSON.stringify(data));
        return data;
    }
});


export const todoSlice = createSlice({
    name: 'todos',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = null;
            state.todos = action.payload;
        });

        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
            state.todos = [];
        });
    },

    reducers: {

        addTodo: (state, action) => {
            return {
                ...state,
                todos: [...state.todos, action.payload],
                isLoading: false,
            }
        },

        todoUpdate: (state, action) => {

            const {
                id,
                title
            } = action.payload;

            const findTodo = state.todos.find(todo => todo.id.toString() === id);
            const update = JSON.parse(JSON.stringify(findTodo))
            update.title = title;
            const existTodo = state.todos.filter(todo => todo.id !== id);
            const updatedTodo = [...existTodo, update];
            localStorage.setItem("todos", JSON.stringify(updatedTodo));

            return {
                ...state,
                todos: updatedTodo,
            }
        },


        todoDelete: (state, action) => {
            const localTodos = JSON.parse(localStorage.getItem('todos')) || [];
            const reamingTodos = localTodos.filter((todo => todo.id.toString() !== action.payload.toString()));
            localStorage.setItem('todos', JSON.stringify(reamingTodos));
            return {
                ...state,
                todos: reamingTodos,
                isLoading: false,
                isError: null
            }
        },
    },
});

export const {
    addTodo,
    todoUpdate,
    todoDelete
} = todoSlice.actions;


export default todoSlice.reducer;
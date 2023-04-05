import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../features/todos/todoSlice';

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddTodo = (e) => {
        e.preventDefault();
        const id = Math.random().toString(36).substring(5,20);
        const newTodo = {id, title};
       
        dispatch(addTodo(newTodo));
        const localTodo = JSON.parse(localStorage.getItem("todos")) || [];
        const result = [...localTodo, newTodo];
        localStorage.setItem("todos", JSON.stringify(result));
        e.target.reset();
        navigate("/")
    }

    return (
        
            
            <div className="hero min-h-screen bg-base-200">
                <div className="indicator">
                    <div className="indicator-item indicator-bottom">
                            <button onClick={()=> navigate('/')} className="btn btn-xs btn-info text-white">Home</button>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                       <form onSubmit={handleAddTodo}>
                            <div className="card-body">
                                <p className='text-2xl mb-3'> Add New Todo </p>
                                <div className="form-control">
                                <input 
                                    onChange={(e)=> setTitle(e.target.value)} 
                                    type="text" 
                                    placeholder="Toto Title" 
                                    className="input input-bordered"
                                    required 
                                />
                                </div>
                                <div className="form-control mt-6">
                                    <button type='submit' className="btn btn-info text-white"> Add Todo </button>
                                </div>
                            </div>
                       </form>
                    </div>
                 </div>
            </div>
    );
};

export default AddTodo;
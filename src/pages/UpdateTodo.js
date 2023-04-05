import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { todoUpdate } from '../features/todos/todoSlice';



const UpdateTodo = () => {

    const {todos} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    const existTodo = todos?.find(todo => todo.id.toString() === id.toString());

    const handleUpdateTodo = async(e) => {
        e.preventDefault();
        dispatch(todoUpdate({id, title}));
        navigate('/');
    }

    

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="indicator">
                <div className="indicator-item indicator-bottom">
                    <button 
                        onClick={()=> navigate('/')}
                        className="btn btn-xs btn-info text-white">
                            Home
                    </button>
                </div>
                <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100">
                    <form onSubmit={handleUpdateTodo}>
                        <div className="card-body">
                            <p className='text-2xl mb-3 text-center'> Update Todo </p>
                            <div className="form-control">
                                <input 
                                    onChange={(e)=> setTitle(e.target.value)} 
                                    type="text" 
                                    placeholder="Toto Title" 
                                    defaultValue={existTodo?.title}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-info text-white"> Update </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );  
};

export default UpdateTodo;
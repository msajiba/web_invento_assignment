import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoRow from './TodoRow';
import { useNavigate } from 'react-router-dom';
import { fetchTodos } from '../../features/todos/todoSlice';

const Todos = () => {
    const {todos, isLoading, isError} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
      dispatch(fetchTodos());
    }, [dispatch]);

    return (

        
        <div className='w-3/4 mx-auto shadow-2xl border rounded my-10'>

            <h3 className='text-center text-2xl shadow-sm text-info'> TODO CRUD APPLICATION </h3>

            { isLoading && <p> Loading....</p>}
            { isError && <p> {isError} </p>}
            
                <div className='text-end'>
                    <button onClick={()=> navigate('/add-todo')} className='btn btn-sm btn-info mt-3 '>
                        Add New
                    </button>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="table w-full ">
                        <thead>
                        <tr>
                            <th>NO</th>
                            <th> Title </th>
                            <th colSpan="2"> Action </th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                todos?.map((todo, index) =>
                                    <TodoRow 
                                            key={index}
                                            index={index} 
                                            todo={todo} 
                                    />)
                            }
                        </tbody>
                    </table>
                </div>

         </div>
    );
};

export default Todos;
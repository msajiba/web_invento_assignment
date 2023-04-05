import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  todoDelete } from '../../features/todos/todoSlice';

const TodoRow = ({todo, index}) => {
    const {id, title} = todo;
    const dispatch = useDispatch();
    const navigate = useNavigate('');

    const handleDelete = (id) => {
        dispatch(todoDelete(id));
    }

    return (
        <tr>
            <th> {index + 1} </th>
            <td> {title} </td>
            <td>
                <button onClick={()=> navigate(`update/${id}`)} className='btn btn-xs bg-green-600 border-none mx-2'>
                    Edit
                </button>
                <button onClick={()=> handleDelete(id)} className='btn btn-xs  bg-red-600 border-none'>
                    Delete
                </button>
            </td>
      </tr>
    );
};

export default TodoRow;
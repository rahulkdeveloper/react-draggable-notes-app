import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../features/todo/NotesSlice';
import { timeAgo } from '../utils/utils';
import { FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { FaDeleteLeft, FaPencil } from 'react-icons/fa6';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Swal from 'sweetalert2';

export const NoteCard = ({ noteData, openModal }) => {
    let { _id, title, description, completed } = noteData;
    const dispatch = useDispatch();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab"
    }

    const createdAt = timeAgo(noteData.createdAt) // you can replace with real logic

    const noteEditAndUpdate = (type, id) => {
        if (type === 'edit') {
            openModal(_id)
        }
        else if (type === 'delete') {
            Swal.fire({
                title: 'Are your sure?',
                text: "This note will be permanently deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then((result)=>{
                if(result.isConfirmed){

                    dispatch(deleteNote({ id: id }));
                }
            })
      
        }
        else if (type === 'toggleComplete') {
            dispatch(updateNote({ id, updatedData: { completed: !completed } }))
        }
    }

    return (
        <div>
            <div className="card shadow-sm border-1 h-100" style={{ width: "18rem" }}>
                <div className="card-body">
                    {/* Title */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0 text-truncate">{title}</h5>

                        {/* Status Badge */}
                        <span
                            className={`badge rounded-pill ${completed ? "bg-success" : "bg-warning text-dark"
                                }`}
                        >
                            {completed ? "Completed" : "Pending"}
                        </span>

                        {/* Drag handle */}
                        <span
                            {...attributes}
                            {...listeners}
                            style={{ cursor: 'grab' }}
                            className='ms-2 text-muted'
                            title='Drag'
                        >
                            ☰
                        </span>

                    </div>

                    {/* Description */}
                    <p className="card-text text-muted small mb-3" style={{ minHeight: "48px" }}>
                        {description}
                    </p>

                    {/* Actions */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2">
                            {!completed && <button
                                type="button"
                                className="btn btn-sm btn-outline-success"
                                onClick={() => noteEditAndUpdate("edit", _id)}
                            >
                                <FaEdit className="me-2" />
                                {/* Edit */}
                            </button>
                            }

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => noteEditAndUpdate("delete", _id)}
                            >
                                <FaTrash className="me-2" />
                                {/* Delete */}
                            </button>


                        </div>

                        {/* Completed checkbox */}
                        {!completed && <div className="form-check m-0 d-flex align-items-center gap-2">
                            <input
                                className="form-check-input m-0"
                                type="checkbox"
                                id={`completed-${_id}`}
                                checked={!!completed}
                                onChange={() => noteEditAndUpdate("toggleComplete", _id)}
                            />
                            {/* <FaCheck className='me-2'/> */}
                            <label className="form-check-label small text-muted" htmlFor={`completed-${_id}`}>
                                Completed
                            </label>
                        </div>}

                    </div>
                </div>

                {/* Footer */}
                <div className="card-footer bg-white border-1 pt-0">
                    <small className="text-muted">{createdAt}</small>
                </div>
            </div>
        </div>
    )
}

import React, { useEffect, useRef, useState } from 'react'
import { NoteCard } from '../components/NoteCard'
import { Form } from '../components/Form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, fetchOneOldNote, noteDetail, reorderNotes, resetStatusAndError } from '../features/todo/NotesSlice';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    rectSortingStrategy 
} from "@dnd-kit/sortable";
import SortableItem from '../components/SortableItem';

const Home = () => {

    const notes = useSelector((state) => state.notes.notes);

    const singleNote = useSelector((state) => state.notes.singleNote);
    const { fetchNotesStatus, deleteNoteStatus } = useSelector(state => state.notes)
    const pagination = useSelector(state => state.notes.pagination)
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const closeRef = useRef(null);
    const navigate = useNavigate();

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = notes.findIndex((note) => note._id === active.id);

        const newIndex = notes.findIndex((note) => note._id === over.id);

        const reordered = arrayMove(notes, oldIndex, newIndex);
        dispatch(reorderNotes(reordered))

    }

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {

            dispatch(fetchNotes({ limit: pagination.limit, page: pagination.page }))
        }
    }, [token, dispatch])

    useEffect(() => {
        if (deleteNoteStatus === 'success' && notes.length < pagination.limit) {
            // fetch one more older note
            dispatch(fetchOneOldNote({ skip: notes.length, limit: 1 }))
        }

    }, [deleteNoteStatus, notes])


    const openModal = (id) => {
        dispatch(noteDetail({ id }))
        modalRef.current.click();

    }

    const closeModal = () => {
        closeRef.current.click();
    }

    const filterNotes = (type, nextPage) => {
        let params = { limit: pagination.limit, page: pagination.page };

        if (type === 'next') {
            params.page = nextPage
        }

        if (type === 'pending') {
            params.completed = false
        }
        else if (type === 'completed') {
            params.completed = true
        }
        else if (type === 'search') {
            params.q = search;
            setSearch('')
        }

        dispatch(fetchNotes(params))

    }

    useEffect(()=>{

        return ()=>{
            dispatch(resetStatusAndError())
        }
    },[deleteNoteStatus,dispatch])

    return (
        <div className=''>
            <div>
                <button hidden type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={modalRef}>
                    Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Form
                                    formData={singleNote ?? { title: "", description: "" }}
                                    type="editNote"
                                    closeModal={closeModal}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    ref={closeRef}
                                >Close</button>
                                {/* <button type="button" className="btn btn-primary"
                  onClick={() => closeRef.current.click()}
                >Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=''>
                <Form
                    formData={{}}
                    type='addNote'
                />

            </div>
            <div className='container mt-3'>

                <h1>All Notes</h1>
                <div className='d-flex gap-2 mt-3'>
                    <button type="button" class="btn btn-primary btn-sm"
                        onClick={() => filterNotes('all')}
                    >All</button>
                    <button type="button" class="btn btn-warning btn-sm"
                        onClick={() => filterNotes('pending')}
                    >Pending</button>
                    <button type="button" class="btn btn-success btn-sm"
                        onClick={() => filterNotes('completed')}
                    >Completed</button>

                </div>
                <form class="d-flex mt-3" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        name='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button class="btn btn-outline-success" type="button"

                        onClick={() => filterNotes('search')}>Search</button>
                </form>


                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={notes.map((n) => n._id)}
                        strategy={rectSortingStrategy }
                    >
                        <div className='row g-3 mt-5'>
                            {fetchNotesStatus === 'loading' && <h6 className='text-center'>loading....</h6>}
                            {fetchNotesStatus !== 'loading' && notes.length === 0 && <h5 className='text-center'>No tasks yet. Start by adding one.</h5>}

                            {notes.length > 0 && notes.map(note => {
                                return (
                                    <SortableItem key={note._id} id={note._id} className='col-12 col-sm-6 col-md-4 col-lg-3'>
                                        <div>
                                            <NoteCard
                                                key={note._id}
                                                noteData={note}
                                                openModal={openModal}
                                            />
                                        </div>
                                    </SortableItem>
                                )
                            })}

                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Pagination */}
            {notes.length>0 && <div className='container mt-5 d-flex justify-content-center'>
                <Pagination
                    currentPage={pagination.page}
                    totalPage={pagination.totalPages}
                    filterNotes={filterNotes}
                />
            </div>}
        </div >
    )
}

export default Home
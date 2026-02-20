import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteIntoDB, resetStatusAndError, updateNote } from '../features/todo/NotesSlice';
import { hideAlert, showAlert } from '../features/Alert/AlertSlice';
import { Spinner } from 'react-bootstrap';

export const Form = ({ formData, type, closeModal }) => {
    let { title: pTitle = null, description: pDescription = null, category: pCategory = null, tags: pTags } = formData;

    const [error, setError] = useState({ titleError: null, descriptionError: null });
    const [title, setTitle] = useState(pTitle);
    const [description, setDescription] = useState(pDescription);
    const [category, setCategory] = useState(pCategory);
    const [tags, setTags] = useState(pTags);

    const dispatch = useDispatch();
    const { editNoteStatus, addNoteStatus, addNoteError, editNoteError } = useSelector(state => state.notes);

    useEffect(() => {
        setTitle(formData?.title || '');
        setDescription(formData?.description || '');
        setTags(pTags);
        setCategory(pCategory)
    }, [formData]);

    useEffect(() => {
        if (editNoteStatus === 'success' && type === 'editNote') {
            dispatch(showAlert({
                show: true,
                message: "Note edit successfully!",
                type: 'success',
                duration: 3000
            }))
            closeModal()

        }
        else if (editNoteStatus === "failed" && editNoteError) {
            dispatch(showAlert({
                show: true,
                message: editNoteError,
                type: 'danger',
                duration: 3000
            }))
        }

        // return () => {
        //     dispatch(resetStatusAndError())
        // }

    }, [editNoteStatus, closeModal, type, editNoteError]);

    useEffect(() => {

        if (addNoteStatus === 'success' && !addNoteError) {
            setTitle("");
            setDescription("");
            setCategory("")
            setTags("")
            setError({ titleError: null, descriptionError: null }   )
            dispatch(showAlert({
                show: true,
                message: "Note added successfully",
                type: 'success',
                duration: 3000
            }))

        }

        else if (addNoteStatus === "failed" && addNoteError) {
            dispatch(showAlert({
                show: true,
                message: addNoteError,
                type: 'danger',
                duration: 3000
            }))
        }

        // return () => {
        //     dispatch(resetStatusAndError())
        // }

    }, [addNoteStatus, addNoteError])

    useEffect(()=>{
        return ()=>{
            dispatch(resetStatusAndError())
        }
    },[dispatch])

    const formSubmit = (e) => {
        e.preventDefault();


        if (!title || title === '') {

            setError({ ...error, titleError: 'Title is required!' });
            return
        };
        if (!description || description === '') {
            setError({ ...error, descriptionError: 'Description is required!' })
            return
        };

        if (type === 'addNote') {
            dispatch(addNoteIntoDB({ title, description, category, tags }));

        }
        else if (type === 'editNote') {
            dispatch(updateNote({ id: formData._id, updatedData: { title, description, category, tags } }))

        }

    }
    
    let isLoading = addNoteStatus === "loading" || editNoteStatus === "loading";


    return (
        <div className='form-container'>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title' value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {error.titleError && <div id="emailHelp" class="form-text text-danger">{error.titleError}</div>}
                </div>
                {/* <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {error.descriptionError && <div id="emailHelp" class="form-text text-danger">{error.descriptionError}</div>}
                </div> */}

                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {error.descriptionError && <div id="emailHelp" class="form-text text-danger">{error.descriptionError}</div>}
                </div>

                <select class="form-select mb-3" aria-label="Default select example"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option selected>Select Category</option>
                    <option value="Default">Default</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>

                <div class="mb-3">
                    <label for="exampleInputTags" class="form-label">Tags</label>
                    <input type="text" class="form-control" id="exampleInputTags" aria-describedby="emailHelp" name='tags' value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />

                </div>

                <button type="submit" class="btn btn-primary"
                    onClick={formSubmit}
                    disabled={isLoading}
                >{isLoading ?<Spinner size='sm'/> : type === 'addNote' ? 'Save' : 'Update'}</button>
            </form>
        </div>
    )
}

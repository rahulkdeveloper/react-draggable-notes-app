import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstnace from '../../api/axiosInstance';


const initialState = {
    notes: [],
    addNoteStatus: 'idle',
    addNoteError: null,
    fetchNotesStatus: 'idle',
    fetchNotesError: null,
    deleteNoteStatus: 'idle',
    singleNoteStatus: 'idle',
    singleNote: {
        id: 1,
        title: 'testing',
        description: "testing"
    },
    editNoteStatus: 'idle',
    editNoteError: null,
    pagination:{
        limit:8,
        page:1,
        totalPages:0,
        totalRecords:0
    }
}

export const addNoteIntoDB = createAsyncThunk('notes/add', async (data, thunkAPI) => {
    try {
        const res = await axiosInstnace.post("todos", data);
        return res.data;


    } catch (error) {
        console.log("error in addNoteIntoDB fn", error.message);
        throw new Error(error.response.data.message || error.response.data.errors || "updateProfile failed")

    }

})

export const fetchOneOldNote = createAsyncThunk('notes/oldOne', async (data, thunkAPI) => {
    try {
        const res = await axiosInstnace.get("todos",{
            params:data
        });
        return res.data;


    } catch (error) {
        console.log("error in fetchOneOldNote fn", error);
       throw new Error(error.response.data.message || error.response.data.errors || "fetchOneOldNote failed")

    }

})

export const fetchNotes = createAsyncThunk('notes', async (data, thunkAPI) => {
    try {
        const res = await axiosInstnace.get("todos",{
            params:data
        });
        return res.data;


    } catch (error) {
        console.log("error in fetchNotes fn", error);
        throw new Error("Failed")

    }

})

export const updateNote = createAsyncThunk('notes/update', async (data, thunkAPI) => {
    try {
        const res = await axiosInstnace.patch(`todos/${data.id}`,data.updatedData);
        return res.data;


    } catch (error) {
        console.log("error in fetchNotes fn", error);
        throw new Error("Failed")

    }

})

export const deleteNote = createAsyncThunk('notes/delete', async (data, thunkAPI) => {
    try {
        const res = await axiosInstnace.delete(`todos/${data.id}`);
        return data.id;


    } catch (error) {
        console.log("error in fetchNotes fn", error);
        throw new Error("Failed")

    }

})

export const noteDetail = createAsyncThunk('notes/id', async (data, thunkAPI) => {
    try {
        const res = await axiosInstnace.get(`todos/${data.id}`);
        return res.data;


    } catch (error) {
        console.log("error in fetchNotes fn", error);
        throw new Error("Failed")

    }

})



const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        resetStatusAndError: (state, action) => {
            state.addNoteStatus='idle'
            state.addNoteError=null
            state.deleteNoteStatus='idle'
        },
        reorderNotes:(state,action)=>{
            state.notes = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNoteIntoDB.pending, (state, action) => {
                state.addNoteStatus = 'loading'
            })
            .addCase(addNoteIntoDB.fulfilled, (state, action) => {
                state.addNoteStatus = 'success';
                let notes = state.notes
                notes.unshift(action.payload.data);
                notes = notes.slice(0,8)
                state.notes = notes;
            })
            .addCase(addNoteIntoDB.rejected, (state, action) => {
                state.addNoteError = action.error.message;
                state.addNoteStatus = 'failed'
            })
            .addCase(fetchNotes.pending, (state, action) => {
                state.fetchNotesStatus = 'loading'
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.fetchNotesStatus = 'success'
                state.notes = action.payload.data;
                state.pagination = action.payload.pagination
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.fetchNotesError = action.error.message;
                state.fetchNotesStatus = 'failed'
            })
            .addCase(deleteNote.pending, (state, action) => {
                state.deleteNoteStatus = 'loading'
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.deleteNoteStatus = 'success'
                const deleteId = action.payload;
                state.notes = state.notes.filter(note => note._id !== deleteId);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.deleteNoteStatus = 'failed'
            })
            // single note detail API
            .addCase(noteDetail.pending, (state, action) => {
                state.singleNoteStatus = 'loading'
            })
            .addCase(noteDetail.fulfilled, (state, action) => {
                state.singleNoteStatus = 'success'
                state.singleNote = action.payload.data;
            })
            .addCase(noteDetail.rejected, (state, action) => {
                console.log("Error", action.error);
                // state.fetchNotesError = action.error.message;
                state.singleNoteStatus = 'failed'
            })
            .addCase(updateNote.pending, (state, action) => {
                state.editNoteStatus = 'loading'
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.editNoteStatus = 'success'
                state.notes = state.notes.map((note) => {
                    if (note._id.toString() === action.payload.data._id.toString()) {
                        return action.payload.data
                    }
                    else {

                        return note
                    }
                })
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.editNoteStatus = 'failed';
                state.editNoteError = action.error.message
            })
            .addCase(fetchOneOldNote.fulfilled,(state,action)=>{
                state.notes.push(...action.payload.data)
            })
    }
})

export const { resetStatusAndError,reorderNotes } = notesSlice.actions;

export default notesSlice.reducer
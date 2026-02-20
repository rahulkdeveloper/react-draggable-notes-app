import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../features/Alert/AlertSlice';
import { Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion'

const AminationAlert = () => {

    const { show, message, type, duration } = useSelector(state => state.alert);
    const dispatch = useDispatch()

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                dispatch(hideAlert())
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show])

    return (
        <div style={{ position: 'absolute', right: 0, top: 0, width: "20%" }}>
            <AnimatePresence>
                {show &&
                    //  <div class={`alert alert-${type}`} role="alert" style={{position:'absolute',right:0,top:0,width:"20%"}}>
                    //     {message}
                    // </div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.5 }}
                    >

                        <Alert variant={type} onClose={() => dispatch(hideAlert())} dismissible>{message}</Alert>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default AminationAlert
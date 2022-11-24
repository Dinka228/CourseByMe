import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createStage} from "../../http/stageAPI";
import {createTask, fetchTasks} from "../../http/taskAPI";
import {Context} from "../../index";

const CreateTask = ({show,onHide,stageId}) => {
    const [textTask,setTextTask] = useState('')
    const [progress,setProgress] = useState(0)
    const {courses} = useContext(Context)
    const addTask=()=>{
        const formData = new FormData()
        formData.append('text',textTask)
        formData.append('progress',`${progress}`)
        formData.append('stageId',stageId)
        createTask(formData).then(data=>onHide())
        fetchTasks(stageId).then(data=>courses.setTasks(data))
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати питання
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={textTask}
                        onChange={e=>setTextTask(e.target.value)}
                        className='mt-3'
                        placeholder={"Введіть питання"}
                    />
                    <Form.Control
                        value={progress}
                        onChange={e=>setProgress(Number(e.target.value))}
                        className='mt-3'
                        placeholder={"Введіть прогресс"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={addTask}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTask;
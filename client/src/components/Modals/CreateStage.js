import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createTheme} from "../../http/themesAPI";
import {observer} from "mobx-react-lite";
import {createStage} from "../../http/stageAPI";
import {createCourse} from "../../http/courseAPI";

const CreateStage = observer(({show,onHide,stageCourse}) => {
    const [nameStage,setNameStage] = useState('')
    const [progress,setProgress] = useState(0)
    const addStage=()=>{
        const formData = new FormData()
        formData.append('name',nameStage)
        formData.append('progress',`${progress}`)
        formData.append('courseId',stageCourse.id)
        createStage(formData).then(data=>onHide())
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
                    Додати етапу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={nameStage}
                        onChange={e=>setNameStage(e.target.value)}
                        className='mt-3'
                        placeholder={"Введіть назву етапа"}
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
                <Button variant={'outline-success'} onClick={addStage}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateStage;
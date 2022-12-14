import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createTask, fetchTasks} from "../../http/taskAPI";
import {createVariant, fetchVariants} from "../../http/variantAPI";

const CreateVariant = observer(({show,onHide,stageId,taskId}) => {
    const [textVariant,setTextVariant] = useState('')
    const [correctString,setCorrectString] = useState('No')
    const {courses} = useContext(Context)
    const addVariant=()=>{
        const formData = new FormData()
        formData.append('text',textVariant)
        formData.append('taskId',taskId)
        formData.append('stageId',stageId)
        formData.append('correct',correctString)
        setCorrectString('No')
        createVariant(formData).then(data=>{
            fetchVariants(stageId).then(data=>courses.setVariants(data))
            console.log(data)
            onHide()
        })
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
                    Додати варіант відповіді
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={textVariant}
                        onChange={e=>setTextVariant(e.target.value)}
                        className='mt-3'
                        placeholder={"Введіть питання"}
                    />
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault"  onChange={()=>{
                            if(correctString === 'Yes'){
                                setCorrectString('No')
                            }else if(correctString === 'No'){
                                setCorrectString('Yes')
                            }

                        }}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                               Правильно?
                            </label>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={addVariant}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateVariant;
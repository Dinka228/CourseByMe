import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {CREATE_ROUTE} from "../../utils/consts";
import {set} from "mobx";
import {createCourse} from "../../http/courseAPI";

const CreateCourseModal =  observer(({show,onHide}) => {
    const history = useHistory()
    const {courses} = useContext(Context)
    const {user}= useContext(Context)
    const [name,setName]=useState('')
    const [cost,setCost]=useState(0)
    const [description,setDescription]=useState('')
    const [file,setFile]=useState(null)
    const [themesId,setThemesId]=useState(0)
    const addNewCourse = ()=>{
        console.log(courses.selectedThemes.id)
        setThemesId(courses.selectedThemes.id)
        const formData = new FormData()
        formData.append('name',name)
        formData.append('themeId',`${themesId}`)
        formData.append('cost',`${cost}`)
        formData.append('description',description)
        formData.append('img',file)

        createCourse(formData).then(data=>{
            console.log(data)
            onHide()
        })
        courses.setSelectedThemes({})
    }
    const selectFile=e=>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
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
                    Створення оголошення
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className='mt-3'
                        placeholder={"Введіть назву"}
                    />
                    <Form.Control
                        value={cost}
                        onChange={e=>setCost(Number(e.target.value))}
                        className='mt-3'
                        placeholder={"Введіть ціну"}
                    />
                    <Form.Control
                        value={description}
                        onChange={e=>setDescription( e.target.value)}
                        className='mt-3'
                        placeholder={"Введіть опис"}
                    />
                    <Form.Control
                        onChange={selectFile}
                        className='mt-3'
                        type="file"
                    />
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle> {courses.selectedThemes.name || "Виберіть категорію"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {courses.themes.map(type=>
                                <Dropdown.Item
                                    onClick={()=>{

                                        courses.setSelectedThemes(type)
                                        console.log(courses.selectedThemes.id)
                                    }}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={()=>{
                    addNewCourse()
                    // history.push(CREATE_ROUTE)
                }}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCourseModal;
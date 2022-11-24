import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createTheme} from "../../http/themesAPI";

const CreateThemes = ({show,onHide}) => {
    const [nameThemes,setNameThemes] = useState('')
    const addTheme=()=>{
        createTheme({name:nameThemes}).then(data=>{

            setNameThemes('')
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
                    Додати категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={nameThemes}
                        onChange={e=>setNameThemes(e.target.value)}
                        placeholder={"Введіть назву категорії"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                <Button variant={'outline-success'} onClick={addTheme}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateThemes;
import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCourseModal from "../components/Modals/CreateCourseModal";
import CreateThemes from "../components/Modals/CreateThemes";

const Admin = () => {
    const [courseVisible, setCourseVisible] = useState(false)
    const [themesVisible, setThemesVisible] = useState(false)
    return (
        <Container className='d-flex flex-column'>
            <Button variant={"outline-dark"} className='mt-4 p-2' onClick={()=>setCourseVisible(true)}>Додати курс</Button>
            <CreateCourseModal show={courseVisible} onHide={()=>setCourseVisible(false)}/>
            <Button variant={"outline-dark"} className='mt-4 p-2' onClick={()=>setThemesVisible(true)}>Додати категорію</Button>
            <CreateThemes show={themesVisible} onHide={()=>setThemesVisible(false)}/>
        </Container>
    );
};

export default Admin;
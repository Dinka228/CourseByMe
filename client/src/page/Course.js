import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CourseList from "../components/main/CourseList";
import CostBar from "../components/main/CostBar";
import TypeBar from "../components/main/TypeBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchThemes} from "../http/themesAPI";
import {fetchCourse} from "../http/courseAPI";
import ShowBlock from "../components/Modals/ShowBlock";
import Apologies from "../components/Modals/apologies";

const Course = observer(() => {
    const {courses} = useContext(Context)
    const {user} = useContext(Context)
    const [oneTime,setOneTime] = useState(true)
    const [apologiesVisible,setApologiesVisible] = useState(false)
    if(user.users.role === 'STUDENT' && oneTime){
        setApologiesVisible(true)
        setOneTime(false)
    }
    useEffect(()=>{


        fetchThemes().then(data=>{courses.setThemes(data)})
        fetchCourse().then(data=>{

            courses.setCourses(data.rows)
        })
    },[])
    return (
        <Container>
            <Row className="mt-2">

                <Col md={3}>
                    <div className="d-flex justify-content-center mt-2">
                        Теми
                    </div>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <CourseList/>
                </Col>
            </Row>
            <Apologies show={apologiesVisible} onHide={()=>setApologiesVisible(false)}/>
        </Container>
    );
});

export default Course;
import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CourseList from "../components/main/CourseList";
import CostBar from "../components/main/CostBar";
import TypeBar from "../components/main/TypeBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchThemes} from "../http/themesAPI";
import {fetchCourse, fetchUserSertify} from "../http/courseAPI";
import ShowBlock from "../components/Modals/ShowBlock";
import Apologies from "../components/Modals/apologies";
import {Badge, Image, ListGroup} from "react-bootstrap";

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
            fetchUserSertify(user.users.id).then(data=>{
                courses.setCertificate(data)
            })
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
                    <ListGroup  as="ol" numbered>
                        {
                            courses.certificateData ?
                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <h4>Ваші сертифікати</h4>
                                {
                                    courses.certificateData.map(certificate =>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                            style={{cursor:"pointer"}}
                                            key={certificate.id}
                                        >
                                            <div className="ms-2 me-auto">
                                                {courses.courses.filter(courseFilter=>{
                                                    if(+courseFilter.id === +certificate.courseId){
                                                        return courseFilter
                                                    }
                                                }).map(course=><div className="fw-bold">{course.name}</div>)}
                                                <div style={{fontSize: 12}}>{user.users.email}</div>
                                            </div>
                                            <Badge bg="primary" pill>

                                            </Badge>
                                        </ListGroup.Item>
                                    )
                                }
                            </div>
                                :<div></div>
                        }

                    </ListGroup>
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
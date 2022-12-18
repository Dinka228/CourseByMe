import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, ListGroup, Nav} from "react-bootstrap";
import {Context} from "../index";
import {useHistory, useParams} from 'react-router-dom'
import {createUserCourse, fetchOneCourse, fetchUserCourse} from "../http/courseAPI";
import {TEST_ROUTE} from "../utils/consts";
import {fetchStages} from "../http/stageAPI";

const CoursesPage = observer(() => {
    const [course,setCourse] = useState({})
    const {courses} = useContext(Context)
    const history = useHistory()
    const {user} = useContext(Context)
    const {id} = useParams()
    const count = 1
    useEffect(()=>{
        fetchOneCourse(id).then(data=>setCourse(data))
        fetchStages(id).then(data=>courses.setStages(data))
    },[])
    return (
        <Container className='mt-4'>
            <div className='d-flex flex-column'>
                <Col md={12} style={{height:550}}>
                    <Image src={'http://localhost:5000/'+course.img} width={1300} height={500} rounded={true}/>
                </Col>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{fontSize:25}}>
                        {course.name}
                    </div>
                    <div className='d-flex flex-row justify-content-between'>
                        <div>
                            <Button variant={"outline-success"} onClick={()=>{
                                fetchUserCourse(user.users.id,courses.currCourse.id).then(data=>{
                                    courses.setCurrProgress(data)})
                                history.push(TEST_ROUTE + `/`+course.id)
                            }}>
                            Переглянути курс
                            </Button>
                        </div>
                        <div >
                            <Button variant={"outline-success"} onClick={()=>{
                                createUserCourse(user.users.id,courses.currCourse.id).then(data=>{
                                    courses.setCurrProgress(data)
                                    console.log(data)})
                                history.push(TEST_ROUTE + `/`+course.id)
                            }}>
                            Розпочати курс
                            </Button>
                        </div>
                    </div>
                </div>


            </div>
            <div className="d-flex flex-row">
                <Card className='mt-4 d-flex flex-row'>
                    <Col md={6}  className="d-flex"style={{width:650}}>
                        <div className="m-md-3" style={{fontSize:25}}>
                            З чого складається цей курс?
                        </div>
                        <ListGroup>
                            {courses.stages.map(stages=>
                                <ListGroup.Item

                                    key={stages.id}
                                >
                                    {stages.name}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col md={6}  className="d-flex" style={{width:650}}>
                        <div className="m-md-3" style={{fontSize:25}}>
                            Опис:
                        </div>
                        <Card className='mt-2 mb-2' style={{width:530}}>
                        <div className="m-md-3">
                            {course.description}
                        </div>
                        </Card>
                    </Col>
                </Card>

            </div>

        </Container>
    );
});

export default CoursesPage;
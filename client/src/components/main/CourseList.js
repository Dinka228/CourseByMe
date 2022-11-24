import React, {useContext, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import CourseItem from "./CourseItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {CREATE_ROUTE} from "../../utils/consts";
import CreateCourseModal from "../Modals/CreateCourseModal";

const CourseList = observer(() => {
    const {courses} = useContext(Context)
    const history = useHistory()
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    console.log(user.users)
    return (
        <Container>

            <Row className='d-flex'>
                {courses.courses.filter(course=>{
                    if(courses.selectedThemes.name){
                        if(course.themes === courses.selectedThemes.name){
                            return course
                        }
                    }else{
                        return course
                    }

                }).map(courses=>
                        <CourseItem className="mb-lg-2" key={courses.id} course={courses}/>
                    )}
            </Row>
        </Container>
    );
});

export default CourseList;
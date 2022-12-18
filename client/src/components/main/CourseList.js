import React, {useContext, useState} from 'react';
import {Button, Container, Row,Form} from "react-bootstrap";
import CourseItem from "./CourseItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {CREATE_ROUTE} from "../../utils/consts";
import CreateCourseModal from "../Modals/CreateCourseModal";
import {MDBBtn} from "mdb-react-ui-kit";
import {fetchUserCourse} from "../../http/courseAPI";

const CourseList = observer(() => {
    const {courses} = useContext(Context)
    const history = useHistory()
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [myCourse, setMyCourse] = useState(false)
    const [searchCheck,setSearchCheck]=useState("")
    return (
        <Container>
            <Form.Control
                className='mt-3'
                placeholder="Пошук"
                onChange={e=>{
                    setSearchCheck(e.target.value)
                }}
            />
            <Row className='d-flex'>
                {courses.courses.filter(course=>{
                    if(courses.selectedThemes.name){
                        if(+course.themeId + 1 === +courses.selectedThemes.id){
                            return course
                        }
                    }
                    else if (searchCheck !== "") {
                        if (course.name.startsWith(searchCheck)) {
                            return course
                        }
                    } else {
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
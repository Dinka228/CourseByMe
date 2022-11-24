import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {Button, Card, Col, Image} from "react-bootstrap";
import {Context} from "../../index";
import {PAGE_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";

const CourseItem = observer(({course}) => {
    const history = useHistory()
    const {courses} = useContext(Context)
    const {user} = useContext(Context)
    return (
        <Col md={3}>
            <Card style={{width:200,height:220, cursor:'pointer'}}border={"black"} className='mt-4' onClick={()=>{

                courses.setCurrCourse(course)
                history.push(PAGE_ROUTE + '/' + course.id)

            }}>
                <div className='m-lg-1'>
                    <Image key={course.id} src={'http://localhost:5000/'+course.img} width={190} height={150}/>
                </div>
                <div className="m-lg-1">
                    <div>
                        {course.name}
                    </div>
                </div>
                <div className="m-lg-1 mt-3 d-flex flex-column">
                    <div className='d-flex justify-content-center'>

                    </div>



                </div>


            </Card>
        </Col>
    );
});

export default CourseItem;
import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {Context} from "../index";
import {useHistory, useParams} from "react-router-dom";
import {addUserSertify, fetchOneCourse} from "../http/courseAPI";
import {observer} from "mobx-react-lite";
import TypeBar from "../components/main/TypeBar";
import CostBar from "../components/main/CostBar";
import CourseList from "../components/main/CourseList";
import CourseItem from "../components/main/CourseItem";
import TasksList from "../components/test/TasksList";
import CreateCourseModal from "../components/Modals/CreateCourseModal";
import CreateStage from "../components/Modals/CreateStage";
import {fetchStages} from "../http/stageAPI";
import {fetchCompleteTasks, fetchTasks} from "../http/taskAPI";
import CreateTask from "../components/Modals/CreateTask";
import CreateVariant from "../components/Modals/CreateVariant";
import {checkCorrect, fetchVariants} from "../http/variantAPI";
import {MDBBtn, MDBProgress, MDBProgressBar} from "mdb-react-ui-kit";

const Test = observer(() => {
    const [course,setCourse] = useState({})
    const {courses} = useContext(Context)
    const {user} = useContext(Context)
    const history = useHistory()
    const {id} = useParams()
    const [createStageVisible,setCreateStageVisible] = useState(false)
    const [createTaskVisible,setCreateTaskVisible] = useState(false)
    const [createVariantVisible,setCreateVariantVisible] = useState(false)
    const [colorForVariant,setColorForVariant] = useState('none')
    const [checkTest,setCheckTest] = useState(false)
    const [taskId,setTaskId] = useState('')
    const count = 1
    useEffect(()=>{
        fetchOneCourse(id).then(data=>setCourse(data))
        fetchStages(id).then(data=>courses.setStages(data))
        fetchCompleteTasks(user.users.id).then(data=>{
            courses.setCompleteTask(data)
        })

    },[])
    function sendTest(){
        courses.currTest.map(currTest=>{
            checkCorrect(currTest.id,user.users.id,courses.currCourse.id).then(data=>{
                courses.setCurrProgress(data)
                console.log(data)
            })
        })
        fetchCompleteTasks(user.users.id).then(data=>{
                courses.setCheck(true)
                courses.setCompleteTask(data)
                console.log(courses.completeTask)
        })
    }

    return (
        <Container className='mt-4'>
            <Row className="mt-2">
                <Col md={3}>
                    <ListGroup>
                        {courses.stages.map(stages=>
                            <ListGroup.Item
                                style={{cursor:"pointer"}}
                                active={stages.id === courses.selectedStage.id}
                                onClick={()=>{
                                    if(courses.selectedStage.name){
                                        courses.setSelectedStage({})
                                    }else{
                                        courses.setCheck(true)
                                        courses.setSelectedStage(stages)
                                        courses.setCurrProgressStage(0)
                                        fetchTasks(courses.selectedStage.id).then(data=>courses.setTasks(data))
                                        fetchVariants(courses.selectedStage.id).then(data=>courses.setVariants(data))
                                    }

                                }
                                }
                                key={stages.id}
                            >
                                {stages.name}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    {
                        user.users.role === 'ADMIN' ?
                            <Button className='mt-3' variant={"outline-success"} onClick={()=>setCreateStageVisible(true)}>
                            Додати етап
                        </Button>:<div></div>
                    }
                    <div className='mt-4'>
                        <h3>Progress</h3>
                        <MDBProgress>

                            <MDBProgressBar width={courses.currProgress.progress} valuemin={0} valuemax={100}>{`${courses.currProgress.progress}%`}</MDBProgressBar>
                        </MDBProgress>
                    </div>
                    { courses.currProgress.progress > 75 ?
                        <div className='mt-4'>
                            <h3>You can get certificate</h3>
                            <Button variant={"outline-success"} onClick={()=>{
                                addUserSertify(user.users.id,courses.currCourse.id).then(data=>console.log('Вітаємо'))
                            }
                            }>
                                Get certificate
                            </Button>
                        </div> : <div></div>
                    }

                </Col>
                <Col md={9}>
                    <Card>
                        <Row md={9}>
                            <Col md={3}>
                                {
                                    courses.selectedStage.name ?   <div className='mb-4'>
                                        <h3>{'Progress ' + courses.selectedStage.name}</h3>
                                        <MDBProgress>
                                            <MDBProgressBar width={(100*courses.currProgressStage)/courses.selectedStage.progress} valuemin={0} valuemax={courses.selectedStage.progress} />
                                        </MDBProgress>

                                    </div> : <div></div>
                                }
                            </Col>
                        </Row>


                        {
                            courses.tasks.filter(task=>{
                                if(courses.selectedStage.name){
                                    if(+task.stageId === +courses.selectedStage.id){
                                        return task
                                    }
                                }

                            }).map(tasks=>
                            <TasksList className="mb-lg-2 mt-4" key={tasks.id}
                                       task={tasks} id={courses.selectedStage.id}
                                       onClickCreateVariant={()=>setCreateVariantVisible(true)}
                                       setTaskIdForVariant = {(id)=>{
                                           setTaskId(id)
                                       }
                                       }
                                       check = {checkTest}
                                       sendCheckFalse = {()=>{setCheckTest(false)}}
                            />
                            )
                        }
                        {courses.selectedStage.name && user.users.role === 'ADMIN' ?
                            <Button variant={"outline-success"} onClick={()=>setCreateTaskVisible(true)}>Додати питання</Button>
                            :
                           <div></div>
                         }
                        <Button variant={"outline-success"} onClick={()=>sendTest()}>Відправити відвовіді</Button>
                    </Card>
                </Col>
            </Row>

            <CreateStage show={createStageVisible} onHide={()=>setCreateStageVisible(false)} stageCourse = {course} />
            <CreateTask show={createTaskVisible} onHide={()=>setCreateTaskVisible(false)} stageId = {courses.selectedStage.id} />
            <CreateVariant show={createVariantVisible} onHide={()=>setCreateVariantVisible(false)} stageId = {courses.selectedStage.id} taskId = {taskId}/>
        </Container>
    );
});

export default Test;
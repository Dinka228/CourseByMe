import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {Context} from "../index";
import {useHistory, useParams} from "react-router-dom";
import {fetchOneCourse} from "../http/courseAPI";
import {observer} from "mobx-react-lite";
import TypeBar from "../components/main/TypeBar";
import CostBar from "../components/main/CostBar";
import CourseList from "../components/main/CourseList";
import CourseItem from "../components/main/CourseItem";
import TasksList from "../components/test/TasksList";
import CreateCourseModal from "../components/Modals/CreateCourseModal";
import CreateStage from "../components/Modals/CreateStage";
import {fetchStages} from "../http/stageAPI";
import {fetchTasks} from "../http/taskAPI";
import CreateTask from "../components/Modals/CreateTask";
import CreateVariant from "../components/Modals/CreateVariant";
import {fetchVariants} from "../http/variantAPI";

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

    },[])
    function sendTest(){
        setCheckTest(true)
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
                                        courses.setSelectedStage(stages)
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

                </Col>
                <Col md={9}>
                    <Card>
                        {
                            courses.tasks.filter(task=>{
                                if(courses.selectedStage.name){
                                    if(+task.stageId === +courses.selectedStage.id){
                                        return task
                                    }
                                }

                            }).map(tasks=>
                            <TasksList className="mb-lg-2" key={tasks.id}
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
                            <Button variant={"outline-success"} onClick={()=>sendTest()}>Відправити відвовіді</Button>
                         }

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
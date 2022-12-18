import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import CourseItem from "../main/CourseItem";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import VariantItem from "./VariantItem";
import CreateStage from "../Modals/CreateStage";
import CreateTask from "../Modals/CreateTask";
import {checkCorrect} from "../../http/variantAPI";

const TasksList = observer(({task,id,onClickCreateVariant,setTaskIdForVariant,sendCheckFalse}) => {
    const {courses} = useContext(Context)
    const history = useHistory()
    const {user} = useContext(Context)
    const [varId, setVarId] = useState(null)
    const [color,setColor] = useState('none')
    const [checkForVar,setCheckForVar] = useState(false)
    const [check,setCheck] = useState(true)
    const [checkComplete,setCheckComplete] = useState(false)
    const [correct,setCorrect] = useState('')
    const [choseInput,setChoseInput] = useState(null)
    const [complete,setComplete] = useState('')
    useEffect(()=>{
        console.log('Draste')
        console.log( courses.completeTask)
        courses.completeTask.filter(completeTask => {

            if(+completeTask.taskId === +task.id){
                setCheckComplete(true)
                return completeTask
            }
        })
        return () => {
            courses.setCheck(false)
        }
        },[courses.check])

    function sendVar(id){
        const variantId = {id:id}
        courses.currTest.push(variantId)
        console.log(courses.currTest)

    }
    return (
        <Container>

            <h2>{checkComplete ? `${task.text} (Completed)` : `${task.text}`}</h2>


            <Row className='d-flex flex-column'>
                {courses.variants.filter(variant=>{
                    if(+variant.taskId === +task.id){
                        return variant
                    }
                }).map(variants=>
                    <VariantItem className="mb-lg-2" key={variants.id} variant={variants} setVariantId = {(id)=>{
                        sendVar(id)
                    }} check={check}
                                 correct={correct}
                                 taskName = {task.text}
                                 sendCheckFalse={sendCheckFalse}
                                 setCheckForAnother={()=>{setCheckForVar(true)}}
                                 checkForAnother={checkForVar}
                                 setChoseInput = {(id)=>{
                                     setChoseInput(id)
                                 }}
                                 choseInput={choseInput}
                    />
                )}

            </Row>
            {
                user.users.role === 'ADMIN' ? <Button className='mt-3' variant={"outline-success"} onClick={()=>{
                    setTaskIdForVariant(task.id)
                    onClickCreateVariant()
                }}>
                    Додати варіант відповіді
                </Button> : <div></div>
            }


        </Container>
    );
});

export default TasksList;
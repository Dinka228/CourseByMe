import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {Context} from "../../index";
import {registration} from "../../http/userAPI";
import {COURSE_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import ShowBlock from "../Modals/ShowBlock";
import ShowFail from "../Modals/ShowFail";
import {observer} from "mobx-react-lite";

const VntuRegComp = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [role, setRole] = useState('STUDENT')
    const [blockVisible, setBlockVisible] = useState(false)
    const [newUser, setNewUser] = useState({name:"",email:"",password:"", PIV:"", tele:""})
    const addNewUser = (e) =>{
        e.preventDefault()
        const newUsers={
            ...newUser

        }
        const reg = async ()=>{
            const response = await registration(newUsers.email,newUsers.password,newUsers.PIV,newUsers.name,newUsers.tele,role)
            console.log(response)
            setNewUser({name:"",email:"",password:"", PIV:"", tele:""})
            user.setOneTime(true)
            user.setUser(response)
            user.setIsAuth(true)
            history.push(COURSE_ROUTE)
        }
        reg()
    }
    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height:window.innerHeight-54}}>
            <Card style={{width:600}} className="p-5">
                <h2 className='m-auto'>Реєстрація</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        value={newUser.PIV}
                        onChange={e => setNewUser({...newUser, PIV: e.target.value})}
                        className='mt-3'
                        placeholder="Повне ім'я"
                    />
                    <Form.Control
                        value={newUser.name}
                        onChange={e => setNewUser({...newUser, name: e.target.value})}
                        className='mt-3'
                        placeholder="Ім'я користувача"
                    />
                    <Form.Control
                        value={newUser.email}
                        onChange={e => setNewUser({...newUser, email: e.target.value})}
                        className='mt-3'
                        placeholder='Електронна почта ВНТУ'
                    />
                    <Form.Control
                        value={newUser.tele}
                        onChange={e => setNewUser({...newUser, tele: e.target.value})}
                        className='mt-3'
                        placeholder='Номер телефону'
                    />
                    <Form.Control
                        value={newUser.password}
                        onChange={e => setNewUser({...newUser, password: e.target.value})}
                        className='mt-3'
                        type='password'
                        placeholder='Пароль'
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            Є акаунт? <NavLink to={LOGIN_ROUTE}>Увійти</NavLink>
                        </div>
                        <Button
                            onClick={addNewUser}
                            variant="outline-success"
                        >
                            Зареєструватися
                        </Button>

                    </Row>
                    <ShowBlock show={blockVisible} onHide={()=>setBlockVisible(false)}/>
                    <ShowFail show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
                </Form>
            </Card>
        </Container>

    );
});

export default VntuRegComp;
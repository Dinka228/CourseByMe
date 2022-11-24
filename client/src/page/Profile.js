import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
const Profile = observer(() => {
    const {user} = useContext(Context)
    user.user.filter(users=>{
        if(users.id === user.currUser.id){
            user.setCurrUser(users)
        }
    })
    const [newUserChar, setNewUserChar] = useState({
        id:user.currUser.id,
        name:user.currUser.name,
        email:user.currUser.email,
        phone: +user.currUser.phone,
        surname:user.currUser.surname,
        male:user.currUser.male,
        yearsOld: +user.currUser.yearsOld,
        blocked:false
    })
    return (
        <Container>
            <Card md={6} border={"black"} className="d-flex flex-row justify-content-center mt-auto">
            <Col md={6} >
                <div className='d-flex justify-content-center flex-column'>

                    {/*<Button variant={"outline-success"} onClick={()=>setGoodsVisible(true)}>Змінити</Button>*/}
                    <div>
                        <Form className='d-flex flex-column'>
                            <small id="nameHelp" className="form-text text-muted">Nickname</small>
                            <Form.Control
                                className='mt-3'
                                placeholder={user.currUser.name}
                                aria-describedby="nameHelp"
                                value={newUserChar.name}
                                onChange={e=>setNewUserChar({...newUserChar, name: e.target.value})}
                            />
                            <small id="emailHelp" className="form-text text-muted">Email</small>

                            <Form.Control
                                className='mt-3'
                                placeholder={user.currUser.email}
                                aria-describedby="emailHelp"
                                value={newUserChar.email}
                                onChange={e=>setNewUserChar({...newUserChar, email: e.target.value})}
                            />
                            <small id="teleHelp" className="form-text text-muted">Telephone</small>
                            <div className="d-flex flex-row">
                                <div className="mt-4">
                                    <label htmlFor="">380</label>
                                </div>

                                <Form.Control
                                    className='mt-3'
                                    placeholder={user.currUser.phone}
                                    aria-describedby="teleHelp"
                                    value={newUserChar.phone}
                                    onChange={e=>setNewUserChar({...newUserChar, phone: +e.target.value})}
                                />
                            </div>

                            <small id="pivHelp" className="form-text text-muted">ПІВ</small>
                            <Form.Control
                                className='mt-3'
                                placeholder={user.currUser.surname}
                                aria-describedby="pivHelp"
                                value={newUserChar.surname}
                                onChange={e=>setNewUserChar({...newUserChar, surname: e.target.value})}

                            />


                            <Button className='mt-3'
                                variant="outline-success"
                                // onClick={changeUserSetup}
                            >
                                Зберегти
                            </Button>

                        </Form>
                    </div>
                </div>
            </Col>
            </Card>
            </Container>


    );
});
export default Profile;
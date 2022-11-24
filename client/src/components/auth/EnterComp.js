import React, {useContext, useState} from 'react';
import {Button, Form, Row} from "react-bootstrap";
import {COURSE_ROUTE, LOGIN_ROUTE, REG_ROUTE} from "../../utils/consts";
import {NavLink, useHistory} from "react-router-dom";
import ShowBlock from "../Modals/ShowBlock";
import ShowFail from "../Modals/ShowFail";
import {useLocation} from "react-router";
import {Context} from "../../index";
import {login, registration} from "../../http/userAPI";

const EnterComp = () => {
    const history = useHistory()
    const {user} = useContext(Context)
    const [goodsVisible, setGoodsVisible] = useState(false)
    const [blockVisible, setBlockVisible] = useState(false)
    const [User, setUser] = useState({email:"",password:''})
    const addNewUser = (e) =>{
        try{
            e.preventDefault()
            const Users={
                ...User

            }
            const log = async ()=>{
                const response = await login(Users.email,Users.password)
                console.log(response)
                user.setUser(response)
                user.setIsAuth(true)
                history.push(COURSE_ROUTE)
            }
            log()
        }catch(e){
            alert(e.response.data.message)
        }

    }
    return (
        <Form className='d-flex flex-column'>
            <Form.Control
                value={User.email}
                onChange={e => setUser({...User, email: e.target.value})}
                className='mt-3'
                placeholder='Введіть ваш email...'
            />
            <Form.Control
                value={User.password}
                onChange={e => setUser({...User, password: e.target.value})}
                className='mt-3'
                type="password"
                placeholder='Введіть ваш пароль...'
            />

            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <div>
                    Немає акаунта? <NavLink to={REG_ROUTE}>Зареєструйся!</NavLink>
                </div>
                <Button
                    onClick={addNewUser}
                    variant="outline-success"
                >
                    Увійти
                </Button>

            </Row>
            <ShowBlock show={blockVisible} onHide={()=>setBlockVisible(false)}/>
            <ShowFail show={goodsVisible} onHide={()=>setGoodsVisible(false)}/>
        </Form>
    );
};

export default EnterComp;
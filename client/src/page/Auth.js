import React, {useContext} from 'react';
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {Card, Container} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import {NavLink, useLocation} from "react-router-dom";
import EnterComp from "../components/auth/EnterComp";
import RegComp from "../components/auth/RegComp";
import {registration} from "../http/userAPI";

const Auth = () => {
    const history = useHistory()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)



    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height:window.innerHeight-54}}
        >

            <Card style={{width:600}} className="p-5">
                <h2 className='m-auto'>{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
                {isLogin ?
                    <EnterComp/>
                    :
                    <RegComp/>
                }
            </Card>
        </Container>
    );
};

export default Auth;
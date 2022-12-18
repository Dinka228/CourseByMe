import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {ADMIN_ROUTE, COURSE_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const NavBar = observer( () => {
    const history = useHistory()
    const {user} = useContext(Context)
    const  logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={COURSE_ROUTE}> Онлайн курси</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {(user.users.role === 'ADMIN') ?
                            <Button variant={"outline-light"} onClick={() => {
                                history.push(ADMIN_ROUTE)
                            }
                            }>
                                Адмін панель
                            </Button>
                            :
                            <div>
                                {user.users.name}
                            </div>
                        }

                        <Button variant={"outline-light"} onClick={() => {
                            logOut()
                        }}
                                className="mx-lg-2">Вийти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизація</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
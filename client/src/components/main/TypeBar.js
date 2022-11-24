import React, {useContext} from 'react';
import {ListGroup} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const TypeBar = observer(() => {
    const {courses} = useContext(Context)
    return (
        <ListGroup className="mt-1">
            {courses.themes.map(themes=>
                <ListGroup.Item
                    style={{cursor:"pointer"}}
                    active={themes.id === courses.selectedThemes.id}
                    onClick={()=>{
                        if(courses.selectedThemes.name){
                            courses.setSelectedThemes({})
                        }else{
                            courses.setSelectedThemes(themes)
                        }

                    }
                    }
                    key={themes.id}
                >
                    {themes.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
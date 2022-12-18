import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

const VariantItem = observer(({variant,taskName,setVariantId,sendCheckFalse,setChoseInput}) => {
    const [color,setColor] = useState('none')
    return (
        <div style={{backgroundColor:color, borderRadius:30}}>
            <input type="radio" id={`q`+variant.id} name={taskName} onChange={()=>{
                // setCheckForAnother()
                sendCheckFalse()
                setColor('none')
                setChoseInput(variant.id)
                setVariantId(variant.id)
            }
            }/>
            <label className='m-lg-2' style={{fontSize:25}} htmlFor={`q`+variant.id} >{variant.text}</label>
        </div>
    );
});

export default VariantItem;
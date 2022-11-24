import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

const VariantItem = observer(({variant,setVariantId,check,correct,sendCheckFalse,setCheckForAnother,checkForAnother,setChoseInput,choseInput}) => {
    const [color,setColor] = useState('none')
    useEffect(()=>{
        if(check){
            if(correct==='Yes' && +variant.id === +choseInput){
                setColor('green')
            }
            else if (correct==='No' && +variant.id === +choseInput){
                setColor('red')
            }
            else if(+variant.id !== +choseInput){
                setColor('none')
            }
        }
        // if(checkForAnother && +variant.id === +choseInput){
        //     setColor('none')
        // }
    })
    return (
        <div style={{backgroundColor:color, borderRadius:30}}>
            <input type="radio" id={`q`+variant.id} name={`q`+variant.id} onChange={()=>{
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
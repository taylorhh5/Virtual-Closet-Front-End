import React, { useState } from 'react'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Demo() {

    // const [state, setstate] = useState(new Date())
    // console.log(state,"calendar state")
    // const onChange = state => {
    //     setstate(state)
    // }
    
    const [date, setdate] = useState(new Date())
const handleChange = date => {
        setdate(date)
    }
    console.log(date.toLocaleDateString(),"datepicker")
    return (
        <div>
            <h1>Ddemo</h1>
           {/* <h1> Date is {state.toLocaleDateString()}</h1> */}
           
            {/* <Calendar
     onChange={onChange}
            value={state}
            /> */}
            <DatePicker
            selected={date}
            onChange={handleChange}
            />
            <h1>{date.toLocaleDateString()}</h1>
        </div>
    )
}

export default Demo

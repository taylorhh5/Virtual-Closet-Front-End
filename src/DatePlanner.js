import React, { useState, useEffect } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function DatePlanner() {
  const category_id = localStorage.getItem("category_id");

  const [clothing, setClothing] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/closet/clothing")
      .then((response) => {
        console.log(response.data, "response.data");
        setClothing(response.data);
      })
      .catch((error) => console.log("error"));
  }, []);

  const [state, setstate] = useState(new Date());
  console.log(state.toLocaleDateString(), "calendar state");

  const onChange = (state) => {
    setstate(state);
  };

  //     const [date, setdate] = useState(new Date())
  // const handleChange = date => {
  //         setdate(date)
  //     }
  //     console.log(date.toLocaleDateString(),"datepicker")

  const userClothing = clothing.filter(
    (data) =>
      `${data.category_id}` === category_id && `${data.date}` === { state }
  );
  return (
    <div>
      <h1>Planner</h1>
      <h1> Date is {state.toLocaleDateString()}</h1> */}
       <Calendar
     onChange={onChange}
            value={state}
            />
            {/* <DatePicker
            selected={date}
            onChange={handleChange}
            />
            <h1>{date.toLocaleDateString()}</h1> */}
    </div>
  );
}

export default DatePlanner;

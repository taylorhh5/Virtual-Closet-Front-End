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
  let dateString = state.toLocaleDateString()
  console.log(dateString.toString(), "dateString")

  //     const [date, setdate] = useState(new Date())
  // const handleChange = date => {
  //         setdate(date)
  //     }
  //     console.log(date.toLocaleDateString(),"datepicker")

  const userClothing = clothing.filter(
    (data, dateString) =>
      `${data.category_id}` === category_id && `${data.date}` === "10/31/2020" 
  );
  return (
    <div>
      <h1>Planner</h1>
      <h1> Date is {state.toLocaleDateString()}</h1> 
      <h3>{dateString}</h3>
       <Calendar
     onChange={onChange}
            value={state}
            />
            {/* <DatePicker
            selected={date}
            onChange={handleChange}
            />
            <h1>{date.toLocaleDateString()}</h1> */}
                  <section>
        {userClothing.map((clothing) => {
          return (
            <div key={clothing.id}>
              <h1> {clothing.name}</h1>

              <img className="clothing-img" src={clothing.image_url} />
              <h3>{clothing.description}</h3>
              <h3>{clothing.date}</h3>
              
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default DatePlanner;

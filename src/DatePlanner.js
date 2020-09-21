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

  const [calendar, setCalendar] = useState(new Date());
  console.log(calendar.toLocaleDateString(), "calendar calendar");

  const onChange = (calendar) => {
    setCalendar(calendar);
  };
  let dateString = calendar.toLocaleDateString();

  const userClothing = clothing.filter(
    (data) =>
      `${data.category_id}` === category_id && `${data.date}` === dateString
  );
  return (
    <div>
      <h1>Planner</h1>
      <h1> Date is {calendar.toLocaleDateString()}</h1>
      <Calendar onChange={onChange} value={calendar} />

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

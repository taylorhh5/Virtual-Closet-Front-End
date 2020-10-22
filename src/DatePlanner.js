import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./DatePlanner.scss";

function DatePlanner() {
    //getting user id from local storage that was saved on login
  const user_id = localStorage.getItem("user_id");

  //state for get clothing request
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

  //state for calendar date picker
  const [calendar, setCalendar] = useState(new Date());

  // onChange for calendar date picker
  const onChange = (calendar) => {
    setCalendar(calendar);
  };

  //   let dateString = calendar.toLocaleDateString();

  //filter to get clothing that matches the user id and the calendar date
  const userClothing = clothing.filter(
    (data) =>
      `${data.user_id}` === user_id &&
      `${data.date}` === calendar.toLocaleDateString()
  );
  return (
    <div>
      <h1 className="cat-name">Your planned outfits for {calendar.toLocaleDateString()}.</h1>
      <div className="calendar-container">
      <Calendar onChange={onChange} value={calendar} />
</div>
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

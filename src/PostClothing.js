import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router";

const PostClothing = (props) => {
  const category_id = localStorage.getItem("category_id");
  const user_id = localStorage.getItem("user_id");
  const category_name = localStorage.getItem("category_name");

  const [calendar, setCalendar] = useState(new Date());


  //set calendar to calendar 
  //and set clothing to ...clothing, date:calendar
  //had to add so that clothing.date would be updated when picking a new date
  const handleDateChange = (calendar) => {
    
    setCalendar(calendar);
    setClothing({
      ...clothing, date:calendar.toLocaleDateString(), 
    })
  };
  console.log(calendar, "datepicker");

  // const details = {
  //   name: "",
  //   description: "",
  //   image_url: "",
  //   date: calendar,
  //   user_id: user_id,
  //   category_id: category_id,
  // };
  const [clothing, setClothing] = useState({
    name: "",
  description: "",
  image_url: "",
  date: "",
  user_id: user_id,
  category_id: category_id,});
  console.log(clothing, "clothing state");



  const handleChange = (event) => {
    event.persist();
   
    setClothing({
      ...clothing, 
      [event.target.name]: event.target.value, 
    });
   
  };

  const handleForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/closet/clothing", clothing)
      .then((response) => {
        console.log(response, "post clothing response");
        props.history.push("/profile");
      })
      .catch((err) => alert("Clothing could not be added, please try again"));
  };

  return (
    <>
      <form className="registerForm" onSubmit={handleForm}>
        <h1 className="signup">Add clothing to {category_name}</h1>

        <input
          className="registerInput"
          type="text"
          name="name"
          value={clothing.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="registerInput"
          type="text"
          name="description"
          value={clothing.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          className="registerInput"
          type="text"
          name="image_url"
          value={clothing.image_url}
          onChange={handleChange}
          placeholder="Image URL"
        />
        {/* <input
          className="registerInput"
          type="date"
          name="date"
          value={clothing.date}
          onChange={handleChange}
          placeholder="Date"
        /> */}

        <button className="signup-button">Add Clothing</button>
      </form>
      <DatePicker selected={calendar} onChange={handleDateChange} />
    </>
  );
};

export default PostClothing;

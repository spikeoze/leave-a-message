import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

//? ENV KEY
const url =process.env.REACT_APP_URL



const Messages = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("Anonymous");

  // input ref
  const nameFocus = useRef(null);
  const messageFocus = useRef("");

  // dummy div for scroll ref
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      
    });
  };

  // get request, useRef for focus when rendering
  useEffect(() => {
    axios.get("https://leave-a-message.herokuapp.com/messages").then((res) => {
      setAllMessages(res.data);
    });

    nameFocus.current.focus();
    messageFocus.current.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();``
  }, [message]);

  // post request
  const handleSubmit = (e) => {
    e.preventDefault();

   axios
      .post("https://leave-a-message.herokuapp.com/messages", { name: name, message: message })
      .then((res) => {
        setAllMessages([...allMessages, { name: name, message }]);
      });

    // sets input to empty
    setMessage("");
  };

  return (
    <section className="section center">
      <div className="title">
        <h1>leave a message</h1>
        <p><a href="https://github.com/spikeoze/leave-a-message">Source Code</a></p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            className="form-input"
            ref={nameFocus}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="message">Message</label>
          <input
            className="form-input"
            ref={messageFocus}
            required
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          post
        </button>
      </form>

      <div className="message-container scroll">
        {allMessages.map((item) => {
          const { _id, name, message } = item;
          return (
            <div key={_id} className="single-message">
              <h5>{name}</h5>
              <div className="underline"></div>
              <p>{message}</p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </section>
  );
};

export default Messages;

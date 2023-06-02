import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useFormik } from "formik";
import { sendMessage } from "../store/reducer";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loader, messagesGot, username, messagesSend } = useAppSelector(
    (state) => state.app
  );
  const formik = useFormik({
    initialValues: {
      to: "",
      from: username,
      title: "",
      body: "",
      when: "",
    },
    onSubmit(val) {
      dispatch(
        sendMessage({
          ...val,
          when: new Date().toLocaleString("en-Us", {
            day: "2-digit",
            year: "numeric",
            month: "long",
            hour: "numeric",
            minute: "2-digit",
            weekday: "short",
          }),
        })
      );
    },
  });
  return (
    <div className="root">
      <div className="chat">
        <h2>Write to who you want to text</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            onChange={formik.handleChange}
            placeholder="To..."
            name=""
            id="to"
          />
          <input
            onChange={formik.handleChange}
            type="text"
            placeholder="Title"
            name=""
            id="title"
          />
          <textarea
            onChange={formik.handleChange}
            placeholder="Message..."
            id="body"
          />
          <button type="submit">Send</button>
        </form>
      </div>
      {loader ? (
        <div className="loader">Загрузка</div>
      ) : (
        <div className="messages">
          <div className="got">
            Incoming messages
            {messagesGot.length != 0 ? (
              messagesGot.map((e, i) => (
                <div key={i}>
                  <Accordion className="raw">
                    <AccordionSummary className="title">
                      {" "}
                      <b>{e.from} </b> <span>{e.title}</span> at {e.when}
                    </AccordionSummary>
                    <AccordionDetails className="body">
                      <div className="body">
                        <div className="text">{e.body}</div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="raw">Empty</div>
            )}
          </div>
          <div className="send">
            Sended
            {messagesSend.length != 0 ? (
              messagesSend.map((e, i) => (
                <div key={i}>
                  <Accordion className="raw">
                    <AccordionSummary className="title">
                      {" "}
                      <b>{e.title}</b> to <span>{e.to} </span> at {e.when}
                    </AccordionSummary>
                    <AccordionDetails className="body">
                      <div className="body">
                        <div className="text">{e.body}</div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="raw">Empty</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

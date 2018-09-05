import React from "react";

function AuthButton(props) {
  console.log(props);
  let text = props.user.email ? "Logout" : "Login";
  return <button onClick={props.onClick}>{text}</button>;
}

export default AuthButton;

import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) =>
    fetch(" http://localhost:8080/api/v2/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" ref={register} />
      <input type="submit" />
    </form>
  );
}

// import React, { useState, useRef } from "react";

// const UserSignUp = () => {
//   const [user, setUser] = useState("");
//   const form = useRef(null);

//   const submit = (e) => {
//     e.preventDefault();

//     const data = new FormData(form.current);
//     console.log(data);
//   };

//   return (
//     <form ref={form} onSubmit={submit}>
//       <label>First Name:</label>

//       <input
//         type="text"
//         value={user}
//         onChange={(e) => setUser(e.target.value)}
//         name="firstName"
//       />
//       <input type="submit" value="Add user" />
//     </form>
//   );
// };

// export default UserSignUp;

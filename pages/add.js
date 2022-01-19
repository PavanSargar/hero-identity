import React, { useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

function AddNewHero() {
  const router = useRouter();
  const [form, setform] = useState({
    superHero: "",
    realName: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios("http://localhost:3000/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(form),
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="display-3">Add a new Hero identity.</h1>
      <div style={{ width: "24rem" }}>
        <form onSubmit={handleForm}>
          <MDBInput
            onChange={handleChange}
            label="SuperHero"
            name="superHero"
            type="text"
            className="my-4"
            size="lg"
          />
          <MDBInput
            onChange={handleChange}
            label="realName"
            name="realName"
            type="text"
            className="my-4"
            size="lg"
          />
          <MDBBtn type="submit">Add Hero</MDBBtn>
        </form>
      </div>
    </div>
  );
}

export default AddNewHero;

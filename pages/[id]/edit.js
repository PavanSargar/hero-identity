import React, { useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

function EditHero({ hero }) {
  const router = useRouter();
  const heroId = router.query.id;

  const [form, setform] = useState({
    superHero: hero.superHero,
    realName: hero.realName,
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
      const res = await Axios(`http://localhost:3000/api/hero/${heroId}`, {
        method: "PUT",
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
      <h1 className="display-3">Edit Hero.</h1>
      <div style={{ width: "24rem" }}>
        <form onSubmit={handleForm}>
          <MDBInput
            onChange={handleChange}
            label="SuperHero"
            name="superHero"
            type="text"
            className="my-4"
            size="lg"
            value={form.superHero}
          />
          <MDBInput
            onChange={handleChange}
            label="realName"
            name="realName"
            type="text"
            className="my-4"
            size="lg"
            value={form.realName}
          />
          <MDBBtn type="submit">Edit a Hero</MDBBtn>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  const res = await Axios(`http://localhost:3000/api/hero/${id}`);
  const { hero } = res.data;
  console.log(hero);
  return {
    props: { hero },
  };
}

export default EditHero;

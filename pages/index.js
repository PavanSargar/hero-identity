import React from "react";
import Link from "next/link";
import Axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

const index = ({ heros }) => {
  return (
    <div className="container">
      <h1 className="display-2 text-center m-5">Superhero Identity Manager</h1>
      {heros.map((hero, i) => (
        <div key={i} className="d-flex justify-content-center ">
          <MDBCard
            className="border border-2 my-3 mx-3"
            style={{ maxWidth: "22rem" }}
          >
            <MDBCardBody>
              <MDBCardTitle>{hero.superHero}</MDBCardTitle>
              <MDBCardText>Reveal Identity</MDBCardText>
              <Link href={`/${hero._id}`}>
                <MDBBtn className="me-3">View Hero</MDBBtn>
              </Link>
              <Link href={`/${hero._id}/edit`}>
                <MDBBtn>Edit Hero</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await Axios("http://localhost:3000/api/hero");
  const { heros } = res.data;
  return {
    props: { heros },
  };
}

export default index;

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
import { useRouter } from "next/router";

function EachHero({ hero }) {
  const router = useRouter();
  const heroId = router.query.id;

  const deleteHero = async () => {
    try {
      const deletedHero = await Axios(
        `http://localhost:3000/api/hero/${heroId}`,
        {
          method: "DELETE",
        }
      );
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container ">
      <h1 className="text-center m-5 display-3">Identity of Hero</h1>
      <div className="d-flex justify-content-center">
        <MDBCard className="border border-2" style={{ maxWidth: "40rem" }}>
          <MDBCardBody>
            <MDBCardTitle>{hero.superHero}</MDBCardTitle>
            <MDBCardText>{hero.realName}</MDBCardText>

            <MDBBtn className="me-3">Edit Hero</MDBBtn>
            <MDBBtn onClick={deleteHero} className="btn btn-danger">
              Delete Hero
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
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

export default EachHero;

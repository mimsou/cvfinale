 
import React from "react";
 
import {
  Container,
  Row
} from "reactstrap";

//const user = User.getUser()

const AdminNavbar = () => {

   

  return (
    <>
    <Container>
      <Row >
        <div style={{display:"inner-block",margin:"auto"}}>
         <img
               className=" mt-4	d-sm-none d-md-block"
              alt="..."
              src={
                require("../../assets/img/brand/logo.png").default
              }
            />
            </div>
            </Row>
            </Container>
    </>
  );
};

export default AdminNavbar;

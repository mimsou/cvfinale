import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import {
  Container,
  Row
} from "reactstrap";

import AdminHeader from "components/Headers/AdminHeader.js";

const getUser = () => {
  AuthService.getCurrentUser();
};

const Index = (props) => {
  return (
    <>
      <AdminHeader />
      <Container className="mt--7" fluid>
        <Row>
         
            </Row>
      </Container>
    </>
  );
};

export default Index;

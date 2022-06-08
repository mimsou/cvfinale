import React, { useState } from "react";


import AuthService from "../../services/auth.service";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";


import AdminHeader from "components/Headers/AdminHeader.js";

const getUser = () => {
  AuthService.getCurrentUser();
};

const User = (props) => {
  return (
    <>
      <AdminHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader>Utilisateurs</CardHeader>
              <Button
                onClick={() => {
                  getUser();
                }}
              >
                {" "}
                getCurrentUser{" "}
              </Button>
              <CardBody>
                <br></br>
                <br></br>
                <br></br>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default User;

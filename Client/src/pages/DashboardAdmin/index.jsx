import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Panel de Administrador
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/team/addplayer"
      >
        Crear equipo
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/team/list"
      >
        Lista de equipos
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/matchdaycreate"
      >
        Crear jornada
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ margin: "10px 0" }}
        component={Link}
        to="/matchday"
      >
        Ver jornada
      </Button>
    </Container>
  );
};

export default AdminDashboard;

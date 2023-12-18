import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/user/657865a6b86d5c3e8847a72a`)
      .then(({ data }) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setLoading(false); // Manejar el error y marcar la carga como completa
      });
  }, []);

  const handleJornadasClick = () => {
    if (loading) {
      return <p>Cargando...</p>;
    }
  };

  // Muestra un mensaje de carga mientras se obtiene la información del usuario
  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        {/* Equipo */}
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6">Equipo:</Typography>
            <Typography variant="subtitle1">
              {userData.team ? userData.team.name : "No asignado"}
            </Typography>
          </Paper>
        </Grid>
        {/* Posición */}
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6">Posición:</Typography>
            <Typography variant="subtitle1">{userData.position}</Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* Botón Jornadas */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleJornadasClick}
        style={{ position: "absolute", top: 100, right: 50 }}
      >
        Jornadas
      </Button>
    </Container>
  );
};

export default ProfilePage;

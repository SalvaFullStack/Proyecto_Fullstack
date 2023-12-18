import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");

  const handleSaveTeam = () => {
    // Lógica para guardar el equipo en el backend
    axios
      .post("http://localhost:3000/api/teams", { name: teamName })
      .then((response) => {
        console.log("Equipo creado:", response.data);
        // Puedes redirigir o hacer otras acciones después de crear el equipo
      })
      .catch((error) => {
        console.error("Error al crear el equipo:", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crear Equipo
          </Typography>
          <Button color="inherit" component={Link} to="/teams">
            Lista de Equipos
          </Button>
          <Button color="inherit" component={Link} to="/matchday">
            Ver Jornada
          </Button>
          <Button color="inherit" component={Link} to="/create-matchday">
            Crear Jornada
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h5" align="center" gutterBottom>
        Nuevo Equipo
      </Typography>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Nombre del Equipo"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSaveTeam}
        disabled={!teamName}
        sx={{ marginTop: 2 }}
      >
        Guardar
      </Button>
    </Container>
  );
};

export default CreateTeam;

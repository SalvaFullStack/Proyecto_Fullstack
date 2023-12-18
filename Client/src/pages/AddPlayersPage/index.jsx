import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const TeamCreationPage = () => {
  const [teamName, setTeamName] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    // Obtener la lista completa de jugadores al cargar la página
    axios.get("http://localhost:3000/api/users").then((response) => {
      setAllPlayers(response.data);
      setFilteredPlayers(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setPositionFilter(event.target.value);
    filterPlayers(event.target.value);
  };

  const filterPlayers = (position) => {
    if (position === "") {
      setFilteredPlayers(allPlayers);
    } else {
      const filtered = allPlayers.filter(
        (player) => player.position === position
      );
      setFilteredPlayers(filtered);
    }
  };

  const handleAddPlayer = (player) => {
    // Añadir jugador a la lista del equipo
    setSelectedPlayers([...selectedPlayers, player]);
    // Filtrar jugador de la lista general
    const filtered = filteredPlayers.filter((p) => p._id !== player._id);
    setFilteredPlayers(filtered);
  };

  const handleRemovePlayer = (player) => {
    // Quitar jugador de la lista del equipo
    const updatedPlayers = selectedPlayers.filter((p) => p._id !== player._id);
    setSelectedPlayers(updatedPlayers);
    // Agregar jugador de nuevo a la lista general
    setFilteredPlayers([...filteredPlayers, player]);
  };

  const handleSaveTeam = () => {
    // Lógica para guardar el equipo en el backend
    axios
      .post("http://localhost:3000/api/teams", {
        name: teamName,
        players: selectedPlayers.map((player) => player._id),
      })
      .then((response) => {
        console.log("Equipo creado:", response.data);
        // Puedes redirigir o hacer otras acciones después de crear el equipo
      })
      .catch((error) => {
        console.error("Error al crear el equipo:", error);
      });
  };

  return (
    <Container component="main" maxWidth="md">
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
        Nuevo Equipo: {teamName}
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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* Lista de jugadores generales */}
          <Paper>
            <Typography variant="h6" align="center" gutterBottom>
              Todos los Jugadores
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Filtrar por Posición"
              value={positionFilter}
              onChange={handleFilterChange}
            />
            <List>
              {filteredPlayers.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText
                    primary={player.username}
                    secondary={player.position}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddPlayer(player)}
                  >
                    Añadir
                  </Button>
                </ListItem>
              ))}
            </List>
            <Button variant="contained" color="primary" fullWidth>
              Añadir Jugador
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {/* Lista de jugadores del equipo */}
          <Paper>
            <Typography variant="h6" align="center" gutterBottom>
              Jugadores del Equipo
            </Typography>
            <List>
              {selectedPlayers.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText
                    primary={player.username}
                    secondary={player.position}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemovePlayer(player)}
                  >
                    Quitar
                  </Button>
                </ListItem>
              ))}
            </List>
            <Button variant="contained" color="primary" fullWidth>
              Quitar Jugador
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSaveTeam}
        disabled={!teamName || selectedPlayers.length === 0}
        sx={{ marginTop: 2 }}
      >
        Guardar Equipo
      </Button>
    </Container>
  );
};

export default TeamCreationPage;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teams");
        if (isMounted.current) {
          setTeams(response.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to prevent state updates on unmounted component
      isMounted.current = false;
    };
  }, []);

  const handleDeleteTeam = async (teamId) => {
    try {
      // Realizar la solicitud de borrado
      await axios.delete(`http://localhost:3000/api/teams/${teamId}`);

      // Actualizar la lista de equipos después del borrado
      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== teamId));

      // Opcional: Puedes agregar una notificación de éxito aquí si lo deseas
    } catch (error) {
      console.error("Error al borrar el equipo:", error);
      // Opcional: Puedes agregar una notificación de error aquí si lo deseas
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Lista de Equipos
        </Typography>
        <div>
          <Button
            component={Link}
            to="/team/addplayer"
            color="primary"
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Crear equipo
          </Button>
          <Button
            component={Link}
            to="/matchdaycreate"
            color="primary"
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Crear jornada
          </Button>
          <Button
            component={Link}
            to="/matchday"
            color="primary"
            variant="contained"
          >
            Ver jornada
          </Button>
        </div>
      </div>

      <List>
        {teams.map((team) => (
          <ListItem key={team._id}>
            <ListItemText primary={team.name} />
            <Button
              onClick={() => handleDeleteTeam(team._id)}
              color="primary"
              variant="contained"
              startIcon={<CreateIcon />}
            >
              Borrar Equipo
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TeamListPage;

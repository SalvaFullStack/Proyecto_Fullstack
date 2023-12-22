import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState({});
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/teams/${teamId}`
        );
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchData();
  }, [teamId]);

  const handleDeletePlayer = async (playerId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/teams/${teamId}/removePlayer/${playerId}`
      );

      setTeam((prevTeam) => {
        const updatedPlayers = prevTeam.players.filter(
          (player) => player._id !== playerId
        );
        return { ...prevTeam, players: updatedPlayers };
      });
    } catch (error) {
      console.error("Error deleting player from team:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Detalles del Equipo
      </Typography>
      <Button
        component={Link}
        to="/team/list"
        sx={{
          backgroundColor: "#424459",
          color: theme.palette.common.white,
        }}
        variant="contained"
        size="small"
      >
        Volver a la lista
      </Button>

      <List>
        <ListItem>
          <ListItemText primary={`Equipo: ${team.name}`} />
          <Typography variant="h6">Jugadores:</Typography>
          <List>
            {team.players &&
              team.players.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText
                    primary={player.username}
                    secondary={player.position}
                  />

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#25273a",
                      color: theme.palette.common.white,
                    }}
                    onClick={() => handleDeletePlayer(player._id)}
                    startIcon={<DeleteIcon />}
                  ></Button>
                </ListItem>
              ))}
          </List>
        </ListItem>
      </List>
    </Container>
  );
};

export default TeamDetailPage;

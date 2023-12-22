import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import apiClient from "src/services/api-client";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const isMounted = useRef(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/teams");
        if (isMounted.current) {
          setTeams(response.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleDeleteTeam = async (teamId) => {
    try {
      await apiClient.delete(`/teams/${teamId}`);

      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== teamId));
    } catch (error) {
      console.error("Error al borrar el equipo:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          component={Link}
          to="/team/addplayer"
          sx={{
            backgroundColor: "#415cbd",
            color: theme.palette.common.white,
          }}
          variant="contained"
          size="small"
          style={{ marginRight: "10px" }}
        >
          Crear equipo
        </Button>
        <Button
          component={Link}
          to="/matchdaycreate"
          color="primary"
          sx={{
            backgroundColor: "#a48e00",
            color: theme.palette.common.white,
          }}
          variant="contained"
          size="small"
          style={{ marginRight: "10px" }}
        >
          Crear jornada
        </Button>
        <Button
          component={Link}
          to="/matchday"
          sx={{
            backgroundColor: "#424459",
            color: theme.palette.common.white,
          }}
          variant="contained"
          size="small"
        >
          Ver jornada
        </Button>
      </div>

      <List>
        <Typography>
          <h1>EQUIPOS</h1>
        </Typography>
        {teams.map((team) => (
          <ListItem key={team._id}>
            <ListItemText primary={team.name} />
            <Button
              sx={{
                backgroundColor: "#c7ceea",
                color: theme.palette.common.black,
              }}
              variant="contained"
              size="small"
              component={Link}
              to={`/team/${team._id}`}
              startIcon={<BorderColorIcon />}
            ></Button>
            <Button
              onClick={() => handleDeleteTeam(team._id)}
              sx={{
                backgroundColor: "#25273a",
                color: theme.palette.common.white,
              }}
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
            ></Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TeamListPage;

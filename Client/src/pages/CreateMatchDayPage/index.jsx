import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  InputAdornment,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const CreateMatchdayPage = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [matchdayResults, setMatchdayResults] = useState(Array(8).fill(""));

  useEffect(() => {
    // Obtener la lista de equipos al cargar la página
    axios
      .get("http://localhost:3000/api/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const handleTeamChange = (index, teamId) => {
    // Actualizar el equipo seleccionado en el estado
    const updatedTeams = [...selectedTeams];
    updatedTeams[index] = teamId;
    setSelectedTeams(updatedTeams);
  };

  const handleResultChange = (index, value) => {
    // Actualizar el resultado ingresado en el estado
    const updatedResults = [...matchdayResults];
    updatedResults[index] = value;
    setMatchdayResults(updatedResults);
  };

  const handleSaveMatchday = () => {
    // Lógica para guardar la jornada
    console.log("Equipos seleccionados:", selectedTeams);
    console.log("Resultados:", matchdayResults);
  };

  return (
    <Container component="main" maxWidth="md">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Crear Jornada
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
            to="/team/list"
            color="primary"
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Lista de equipos
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

      <Grid container spacing={2}>
        {[0, 1, 2, 3].map((row, rowIndex) => (
          <Grid container item key={row} justifyContent="space-between">
            {[0, 1].map((col) => (
              <Grid item xs={5} key={col}>
                <Paper style={{ padding: "10px" }}>
                  <FormControl fullWidth>
                    <InputLabel id={`team-label-${row}-${col}`}>
                      Equipo
                    </InputLabel>
                    <Select
                      labelId={`team-label-${row}-${col}`}
                      id={`team-${row}-${col}`}
                      value={selectedTeams[row * 2 + col] || ""}
                      label="Equipo"
                      onChange={(e) =>
                        handleTeamChange(row * 2 + col, e.target.value)
                      }
                    >
                      {teams.map((team) => (
                        <MenuItem key={team._id} value={team._id}>
                          {team.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      fullWidth
                      type="number"
                      id={`result-${row}-${col}`}
                      label="Resultado"
                      variant="outlined"
                      value={matchdayResults[row * 2 + col]}
                      onChange={(e) =>
                        handleResultChange(row * 2 + col, e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {col === 0 ? "I" : "D"}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveMatchday}
          >
            Guardar Jornada
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateMatchdayPage;

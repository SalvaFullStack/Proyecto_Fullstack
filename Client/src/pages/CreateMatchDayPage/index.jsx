import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  useTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import apiClient from "src/services/api-client";

import { useForm } from "react-hook-form";

const CreateMatchdayPage = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [matchday, setMatchday] = useState({});
  const [matchdayResults, setMatchdayResults] = useState(Array(8).fill(""));
  const theme = useTheme();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    apiClient
      .get("/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });

    apiClient.get("/matchday/last").then(({ data }) => {
      if (!data.current) return;

      setMatchday(data);
    });
  }, []);

  const handleTeamChange = (index, teamId) => {
    const existingTeam = selectedTeams.find(
      (selectedTeam) => selectedTeam === teamId
    );

    if (existingTeam) {
      toast.error("Los equipos no pueden jugar contra sí mismos");

      return;
    }

    const updatedTeams = [...selectedTeams];
    updatedTeams[index] = teamId;
    setSelectedTeams(updatedTeams);
  };

  const handleResultChange = (index, value) => {
    const updatedResults = [...matchdayResults];
    updatedResults[index] = value;
    setMatchdayResults(updatedResults);
  };

  const handleSaveMatchday = async () => {
    const matchdayData = {
      matches: selectedTeams.map((teamId, index) => ({
        homeTeam: teamId,
        awayTeam: selectedTeams[(index + 1) % selectedTeams.length],
        result: matchdayResults[index],
      })),
    };

    try {
      const response = await apiClient.post("/matchday", matchdayData);
      console.log("Jornada guardada:", response.data);
      toast.success("Jornada guardada exitosamente");
    } catch (error) {
      console.error("Error al guardar la jornada:", error);
      toast.error("Error al guardar la jornada");
    }
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
            to="/team/list"
            sx={{
              backgroundColor: "#a48e00",
              color: theme.palette.common.white,
            }}
            size="small"
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Lista de equipos
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

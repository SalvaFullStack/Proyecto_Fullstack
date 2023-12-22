import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import apiClient from "src/services/api-client";

import { useForm, useFieldArray } from "react-hook-form";

const CreateMatchdayPage = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [matchday, setMatchday] = useState({});
  const [matchdayResults, setMatchdayResults] = useState(Array(8).fill(""));
  const theme = useTheme();

  const { control, register, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "matches",
  });

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

  const onSubmit = (data) => {
    const mappedData = {
      matches: data.matches.map((item) => ({
        homeTeam: item.homeTeam,
        awayTeam: item.awayTeam,
        result: item.homeTeamResult + "-" + item.awayTeamResult,
      })),
    };
    console.log(mappedData);
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

          <Button
            onClick={() => append()}
            sx={{
              size: "large",
              backgroundColor: "#606060",
              color: theme.palette.common.white,
              marginLeft: 10,
            }}
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
          ></Button>
        </div>
      </div>

      <Grid
        container
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
      >
        {fields.map((field, index) => (
          <Grid container item key={field.id} justifyContent="space-between">
            <Grid item xs={5}>
              <Paper style={{ padding: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id={`team-label-${index}-0`}>Equipo</InputLabel>

                  <Select
                    {...register(`matches.${index}.homeTeam`)}
                    labelId={`team-label-${index}-0`}
                    id={`team-${index}-0`}
                    label="Equipo"
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
                    id={`result-${index}-0`}
                    label="Resultado"
                    variant="outlined"
                    {...register(`matches.${index}.homeTeamResult`)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">I</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Paper>
            </Grid>

            <Grid item xs={5}>
              <Paper style={{ padding: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id={`team-label-${index}-1`}>Equipo</InputLabel>
                  <Select
                    labelId={`team-label-${index}-1`}
                    id={`team-${index}-1`}
                    label="Equipo"
                    {...register(`matches.${index}.awayTeam`)}
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
                    id={`result-${index}-1`}
                    label="Resultado"
                    variant="outlined"
                    {...register(`matches.${index}.awayTeamResult`)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">D</InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            sx={{
              size: "large",
              backgroundColor: "#606060",
              color: theme.palette.common.white,
            }}
            startIcon={<SaveIcon />}
            type="submit"
          >
            Guardar Jornada
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateMatchdayPage;

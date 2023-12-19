import React from "react";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

const MatchTable = styled(Table)({
  minWidth: 650,
  "& th, td": {
    textAlign: "center",
    padding: "8px",
  },
});

const StyledContainer = styled(Container)({
  position: "relative",
});

const StyledButton = styled(Button)({
  position: "absolute",
  top: "-20px",
  right: "-100px",
});

const BackButton = styled(Button)({
  position: "absolute",
  top: "-25px",
  left: "-95px",
});

const handleSaveButtonClick = async () => {
  // Lógica para guardar la jornada
  const newMatchday = {
    // Detalles de la jornada (equipo local, goles, equipo visitante, etc.)
  };

  try {
    // Realiza una solicitud POST al backend para guardar la jornada
    const response = await axios.post(
      "http://localhost:3000/api/matchdays",
      newMatchday
    );
    console.log("Jornada guardada:", response.data);
  } catch (error) {
    console.error("Error al guardar la jornada:", error);
  }
};

const MatchdayPage = () => {
  const matches = [
    { homeTeam: "Equipo A", awayTeam: "Equipo B", homeGoals: 2, awayGoals: 1 },
    { homeTeam: "Equipo C", awayTeam: "Equipo D", homeGoals: 0, awayGoals: 0 },
    { homeTeam: "Equipo E", awayTeam: "Equipo F", homeGoals: 3, awayGoals: 2 },
    { homeTeam: "Equipo G", awayTeam: "Equipo H", homeGoals: 1, awayGoals: 1 },
  ];

  const handleBackButtonClick = async () => {
    // Lógica para consultar jornadas anteriores
    try {
      // Realiza una solicitud GET al backend para obtener todas las jornadas
      const response = await axios.get("http://localhost:3000/api/matchdays");
      console.log("Jornadas anteriores:", response.data);
      // Aquí puedes actualizar el estado de tu componente con las jornadas anteriores y mostrarlas
    } catch (error) {
      console.error("Error al obtener las jornadas anteriores:", error);
    }
  };

  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <MatchTable>
          <TableHead>
            <TableRow>
              <TableCell>Equipo Local</TableCell>
              <TableCell>Goles</TableCell>
              <TableCell>Goles</TableCell>
              <TableCell>Equipo Visitante</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, index) => (
              <TableRow key={index}>
                <TableCell>{match.homeTeam}</TableCell>
                <TableCell>{match.homeGoals}</TableCell>
                <TableCell>{match.awayGoals}</TableCell>
                <TableCell>{match.awayTeam}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MatchTable>
      </TableContainer>
      <StyledButton
        component={Link}
        to={"/profile"}
        color="primary"
        variant="contained"
        startIcon={<CreateIcon />}
      >
        Perfil usuario
      </StyledButton>
      <BackButton
        onClick={handleBackButtonClick}
        color="secondary"
        variant="contained"
      >
        Jornadas anteriores
      </BackButton>
    </StyledContainer>
  );
};

export default MatchdayPage;

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
} from "@mui/material";

const MatchTable = styled(Table)({
  minWidth: 650,
  "& th, td": {
    textAlign: "center",
    padding: "8px",
  },
});

const MatchdayPage = () => {
  const matches = [
    { homeTeam: "Equipo A", awayTeam: "Equipo B", homeGoals: 2, awayGoals: 1 },
    { homeTeam: "Equipo C", awayTeam: "Equipo D", homeGoals: 0, awayGoals: 0 },
    { homeTeam: "Equipo E", awayTeam: "Equipo F", homeGoals: 3, awayGoals: 2 },
    { homeTeam: "Equipo G", awayTeam: "Equipo H", homeGoals: 1, awayGoals: 1 },
  ];

  return (
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
  );
};

export default MatchdayPage;

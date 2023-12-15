import React, { useState } from "react";
import { Container, Typography, TextField, Button, Link } from "@mui/material";
import "../../index.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Lógica adicional...
  };

  const handleRegistroClick = () => {
    // Aquí puedes agregar lógica para redirigir a la página de registro
    console.log("Redirigiendo a la página de registro");
    // Lógica adicional...
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="main-container">
        <Typography variant="h1" style={{ fontSize: "6rem" }}>
          Futbotiesos
        </Typography>
        <Typography variant="h6" gutterBottom>
          Únete a la comunidad de futbolistas amateur más grande del país
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre y apellidos"
            name="nombre"
            autoComplete="Nombre y apellidos"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new password"
            label="Nuevo Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;

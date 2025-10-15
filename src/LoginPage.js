
import * as React from "react";
import { CssBaseline, Sheet, Typography, FormControl, FormLabel, Input, Button, Select, Option, Alert, Box } from "@mui/joy";

export default function LoginFinal({ onLogin }) {
  const [email, setEmail] = React.useState("Admin");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const values = {
    Admin: "admin123",
    Teeyah: "aletiti",
    Baby: "luxvelvet",
    "Mr. Ha": "mrha123",
    "Big Mommy": "attasa",
    "2 IC (Mama)": "mama",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find user ignoring case
    const matchedUser = Object.keys(values).find(
      (user) => user.toLowerCase() === email.toLowerCase()
    );

    if (!matchedUser) {
      setError("Invalid user!");
      return;
    }

    if (password === values[matchedUser]) {
      localStorage.setItem("user", JSON.stringify({ username: matchedUser }));
      window.location.reload();
    } else {
      setError("Incorrect password!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/logo.png')", // your background image
          backgroundSize: "contain",
          backgroundPosition: "center",
          opacity: 0.3, // fade effect
          zIndex: -1,
        }
      }}
    >
      <CssBaseline />
      <Sheet
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 300,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>

        {error && <Alert color="danger">{error}</Alert>}

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Select
            variant="soft"
            value={email}
            onChange={(event, newEmail) => setEmail(newEmail)}
            sx={{ width: "100%" }}
          >
            {Object.keys(values).map((user) => (
              <Option key={user} value={user}>
                {user}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </FormControl>

        <Button type="submit" sx={{ mt: 1 }}>
          Log in
        </Button>
      </Sheet>
    </Box>
  );
}

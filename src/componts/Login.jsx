import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert(" تم تسجيل الدخول");
      navigate("/dashboard");
    } catch (error) {
      alert(" خطأ: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" textAlign="center">
            Login
          </Typography>
          <TextField
            label=" Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            تسجيل الدخول
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => {
    return password.length >= 6 && /[a-zA-Z]/.test(password);
  };

  const handleRegister = async () => {
    if (!email) {
      toast.error(" الرجاء إدخال البريد الإلكتروني");
      return;
    }

    if (!validateEmail(email)) {
      toast.error(" صيغة البريد الإلكتروني غير صحيحة");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        " يجب أن تحتوي كلمة المرور على 6 خانات على الأقل وتتضمن حرفًا واحدًا على الأقل"
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
      });

      await signOut(auth);

      toast.success(" تم إنشاء الحساب بنجاح، الرجاء تسجيل الدخول الآن");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(" البريد الإلكتروني مسجل مسبقًا،  سجل الدخول");
      } else if (error.code === "auth/invalid-email") {
        toast.error(" البريد الإلكتروني غير صالح");
      } else if (error.code === "auth/weak-password") {
        toast.error(" كلمة المرور ضعيفة، أدخل كلمة أقوى");
      } else {
        toast.error(" حدث خطأ أثناء إنشاء الحساب: " + error.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" textAlign="center">
            Register
          </Typography>
          <TextField
            label="Email"
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
            onClick={handleRegister}
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            إنشاء حساب
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;

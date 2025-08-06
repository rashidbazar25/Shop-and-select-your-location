import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // حفظ معلومات المستخدم في Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // يمكن تغييره لاحقًا إلى "admin"
      });

      alert("تم إنشاء الحساب بنجاح ✅");
    } catch (error) {
      alert("خطأ: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4">تسجيل حساب جديد</Typography>
        <TextField
          label="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="كلمة المرور"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleRegister}>
          إنشاء حساب
        </Button>
      </Box>
    </Container>
  );
};

export default Register;

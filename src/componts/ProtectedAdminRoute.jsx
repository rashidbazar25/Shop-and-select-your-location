import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "admin@gmail.com"; // ✅ غيره لبريدك الحقيقي

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate("/"); // ❌ رجوع للصفحة الرئيسية
      } else {
        setIsChecking(false); // ✅ اظهر الصفحة
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isChecking) {
    return <p style={{ textAlign: "center" }}>جاري التحقق...</p>;
  }

  return children;
};

export default ProtectedAdminRoute;

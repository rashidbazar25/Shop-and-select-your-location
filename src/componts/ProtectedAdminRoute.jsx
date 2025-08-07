import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "admin@gmail.com"; //   ايميل  الأدمن 

const ProtectedAdminRoute = ({ children }) => {

  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const user = auth.currentUser;
      if (user && user.email === ADMIN_EMAIL) {
        setIsAllowed(true);
      } else {
        navigate("/");
      }
      setIsChecking(false);
    };

    // جرب الوصول المباشر أولًا
    checkUser();

    // ثم استمع للتغيرات (لو حصل تسجيل دخول/خروج)
    const unsubscribe = onAuthStateChanged(auth, () => {
      checkUser();
    });

    return () => unsubscribe();
  }, [navigate]);


  

  if (isChecking) {
    return <p style={{ textAlign: "center" }}>جاري التحقق...</p>;
  }

  return isAllowed ? children : null;
};

export default ProtectedAdminRoute;

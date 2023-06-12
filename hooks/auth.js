import { useState, useEffect } from "react";

export const useAuth = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // Oturum (session) var ise yapılacak işlemler
      // Örneğin, token'ı doğrula ve gerekirse kullanıcı bilgilerini al
      // Bu örnekte sadece token'ı kontrol ediyoruz
      setSession(token);
    }
  }, []);

  return { session };
};
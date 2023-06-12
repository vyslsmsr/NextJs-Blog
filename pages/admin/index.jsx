import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/auth.js";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { session } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://localhost:7240/api/authorization/login", {
                username,
                password,
            });

            const token = response.data.token;
            sessionStorage.setItem("token", token);

            router.push("/admin/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Oturum (session) dolu ise dashboard sayfasına yönlendir
        if (session) {
            router.push("/admin/dashboard");
        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-96">
                <h1 className="text-2xl font-semibold mb-4">Giriş Yap</h1>
                <form className="block" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1">Kullanıcı Adı</label>
                        <input type="text" className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Şifre</label>
                        <input type="password" className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Giriş Yap</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

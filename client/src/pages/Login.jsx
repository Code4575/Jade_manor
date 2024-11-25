import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { UserContext } from "../utils/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please, fill in all fields!");
      return;
    }
    try {
      const { data } = await customFetch.post("/api/v1/auth/login", {
        email,
        password,
      });
      setUser(data);
      toast.success(`Welcome back!`);
      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <section className="mt-4 grow flex items-center justify-around">
      <div>
        <h1 className="text-4xl text-center mb-4">Log in</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">login</button>
          <div className="text-center py-2 text-slate-500">
            Don't have an account yet?{" "}
            <Link
              className="underline text-slate-700 hover:text-black duration-200"
              to={"/register"}
            >
              Register now!
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

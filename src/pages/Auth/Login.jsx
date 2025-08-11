import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
} from "react-bootstrap";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png"; // Update the path to your actual logo

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  setError(""); // reset previous errors

  // Basic validation
  if (!username.trim() || !password.trim()) {
    setError("Please enter both username and password.");
    return;
  }

  try {
    dispatch(login({ username, password }));
    setUsername("")
    setPassword("")
    navigate("/transactions")

  } catch (err) {
    setError(err.message); // error thrown from authSlice
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Container className="max-w-md">
        <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
          <Card.Body className="p-6 md:p-8">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="PayQuick Logo"
                className="h-28 w-auto object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Login
            </h2>

            {/* Error */}
            {error && (
              <Alert
                variant="danger"
                className="mb-4 text-sm bg-red-100 border border-red-400 text-red-700 rounded-lg px-4 py-3"
              >
                {error}
              </Alert>
            )}

            {/* Form */}
            <Form onSubmit={handleSubmit} className="space-y-6">
              <Form.Group controlId="formUsername">
                <Form.Label className="font-medium text-gray-700 mb-2 block">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={!!error && !username.trim()}
                  className="rounded-lg py-3 px-4 border focus:outline-none focus:ring-0 w-full"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="relative">
                <Form.Label className="font-medium text-gray-700 mb-2 block">
                  Password
                </Form.Label>
                <div className="relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!error && !password.trim()}
                    className="rounded-lg py-3 px-4 pr-10 border focus:outline-none focus:ring-0 w-full"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                </div>
              </Form.Group>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white rounded-lg py-3 text-lg font-semibold mt-4"
              >
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;

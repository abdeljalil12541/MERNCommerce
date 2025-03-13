"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import api from '../../lib/api'; // Ensure this path matches your project structure
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Swal from 'sweetalert2';
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value, // No need for username check since this is login
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post('/users/login', { // Note the leading slash
        email: formData.email,
        password: formData.password
      });

      // Assuming the backend returns a token in response.data.token
      const { token } = response.data;

      // Store the token (e.g., in localStorage or a state management solution)
      localStorage.setItem('token', token);

      // Show success toast
      Toast.fire({
        icon: "success",
        title: "Logged in successfully"
      });

      // Redirect to a protected page (e.g., dashboard)
      router.push('/account/index');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error while signing in';
      setError(errorMessage);
      Toast.fire({
        icon: "error",
        title: errorMessage
      });
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center -my-10 items-center bg-[#e746841c] dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3">
          <h1 className="text-2xl text-center">Login</h1>
        </CardHeader>
        <form onSubmit={handleLoginSubmit}>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="m@example.com"
                labelPlacement="outside"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                label="Password"
                labelPlacement="outside"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardBody>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              type="submit"
              className="w-full"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Link href="#" className="text-sm text-center" prefetch={false}>
              Forgot Password?
            </Link>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-4">
        <span className="text-sm">Don’t have an account? </span>
        <Link href="/signup" className="text-sm text-blue-500" prefetch={false}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
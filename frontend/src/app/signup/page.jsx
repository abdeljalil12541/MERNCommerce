'use client';

import { useState } from 'react';
import api from '../../lib/api'; // Adjust path, e.g., '../lib/api' if in /pages
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import Swal from 'sweetalert2';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      [id === 'name' ? 'username' : id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      Toast.fire({
        icon: "success",
        title: "Signed up successfully"
      });

      router.push('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error creating account';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#e746841c] dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3">
          <h1 className="text-2xl text-center">Sign Up</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Input
                id="name"
                type="text"
                label="Full Name"
                placeholder="John Doe"
                labelPlacement="outside"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="space-y-2">
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                labelPlacement="outside"
                value={formData.confirmPassword}
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
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
            <div className="text-sm text-center">
              By signing up, you agree to our{' '}
              <Link href="#" className="text-blue-500" prefetch={false}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-blue-500" prefetch={false}>
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-4">
        <span className="text-sm">Already have an account? </span>
        <Link href="/login" className="text-sm text-blue-500" prefetch={false}>
          Login
        </Link>
      </div>

      {loading && <Loader />} 
    </div>
  );
}
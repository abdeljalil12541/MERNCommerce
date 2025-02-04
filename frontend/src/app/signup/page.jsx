import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3">
          <h1 className="text-2xl text-center">Sign Up</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              labelPlacement="outside"
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
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              label="Password"
              labelPlacement="outside"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              labelPlacement="outside"
              required
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" color="primary">
            Create Account
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
      </Card>
      <div className="mt-4">
        <span className="text-sm">Already have an account? </span>
        <Link href="/login" className="text-sm text-blue-500" prefetch={false}>
          Login
        </Link>
      </div>
    </div>
  );
}
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link"

export default function Login() {
  return (
    <div className="flex flex-col h-screen justify-center -my-10 items-center bg-gray-100 dark:bg-gray-900">
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-3">
        <h1 className="text-2xl text-center">Login</h1>
      </CardHeader>
      <CardBody className="space-y-4">
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
      </CardBody>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" color="primary">
          Login
        </Button>
        <Link href="#" className="text-sm text-center" prefetch={false}>
          Forgot Password?
        </Link>
      </CardFooter>
    </Card>
    <div className="mt-4">
      <span className="text-sm">Don't have an account? </span>
      <Link href="/signup" className="text-sm text-blue-500" prefetch={false}>
        Sign up
      </Link>
    </div>
  </div>
  )
}
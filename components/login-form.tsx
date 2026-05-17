'use client'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from "@tanstack/react-form"
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'minimum 8 charector'),
})

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

    const signInWithGoogle = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000"
    });
    console.log(data);
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toasdId = toast.loading('Logging in...')
      try {
        const {data, error} = await authClient.signIn.email(value)

        if(error){
          toast.error(error.message, {id: toasdId})
          return;
        }

        toast.success('User logged in successfully', {id: toasdId})

      } catch (error) {
        toast.error('An unexpected error occurred', {id: toasdId})
      }
      
    }
  })


  return (
    <Card {...props}>

      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your information below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit()
          }}
        >

          <FieldGroup>

            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                     {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />


            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                     {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />



          </FieldGroup>


        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 justify-end">
        <Button type="submit" form="login-form" className="w-full">
          Login
        </Button>

        <Button
                  onClick={() => signInWithGoogle()}
                  variant="outline" type="button" className="w-full">
                  Continue with Google
                </Button>
      </CardFooter>
    </Card>
  )
}

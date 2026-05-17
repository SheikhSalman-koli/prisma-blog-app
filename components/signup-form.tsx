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
  name: z.string().min(1, 'this field is equired'),
  email: z.email(),
  password: z.string().min(8, 'minimum 8 charector'),
})

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

    const signInWithGoogle = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000"
    });
    console.log(data);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toasdId = toast.loading('Creatong User')
      try {
        const {data, error} = await authClient.signUp.email(value)

        if(error){
          toast.error(error.message, {id: toasdId})
          return;
        }

        toast.success('User created successfully', {id: toasdId})

      } catch (error) {
        toast.error('An unexpected error occurred', {id: toasdId})
      }
      
    }
  })


  return (
    <Card {...props}>

      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit()
          }}
        >

          <FieldGroup>

            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
        <Button type="submit" form="signup-form" className="w-full">
          Register
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

"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginClient() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const loginSchema = z.object({
    email: z
      .string({
        required_error: "Email is required to log in.",
        invalid_type_error: "Please, enter a proper email account",
      })
      .min(1, { message: "Email address is required to log in." })
      .email({ message: "Please, enter a proper email account." }),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    const loginResult = await signIn("email", {
      email: values.email.toLowerCase(),
      redirect: false,
      callbackUrl: "/iphones",
    });
    setLoading(false);

    if (!loginResult?.ok) {
      return toast({
        title: "Something went wrong...",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }
    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <>
      <div className="px-6 py-4 sm:px-12">
        <h1 className="py-4 text-xl">Log in to your account</h1>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-sm"
                      placeholder="info@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading ? true : false} type="submit">
              {loading && <Loader2 className="animate-spin" />}
              {!loading && "Log in"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

"use client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().trim().min(1, { message: "O nome deve ser completo." }),
    email: z.email({ message: "E-mail inválido" }),
    password: z
      .string()
      .refine(
        (v) =>
          v.length >= 8 &&
          /[A-Z]/.test(v) &&
          /[a-z]/.test(v) &&
          /[0-9]/.test(v) &&
          /[^A-Za-z0-9]/.test(v),
        { message: "A senha não atende aos requisitos mínimos." },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem coincidir",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const blockClipboard = (e: React.ClipboardEvent) => e.preventDefault();

  async function onSubmit(values: FormValues) {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        toast.error("E-mail já está em uso. Por favor, tente outro.", { position: "top-center" });
      } else if (error.code === "UNABLE_TO_CREATE_USER") {
        toast.error("Não foi possível criar a conta. Tente novamente.", { position: "top-center" });
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente.", { position: "top-center" });
      }
      return;
    }

    router.push("/");
    form.reset();
  }

  return (
    <>
      <Card className="w-full">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-col items-center justify-center gap-3">
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>Crie sua conta para continuar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 py-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Digite seu nome completo"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="Digite seu e-mail"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Digite sua senha"
                    aria-invalid={fieldState.invalid}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => {
                      setPasswordFocused(false);
                      field.onBlur();
                    }}
                    onCopy={blockClipboard}
                    onPaste={blockClipboard}
                    onCut={blockClipboard}
                  />
                  {passwordFocused && (
                    <FieldDescription>
                      Mínimo 8 caracteres, incluindo letras maiúsculas e
                      minúsculas, um número e um caractere especial.
                    </FieldDescription>
                  )}
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirme a Senha</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Confirme sua senha"
                    aria-invalid={fieldState.invalid}
                    onFocus={() => setConfirmFocused(true)}
                    onBlur={() => {
                      setConfirmFocused(false);
                      field.onBlur();
                    }}
                    onCopy={blockClipboard}
                    onPaste={blockClipboard}
                    onCut={blockClipboard}
                  />
                  {confirmFocused && (
                    <FieldDescription>
                      Digite a mesma senha informada no campo anterior.
                    </FieldDescription>
                  )}
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button className="w-30 py-3" type="submit">
              Criar Conta
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

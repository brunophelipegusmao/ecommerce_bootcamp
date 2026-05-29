"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateAddress } from "@/hooks/mutations/use-create-address";

const formSchema = z.object({
  email: z.email({ message: "E-mail inválido" }),
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Primeiro nome é obrigatório" }),
  lastName: z.string().trim().min(1, { message: "Sobrenome é obrigatório" }),
  cpfCnpj: z
    .string()
    .min(1, { message: "CPF/CNPJ é obrigatório" })
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length === 11 || digits.length === 14;
      },
      { message: "CPF/CNPJ inválido" },
    ),
  phone: z
    .string()
    .min(1, { message: "Celular é obrigatório" })
    .refine((value) => value.replace(/\D/g, "").length === 11, {
      message: "Celular inválido",
    }),
  zipCode: z
    .string()
    .min(1, { message: "CEP é obrigatório" })
    .refine((value) => value.replace(/\D/g, "").length === 8, {
      message: "CEP inválido",
    }),
  address: z.string().trim().min(1, { message: "Endereço é obrigatório" }),
  number: z.string().trim().min(1, { message: "Número é obrigatório" }),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, { message: "Bairro é obrigatório" }),
  city: z.string().trim().min(1, { message: "Cidade é obrigatório" }),
  state: z.string().trim().min(1, { message: "Estado é obrigatório" }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  email: "",
  firstName: "",
  lastName: "",
  cpfCnpj: "",
  phone: "",
  zipCode: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
};

export default function AddressForm() {
  const { mutate: createAddress, isPending } = useCreateAddress();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: FormValues) {
    createAddress(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        cpfOrCnpj: values.cpfCnpj,
        phone: values.phone,
        zipCode: values.zipCode,
        street: values.address,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
      },
      {
        onSuccess: () => form.reset(defaultValues),
      },
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder="Email"
              aria-invalid={fieldState.invalid}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Primeiro Nome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Primeiro Nome"
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Sobrenome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Sobrenome"
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="cpfCnpj"
          control={form.control}
          render={({ field, fieldState }) => {
            const digits = (field.value ?? "").replace(/\D/g, "");
            const format =
              digits.length <= 11 ? "###.###.###-##" : "##.###.###/####-##";
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>CPF/CNPJ</FieldLabel>
                <PatternFormat
                  format={format}
                  customInput={Input}
                  id={field.name}
                  placeholder="CPF/CNPJ"
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.value)}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            );
          }}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Celular</FieldLabel>
              <PatternFormat
                format="(##) #####-####"
                customInput={Input}
                id={field.name}
                placeholder="Celular"
                value={field.value}
                onValueChange={(values) => field.onChange(values.value)}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>

      <Controller
        name="zipCode"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>CEP</FieldLabel>
            <PatternFormat
              format="#####-###"
              customInput={Input}
              id={field.name}
              placeholder="CEP"
              value={field.value}
              onValueChange={(values) => field.onChange(values.value)}
              onBlur={field.onBlur}
              aria-invalid={fieldState.invalid}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Endereço</FieldLabel>
            <Input
              {...field}
              id={field.name}
              placeholder="Endereço"
              aria-invalid={fieldState.invalid}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="number"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Número</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Número"
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          name="complement"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Complemento</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Complemento"
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Controller
          name="neighborhood"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bairro</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Bairro"
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Cidade</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Cidade"
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Estado</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Estado"
                aria-invalid={fieldState.invalid}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full py-3"
      >
        {isPending ? "Salvando..." : "Salvar endereço"}
      </Button>
    </form>
  );
}

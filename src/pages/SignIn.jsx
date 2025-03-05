import React from "react";
import { Container, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button, ButtonGroup } from "@chakra-ui/react"

const SignIn = () => {
  return (
    <Container>
      <h1>Registo</h1>
      <div>
        <Input type="text" placeholder="Nombre" variant="flushed"></Input>
        <Field
          label="Email"
          required
          helperText="We'll never share your email."
        >
          <Input placeholder="Enter your email" />
        </Field>
        <Input
          type="password"
          placeholder="Contraseña"
          variant="flushed"
        ></Input>
      </div>
      <Button>Click me</Button>
    </Container>
  );
};

export default SignIn;

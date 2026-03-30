import { useState } from 'react';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Logo from '../../ui/Logo';
import SpinnerMini from '../../ui/SpinnerMini';
import { useLogin } from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState("ahmedakram@mail.com");
  const [password, setPassword] = useState("12345678");
  const { login, isPending } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          // setEmail("");
          // setPassword("");
        },
      },
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Logo />
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isPending}>
            {!isPending ? "Login" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default LoginForm;

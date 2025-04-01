// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

function LoginForm({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, authError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
        {isLoading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            {' '} Đang xử lý...
          </>
        ) : (
          'Đăng nhập'
        )}
      </Button>
      <p className="mt-3 text-center">
        Chưa có tài khoản?{' '}
        <Button variant="link" size="sm" onClick={onSwitchToRegister} className="p-0">
          Đăng ký ngay
        </Button>
      </p>
    </Form>
  );
}

export default LoginForm;
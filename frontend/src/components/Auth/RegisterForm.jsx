// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

function RegisterForm({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Lỗi riêng của form (vd: password mismatch)
  const { register, isLoading, authError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset lỗi form
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    register({ name, email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {(authError || error) && <Alert variant="danger">{authError || error}</Alert>}
      <Form.Group className="mb-3" controlId="registerName">
        <Form.Label>Tên hiển thị</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6} // Ví dụ yêu cầu độ dài
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerConfirmPassword">
        <Form.Label>Xác nhận mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
         {error && <Form.Text className="text-danger">{error}</Form.Text>}
      </Form.Group>

      <Button variant="success" type="submit" className="w-100" disabled={isLoading}>
        {isLoading ? (
            <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                {' '} Đang xử lý...
            </>
        ) : (
            'Đăng ký'
        )}
      </Button>
      <p className="mt-3 text-center">
        Đã có tài khoản?{' '}
        <Button variant="link" size="sm" onClick={onSwitchToLogin} className="p-0">
          Đăng nhập
        </Button>
      </p>
    </Form>
  );
}

export default RegisterForm;
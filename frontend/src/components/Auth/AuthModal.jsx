// src/components/AuthModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthModal() {
  const {
      isAuthModalOpen,
      closeAuthModal,
      authModalMode,
      switchToLogin,
      switchToRegister
    } = useAuth();

  return (
    <Modal show={isAuthModalOpen} onHide={closeAuthModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {authModalMode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {authModalMode === 'login' ? (
          <LoginForm onSwitchToRegister={switchToRegister} />
        ) : (
          <RegisterForm onSwitchToLogin={switchToLogin} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
import { createContext, useState, useContext } from 'react';
import Modal from './Modal';

// Create a context for modal management
const ModalContext = createContext();

// Custom hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Modal provider component
export const ModalProvider = ({ children }) => {
  // State for modal configuration
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    content: null,
    actions: null,
  });

  // Function to open a modal
  const openModal = ({ title, content, actions }) => {
    setModalConfig({
      isOpen: true,
      title,
      content,
      actions,
    });
  };

  // Function to close the modal
  const closeModal = () => {
    setModalConfig({
      ...modalConfig,
      isOpen: false,
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        actions={modalConfig.actions}
      >
        {modalConfig.content}
      </Modal>
    </ModalContext.Provider>
  );
};
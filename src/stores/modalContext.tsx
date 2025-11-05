import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ModalContextType {
  isQCNhuomModalOpen: boolean;
  openQCNhuomModal: () => void;
  closeQCNhuomModal: () => void;
  isChuyenModalOpen: boolean;
  openChuyenModal: () => void;
  closeChuyenModal: () => void;
  isQCThanhPhamModalOpen: boolean;
  openQCThanhPhamModal: () => void;
  closeQCThanhPhamModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isQCNhuomModalOpen, setIsQCNhuomModalOpen] = useState(false);
  const [isChuyenModalOpen, setIsChuyenModalOpen] = useState(false);
  const [isQCThanhPhamModalOpen, setIsQCThanhPhamModalOpen] = useState(false);

  const openQCNhuomModal = () => setIsQCNhuomModalOpen(true);
  const closeQCNhuomModal = () => setIsQCNhuomModalOpen(false);

  const openChuyenModal = () => setIsChuyenModalOpen(true);
  const closeChuyenModal = () => setIsChuyenModalOpen(false);

  const openQCThanhPhamModal = () => setIsQCThanhPhamModalOpen(true);
  const closeQCThanhPhamModal = () => setIsQCThanhPhamModalOpen(false);

  return (
    <ModalContext.Provider value={{ 
      isQCNhuomModalOpen, 
      openQCNhuomModal, 
      closeQCNhuomModal,
      isChuyenModalOpen,
      openChuyenModal,
      closeChuyenModal,
      isQCThanhPhamModalOpen,
      openQCThanhPhamModal,
      closeQCThanhPhamModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

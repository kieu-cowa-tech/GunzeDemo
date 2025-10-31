import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ModalContextType {
  isQCNhuomModalOpen: boolean;
  openQCNhuomModal: () => void;
  closeQCNhuomModal: () => void;
  // Có thể thêm các modal khác sau
  // isOtherModalOpen: boolean;
  // openOtherModal: () => void;
  // closeOtherModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isQCNhuomModalOpen, setIsQCNhuomModalOpen] = useState(false);

  const openQCNhuomModal = () => setIsQCNhuomModalOpen(true);
  const closeQCNhuomModal = () => setIsQCNhuomModalOpen(false);

  return (
    <ModalContext.Provider value={{ 
      isQCNhuomModalOpen, 
      openQCNhuomModal, 
      closeQCNhuomModal 
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

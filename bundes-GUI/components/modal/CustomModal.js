// components/Modal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set the root element for screen readers (replace #__next with your root element id)

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className="inset-0 flex items-center justify-center z-50  "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 p-4 max-w-md rounded-xl">
        {children}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;

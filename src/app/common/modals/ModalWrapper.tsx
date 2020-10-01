import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from '../../store/modal/modalActions';

interface IModalWrapper {
  size?: 'small' | 'mini' | 'tiny' | 'large' | 'fullscreen';
  header: React.ReactNode;
}

const ModalWrapper: React.FC<IModalWrapper> = ({ children, size, header }) => {
  const dispatch = useDispatch();
  //onClose={() => dispatch(closeModal())}
  return (
    <Modal open={true} size={size}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default ModalWrapper;

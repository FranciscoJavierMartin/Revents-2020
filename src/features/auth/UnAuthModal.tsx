import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import {
  EVENTS_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
} from '../../app/common/constants/routes';
import { IRootState } from '../../app/common/interfaces/states';

const UnAuthModal: React.FC<any> = ({ history, setIsModalOpen }) => {
  const [open, setOpen] = useState<boolean>(true);
  const { prevLocation } = useSelector<IRootState, any>((state) => state.auth);

  function handleClose() {
    if (!history) {
      setOpen(false);
      if (setIsModalOpen) {
        setIsModalOpen(false);
      }
    } else if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push(EVENTS_PAGE_ROUTE);
    }
    setOpen(false);
  }

  function goToPage(route: string) {
    setOpen(false);
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
    history.push(route);
  }

  return (
    <Modal open={open} size='mini' onClose={handleClose}>
      <Modal.Header content='You need to be signed in to do that' />
      <Modal.Content>
        <p>Please either login or register to see this content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color='teal'
            content='Login'
            onClick={() => goToPage(LOGIN_PAGE_ROUTE)}
          />
          <Button.Or />
          <Button
            fluid
            color='green'
            content='Register'
            onClick={() => goToPage(REGISTER_PAGE_ROUTE)}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p>Or click cancel to continue as a guest</p>
          <Button onClick={handleClose} content='Cancel' />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default UnAuthModal;

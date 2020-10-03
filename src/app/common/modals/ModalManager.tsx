import React from 'react'
import { useSelector } from 'react-redux';
import { IRootState } from '../interfaces/states';
import LoginForm from '../../../features/auth/LoginForm';

const ModalManager:React.FC = () => {
  const modalLookup:any = {
    LoginForm
  };
  const currentModal = useSelector<IRootState, any>(state => state.modal);
  let renderedModal = null;

  if(currentModal){
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookup[modalType];
    // renderedModal = <ModalComponent {...modalProps}/>
    renderedModal = <h1>Hello world</h1>
  }

  return (
    <span>
      {renderedModal}
    </span>
  )
}

export default ModalManager

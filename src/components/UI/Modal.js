import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const Backdrop = (props) => {
    return <div className={css.backdrop} onClick={props.onClick} />;
};
const ModalOverlay = (props) => {
    return (
        <div className={css.modal}>
            <div className={css.content}>{props.children}</div>
        </div>
    );
};
const Modal = (props) => {
    const portalElement = document.getElementById('overlays');
    return createPortal(
        <>
            <Backdrop onClick={props.onClose} />
            <ModalOverlay>{props.children}</ModalOverlay>
        </>,
        portalElement
    );
};
export default Modal;

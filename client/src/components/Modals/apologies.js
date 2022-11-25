import React from 'react';
import {Modal} from "react-bootstrap";

const Apologies = ({show,onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Вітаємо вас оскільки Ви студент ВНТУ, курси для Вас безкоштовні.
                </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default Apologies;
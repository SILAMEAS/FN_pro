import {Button, Modal, ScrollView} from 'native-base';
import React from 'react';
import {DialogProps} from '.';

export const Dialog = ({
  buttons,
  body,
  header,
  size,
  isOpen,
  onClose,
  ...props
}: DialogProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <Modal.Content {...props} maxH={'100%'} maxW={'100%'}>
          <Modal.CloseButton />
          <Modal.Header>{header}</Modal.Header>
          <Modal.Body>
            <ScrollView nestedScrollEnabled={true}>{body}</ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>{buttons}</Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

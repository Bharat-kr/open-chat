import React, { useCallback, useRef, useState } from 'react';
import {
    Alert,
    Button,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Icon,
    Modal,
    Schema,
} from 'rsuite';
import firebase from 'firebase/compat/app';
import { useModalState } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired('Chat name is Required'),
    description: StringType().isRequired('Description is Required'),
});

const INITIAL_FORM = {
    name: '',
    description: '',
};

const CreateRoomBtnModal = () => {
    const { isOpen, open, close } = useModalState();
    const [formValue, setFormValue] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);

    const onFormChange = useCallback(value => {
        setFormValue(value);
    }, []);

    const formRef = useRef();

    const onSubmit = async () => {
        if (!formRef.current.check()) {
            return;
        }

        setIsLoading(true);

        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            admins: {
                [auth.currentUser.uid]: true,
            },
        };

        try {
            await database.ref('rooms').push(newRoomData);
            setIsLoading(false);
            Alert.info(`${formValue.name} has been created`, 4000);
            setFormValue(INITIAL_FORM);
            close();
        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message, 4000);
        }
    };

    return (
        <div className="mt-1">
            <Button block color="green" onClick={open}>
                <Icon icon="creative" /> Create new chat room
            </Button>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>New chat room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        onChange={onFormChange}
                        formValue={formValue}
                        model={model}
                        ref={formRef}
                    >
                        <FormGroup>
                            <ControlLabel>Room Name</ControlLabel>
                            <FormControl
                                name="name"
                                placeholder="Enter Chat room name..."
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                rows={5}
                                name="description"
                                placeholder="Enter room description..."
                            />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        block
                        appearance="primary"
                        onClick={onSubmit}
                        disabled={isLoading}
                    >
                        Create new chat room
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateRoomBtnModal;

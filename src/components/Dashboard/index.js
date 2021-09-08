import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import AvtarUploadBtn from './AvtarUploadBtn';
import ProviderBlock from './ProviderBlock';

const Dashboard = ({ onSignOut }) => {
    const { profile } = useProfile();

    const onSave = async newData => {
        console.log(newData);
        const userNicknameRef = database
            .ref(`/profiles/${profile.uid}`)
            .child('name');
        try {
            userNicknameRef.set(newData);
            Alert.success('Nickname has been updated', 4000);
        } catch (error) {
            Alert.error(error.message, 4000);
        }
    };
    return (
        <>
            <Drawer.Header>
                <Drawer.Title>Dashboard</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <h3>Hey, {profile.name}</h3>
                <ProviderBlock/>
                <Divider />
                <EditableInput
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className="mb-2">Nickname</h6>}
                />
                <AvtarUploadBtn/>
            </Drawer.Body>
            <Drawer.Footer>
                <Button block color="red" onClick={onSignOut} >
                    Sign out
                </Button>
            </Drawer.Footer>
        </>
    );
};

export default Dashboard;

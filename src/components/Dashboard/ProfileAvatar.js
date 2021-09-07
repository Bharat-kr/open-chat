import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitials } from '../../misc/helpers';

const ProfileAvatar = ({ name, ...avatarProps }) => {
    return (
            <Avatar {...avatarProps} circle >
                {getNameInitials(name)}
            </Avatar>
    );
};

export default ProfileAvatar;

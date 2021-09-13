import React from 'react';
import { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import ProfileAvatar from '../../Dashboard/ProfileAvatar';
import PresenceDot from '../../rooms/PresenceDot';
import IconBtnControl from './IconBtnControl';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message, handleAdmin, handleLike }) => {
    const { author, createdAt, text, likes, likeCount } = message;

    const [selfRef, isHovered] = useHover();
    const isMobile = useMediaQuery('(max-width: 992px)');

    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);

    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;

    const canShowIcons = isMobile || isHovered;
    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

    return (
        <li
            className={`padded mb-1 cursor-pointer ${
                isHovered ? 'bg-black-02' : ''
            }`}
            ref={selfRef}
        >
            <div className="d-flex align-items-center font-bolder mb-1">
                <PresenceDot uid={author.uid} />

                <ProfileAvatar
                    src={author.avatar}
                    name={author.name}
                    className="ml-1"
                    size="xs"
                />
                <ProfileInfoBtnModal
                    profile={author}
                    appearance="link"
                    className="p-0 ml-1 text-black"
                >
                    {canGrantAdmin && (
                        <Button
                            block
                            onClick={() => {
                                handleAdmin(author.uid);
                            }}
                            color="blue"
                        >
                            {isMsgAuthorAdmin
                                ? 'Remove Admin Permisssion'
                                : 'Grant Admin Permission'}
                        </Button>
                    )}
                </ProfileInfoBtnModal>
                <TimeAgo
                    datetime={createdAt}
                    className="fonst-normal text-black-45 ml-2"
                />
                <IconBtnControl
                    onClick={() => {
                        handleLike(message.id);
                    }}
                    {...(isLiked ? { color: 'red' } : {})}
                    isVisible={canShowIcons}
                    iconName="heart"
                    tooltip="Like this message"
                    badgeContent={likeCount}
                />
            </div>
            <div>
                <span className="word-break-all">{text}</span>
            </div>
        </li>
    );
};

export default memo(MessageItem);

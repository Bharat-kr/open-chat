import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database, messaging } from '../misc/firebase';
import firebase from 'firebase/compat/app';
import { getToken } from '@firebase/messaging';

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let userRef;
        let userStatusRef;
        // let tokenRefreshUnsub;

        const authUnsub = auth.onAuthStateChanged(async authObj => {
            if (authObj) {
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userStatusRef = database.ref(`/status/${authObj.uid}`);
                userRef.on('value', snap => {
                    const { name, createdAt, avatar } = snap.val();
                    const data = {
                        name,
                        createdAt,
                        avatar,
                        uid: authObj.uid,
                        email: authObj.email,
                    };
                    setProfile(data);
                    setIsLoading(false);
                });

                database.ref('.info/connected').on('value', snapshot => {
                    if (!!snapshot.val() === false) {
                        return;
                    }

                    userStatusRef
                        .onDisconnect()
                        .set(isOfflineForDatabase)
                        .then(() => {
                            userStatusRef.set(isOnlineForDatabase);
                        });
                });

                if (messaging) {
                    // try {
                    //     const currentToken = await messaging.getToken();
                    //     if (currentToken) {
                    //         await database
                    //             .ref(`/fcm_tokens/${currentToken}`)
                    //             .set(authObj.uid);
                    //     }
                    // } catch (err) {
                    //     console.log(
                    //         'An error occured while retrieving token',
                    //         err
                    //     );
                    // }

                    getToken(messaging, {
                        vapidKey:
                            'BN7nKV3QbT9ak6b8sjrIcCHvK2JzJXBEJv33QAuAPOdAVCfnVt4M6DG5KLQafjne8ajDrHQuKQwLqbzTQEnJ7sI',
                    })
                        .then(async currentToken => {
                            if (currentToken) {
                                await database
                                    .ref(`/fcm_tokens/${currentToken}`)
                                    .set(authObj.uid);
                            }
                        })
                        .catch(err => {
                            console.log(
                                'An error occurred while retrieving token. ',
                                err
                            );
                        });

                    // tokenRefreshUnsub = messaging.onTokenRefresh(() => {
                    //     getToken(messaging, {
                    //         vapidKey:
                    //             'BN7nKV3QbT9ak6b8sjrIcCHvK2JzJXBEJv33QAuAPOdAVCfnVt4M6DG5KLQafjne8ajDrHQuKQwLqbzTQEnJ7sI',
                    //     })
                    //         .then(async currentToken => {
                    //             if (currentToken) {
                    //                 await database
                    //                     .ref(`/fcm_tokens/${currentToken}`)
                    //                     .set(authObj.uid);
                    //             }
                    //         })
                    //         .catch(err => {
                    //             console.log(
                    //                 'An error occurred while retrieving token. ',
                    //                 err
                    //             );
                    //         });
                    // });
                }
            } else {
                if (userRef) {
                    userRef.off();
                }
                if (userStatusRef) {
                    userStatusRef.off();
                }
                // if (tokenRefreshUnsub) {
                //     tokenRefreshUnsub();
                // }
                database.ref('.info/connected').off();
                setProfile(null);
                setIsLoading(false);
            }
        });

        return () => {
            authUnsub();
            if (userRef) {
                userRef.off();
            }
            if (userStatusRef) {
                userStatusRef.off();
            }
            // if (tokenRefreshUnsub) {
            //     tokenRefreshUnsub();
            // }
            database.ref('.info/connected').off();
        };
    }, []);

    return (
        <ProfileContext.Provider value={{ isLoading, profile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);

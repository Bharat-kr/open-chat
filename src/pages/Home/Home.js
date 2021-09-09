import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Col, Grid, Row } from 'rsuite';
import SideBar from '../../components/SideBar';
import { RoomsProvider } from '../../context/rooms.context';
import { useMediaQuery } from '../../misc/custom-hooks';
import '../../styles/utility.scss';
import Chat from './Chat';

const Home = () => {
    const isDesktop = useMediaQuery('(min-width: 992px)');

    const { isExact } = useRouteMatch();
    const canRenderSideBar = isDesktop || isExact;
    return (
        <RoomsProvider>
            <Grid fluid className="h-100">
                <Row className="h-100">
                    {canRenderSideBar && (
                        <Col xs={24} md={8} className="h-100">
                            <SideBar />
                        </Col>
                    )}

                    <Switch>
                        <Route exact path="/chat/:chatId">
                            <Col xs={24} md={16} className="h-100">
                                <Chat />
                            </Col>
                        </Route>
                        <Route>
                            {isDesktop && (
                                <Col xs={24} md={16} className="h-100">
                                    <h6 className="text-center mt-page">Please select a chat</h6>
                                </Col>
                            )}
                        </Route>
                    </Switch>
                </Row>
            </Grid>
        </RoomsProvider>
    );
};

export default Home;

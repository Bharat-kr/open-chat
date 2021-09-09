import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import SideBar from '../components/SideBar';
import { RoomsProvider } from '../context/rooms.context';
import '../styles/utility.scss';

const Home = () => {
    return (
        <RoomsProvider>
            <Grid fluid className="h-100">
                <Row className="h-100">
                    <Col xs={24} md={8} className="h-100">
                        <SideBar />
                    </Col>
                </Row>
            </Grid>
        </RoomsProvider>
    );
};

export default Home;

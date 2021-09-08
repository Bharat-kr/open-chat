import React from 'react';
import CreateRoomBtnModal from './Dashboard/CreateRoomBtnModal';
import DashboardToggle from './Dashboard/DashboardToggle';

const SideBar = () => {
    return (
        <div className="h-100 pt-2">
            <div>
                <DashboardToggle />
                <CreateRoomBtnModal/>
            </div>
            bottom
        </div>
    );
};

export default SideBar;

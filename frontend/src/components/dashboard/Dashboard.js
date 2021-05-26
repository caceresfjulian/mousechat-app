import React from 'react'
import Join from '../join/Join'
import MyProfile from '../myProfile/MyProfile'
import './Dashboard.css'


function Dashboard() {
    return (
        <div id="dashboard-container">
            <MyProfile />
            <Join />
        </div>
    )
}

export default Dashboard

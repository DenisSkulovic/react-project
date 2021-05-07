import React from 'react';
import LoginRegisterNav from './LoginRegisterNav'
import LoggedInNav from "./LoggedInNav"

export default function UserMenuNav() {
    // TEMPORARY
    const userLoggedIn = false
    return (
        <div className="user-menu-nav">
            {userLoggedIn ? <LoggedInNav /> : <LoginRegisterNav />}
        </div>
    )
}

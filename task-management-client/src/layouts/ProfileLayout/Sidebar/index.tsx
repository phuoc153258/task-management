import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import route from '../../../routes/web/route';
import Item from './Item';

function Sidebar() {
    const location = useLocation().pathname;

    return (
        <>
            <div className="bg-white shadow rounded-lg p-8 h-80">
                <ul className="pb-2 space-y-2">
                    <Item route={route.profile} title={'Profile'} active={route.profile === location} />
                    <Item route={route.password} title={'Change password'} active={route.password === location} />
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
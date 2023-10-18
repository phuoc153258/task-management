import * as React from 'react';
import { useState, useEffect } from 'react';
import Icon from './Icon';
import Tooltip from './Tooltip';

function Notification() {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="flex items-center relative">
                <Icon callback={() => setShow(!show)} />
                <Tooltip show={show} />
            </div>
        </>
    );
}

export default Notification;
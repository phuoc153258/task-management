import * as React from 'react';
import { useState, useEffect } from 'react';

function HorizontalListItem({ title, active = false, callback }: any) {
    return (
        <li className={`w-[11rem] py-4 text-center cursor-pointer ${active && 'border-b-4 border-indigo-500'}`} onClick={callback}>
            <span className=" mr-4  text-lg font-medium">{title}</span>
        </li>
    );
}

export default HorizontalListItem;
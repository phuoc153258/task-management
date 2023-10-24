import * as React from 'react';
import { useState, useEffect } from 'react';
import HorizontalListItem from './HorizontalListItem';

function HorizontalList({ data, type, setType }: any) {
    return (
        <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white gap-4">
            <>
                {
                    data.map((value: any, index: any) => {
                        return <HorizontalListItem title={value.name} key={index} active={value.value === type} callback={() => { setType(value.value) }} />
                    })
                }
            </>
        </ul>
    );
}

export default HorizontalList;
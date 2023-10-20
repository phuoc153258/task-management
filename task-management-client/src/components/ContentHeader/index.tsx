import * as React from 'react';
import { useState, useEffect } from 'react';

function ContentHeader({ title }: any) {
    return (
        <>
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {title}
                </h1>
            </div>
        </>
    );
}

export default ContentHeader;
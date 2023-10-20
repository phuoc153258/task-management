import * as React from 'react';
import { useState, useEffect } from 'react';

function ModalButton({ callback, title, styles, isDisabled = false }: any) {
    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={callback}
            className={`text-base text-center focus:ring-4 focus:outline-none rounded-lg ${styles}`}
        >
            {title}
        </button>
    );
}

export default ModalButton;
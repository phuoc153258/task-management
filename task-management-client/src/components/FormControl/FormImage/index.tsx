import * as React from 'react';
import { useState, useEffect } from 'react';

function FormImage({ setFile, imagePreview, setImagePreview }: any) {
    return (
        <>
            <img className="w-52 mb-5 h-52 rounded-full block mx-auto" src={imagePreview} alt="Rounded avatar" />
            <input type="file" id="myFile" className='hidden' onChange={(e: any) => {
                setFile(e.target.files[0])
                setImagePreview(URL.createObjectURL(e.target.files[0]))
            }} />
            {
                setFile !== undefined && setImagePreview !== undefined && <label htmlFor='myFile' className="text-white bg-indigo-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Upload avatar</label>
            }
        </>
    );
}

export default FormImage;
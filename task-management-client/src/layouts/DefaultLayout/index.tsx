import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DefaultLayout = ({
    children,
}: any): JSX.Element | React.ReactNode | any => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default DefaultLayout;

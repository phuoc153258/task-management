import React, { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes/web';
import { DefaultLayout } from './layouts';
import LeaveRequest from './pages/LeaveRequest';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/leave-request" />} />
            {publicRoutes.map((route: any, index: any) => {
                const Page = route.component;

                let Layout = DefaultLayout;
                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }

                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default App;

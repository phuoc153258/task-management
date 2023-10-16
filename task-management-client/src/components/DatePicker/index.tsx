import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePicker = ({ date, callback }: any) => {
    return (
        <ReactDatePicker selected={date} onChange={callback} dateFormat="yyyy-MM-dd" />
    );
};

export default DatePicker;

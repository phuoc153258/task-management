import React, { useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const FormDateTime = ({ callback, value }: any) => {

    return <DateTimePicker onChange={callback} value={value === undefined ? '' : value} format={"d-MM-yyyy HH:mm:ss"} />

};

export default FormDateTime;

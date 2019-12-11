import React from 'react';
import moment from 'moment';
import { DATE_FORMAT } from '../../constants/formats';

export const QuotesTable = ({ quotes }) => (
    <table className="table">
        <thead>
        <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
        </tr>
        </thead>
        <tbody>
        { quotes.map(({
          Date, Open, High, Low, Close, Volume,
        }) => (
            <tr key={Date}>
                <th>{moment(Date).format(DATE_FORMAT)}</th>
                <td>{Open}</td>
                <td>{High}</td>
                <td>{Low}</td>
                <td>{Close}</td>
                <td>{Volume}</td>
            </tr>
        )) }
        </tbody>
    </table>
);

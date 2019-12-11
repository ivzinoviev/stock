import React from 'react';
import Chart from 'react-google-charts';

export const ChartWrap = ({ charts }) => (
    <Chart
        width={'100%'}
        height={'400px'}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={charts}
    />
);

import React from 'react';
import { connect } from 'react-redux';
import Octicon, { ChevronLeft } from '@primer/octicons-react';
import { selectStockData } from '../../selectors/stockDataSelector';
import { QuotesTable } from './QuotesTable';
import { resetStockData } from '../../actions/actions';
import { ChartWrap } from './ChartWrap';

const StockPresentComponent = ({
  stockData: {
    company,
    range,
    quotes,
    charts,
  },
  resetStockData,
}) => (
    <div className='row'>
        <div className="col-md-12">
            <h1>
                {company}
            </h1>
            <p className='lead text-muted'>
                    <span
                        style={{
                          cursor: 'pointer',
                          paddingRight: '5px',
                          verticalAlign: 'text-bottom',
                        }}
                        onClick={resetStockData}
                    >
                    <Octicon icon={ChevronLeft} verticalAlign='middle'/>
                </span>
                {range}
            </p>
            <ChartWrap
                charts={charts}
            />
            <QuotesTable
                quotes={quotes}
            />
        </div>
    </div>
);

const mapStateToProps = (state) => ({
  stockData: selectStockData(state),
});

const mapDispatchToProps = {
  resetStockData,
};

export const StockPresent = connect(mapStateToProps, mapDispatchToProps)(StockPresentComponent);

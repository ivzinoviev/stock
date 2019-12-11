import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CompanyForm } from './CompanyForm';
import { selectStockData } from '../selectors/stockDataSelector';
import { StockPresent } from './StockPresent';

class AppComponent extends Component {
  render() {
    const { stockData } = this.props;
    return (
        <div className="container">
          {stockData ? (
              <StockPresent />
          ) : (
              <CompanyForm />
          )}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stockData: selectStockData(state),
});

export const App = connect(mapStateToProps)(AppComponent);

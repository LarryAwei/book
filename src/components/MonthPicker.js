import React from 'react'
import {padLeft, range} from "../utility";
import PropTypes from 'prop-types';

class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectYear: this.props.year
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }
    handleClick = (event) =>{
        if(this.node.contains(event.target))
            return;
        this.setState({
            isOpen: false
        })
    }
    toggleDropdown = (event) => {
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    selectYear = (event, yearNumber) => {
        event.preventDefault();
        this.setState({
            selectYear: yearNumber
        })
    };
    selectMon = (event, monthNumber) => {
        event.preventDefault();
        this.setState({
            isOpen: false
        });
        this.props.onChange(this.state.selectYear, monthNumber)
    };
    render() {
        const {year, month} = this.props;
        const {isOpen, selectYear} = this.state;
        const monthRange = range(12, 1);
        const yearRange = range(12, -6).map(number => number + year);
        return (
            <div className={"dropdown month-picker-component"} ref={(ref)=>{this.node=ref}}>
                <h5>选择月份</h5>
                <button className={"btn btn-lg btn-secondary dropdown-toggle"}
                onClick={this.toggleDropdown}>
                    {`${this.state.selectYear}年 ${padLeft(month)}月`}
                </button>
                {isOpen &&

                <div className={"dropdown-menu"} style={{display: 'block'}}>
                    <div className={"row"} style={{flexWrap: 'nowrap'}}>
                        <div className={"col border-right"}>
                            {
                                yearRange.map((yearNumber, index)=>
                                    <a href={'#'} key={index} className={yearNumber===selectYear?'dropdown-item active':'dropdown-item'}
                                    onClick={(event)=>this.selectYear(event, yearNumber)}>{yearNumber}年</a>)
                            }
                        </div>
                        <div className={"col"}>
                            {
                                monthRange.map((monthNumber, index)=>
                                    <a href={'#'} key={index} className={monthNumber===month?'dropdown-item active':'dropdown-item'}
                                    onClick={event => this.selectMon(event, monthNumber)}>{padLeft(monthNumber)}月</a>)
                            }
                        </div>

                    </div>
                </div>
                }
            </div>
        )
    }
}
MonthPicker.propTypes = {

};
export default MonthPicker

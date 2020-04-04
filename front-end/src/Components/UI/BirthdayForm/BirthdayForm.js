import React from 'react'

const BirthdayForm = props => {
    let days = []
    for (var input = 1; input <= 31; input++) {
        days = days.concat(<option key={input}> {input} </option>)
    }

    let years = []

    for (var input = 1; input <= 70; input++) {
        years = years.concat(<option key={input}> {2015 - input} </option>)
    }

    return (
        <React.Fragment>
            <select className="form-control" required disabled={props.d_year ? props.d_year : false} onChange={props.monthChange} defaultValue={props.month ? props.month : ""}>
                <option value=""> Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>

            <select className="form-control" required disabled={props.d_month ? props.d_month : false} onChange={props.dayChange} defaultValue={props.day ? props.day : ""}>
                <option value=""> Day</option>
                {days}
            </select>

            <select className="form-control" required disabled={props.d_day ? props.d_day : false} onChange={props.yearChange} defaultValue={props.year ? props.year : ""}>
                <option value=""> Year</option>
                {years}
            </select>
        </React.Fragment>
    )
}

export default BirthdayForm
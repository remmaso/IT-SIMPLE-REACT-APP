import React, {Component} from 'react'

class SalaryTags extends Component {

    render() {
        if (!this.props.tags) {
            return <div/>;
        }
        let elements = this.props.tags;
        return (
            <div className={"row contract_type"}>
                {
                    elements.map((salary) => (
                        <div key={salary.type} className={"col-auto"}>{salary.type}</div>
                    ))
                }
            </div>
        );
    }
}

export default SalaryTags

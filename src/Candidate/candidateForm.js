import React, {Component} from 'react';

class CandidateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            cid:'',
            experience:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.firstName + " " + this.state.lastName + " " + this.state.cid + " " + this.state.experience);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Candidate Information Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            First Name:
                            <input type="text" name='firstName' onChange={this.handleChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name='lastName' onChange={this.handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            CID:
                            <input type="text" name='cid' onChange={this.handleChange} />
                        </label>
                        <label>
                            Total Experience:
                            <input type="text" name='experience' onChange={this.handleChange} />
                        </label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CandidateForm;
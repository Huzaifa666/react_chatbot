import React, {Component} from "react";
import LoadingStep from './loadingSteps';

class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1500);
    }

    render(){
        const {text, sender} = this.props;
        const {loading} = this.state;
        return(
            <span>
                {(loading && sender === 'tIA')? <LoadingStep delay=".4s">. . . .</LoadingStep> : text}
            </span>
        );
    }
}

export default Steps;

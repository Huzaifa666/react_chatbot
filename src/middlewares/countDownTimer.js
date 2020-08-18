import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = value => {
/*    if (value === 0) {
        return <div className="timer">Too late</div>;
    }*/
    return (
        <div className="timer">
            <div className="value">{value}</div>
        </div>
    );
};

class CountDownTimer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { botInitialMessages } = this.props;
        return(
            <CountdownCircleTimer
                isPlaying
                durationSeconds={60}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                size={50}
                strokeWidth={7}
                renderTime={renderTime}
                onComplete={() =>  botInitialMessages("Waiting for your response...") [true, 1000]}
            />
        );
    }
}

export default CountDownTimer;


import React from "react";
import { connect } from "react-redux";
import { msgChatMessageRequest, msgChatMessageSuccess } from "./store/actions";
import "./App.css";
import Steps from './middlewares/steps';
import TextToSpeech from './middlewares/textToSpeech';
import {headingStyle, mainContainer, listStyle, leftListDiv, rightListDiv, botSenderStyle, hideOption, inputStyle, formPosStyle,
    userStyle , leftListInnerStyle, rightListInnerStyle, formStyle, styleWithoutTimer, styleWithTimer, chatbotBackStyle, buttonStyle } from "./appStyle.js";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import ReactDOM from "react-dom";
import SpeechToText from "./middlewares/speechToText";

const renderTime = value => {
    return (
        <div className="timer">
            <div className="value">{value}</div>
        </div>
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            textToBeSent: ""
        };
    }

    componentDidUpdate() {
        this.scrollToBottom();
        setTimeout(() => {
            this.scrollToBottom();
        }, 2000);
    }

    componentDidMount() {
        this.scrollToBottom();
        const { botInitialMessages, messages } = this.props;
        setTimeout(()=>{
            botInitialMessages("Before we begin with the Interview, I will need some more details from you -");
        }, 2000);
        setTimeout(()=>{
            botInitialMessages("Your Candidate ID?");
        }, 4000);

    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    handleChange(e) {
        this.setState({ textToBeSent: e.target.value });
    }
    setCandidateResponse(e){
        const { sendMessage } = this.props;
        sendMessage('Yes', true);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { textToBeSent } = this.state;
        const { sendMessage, onProcess } = this.props;
        if (textToBeSent.trim() === "") {
            alert("Empty is not allowed! ");
            return;
        }
        if(onProcess){
            onProcess : false;
        }
        sendMessage(textToBeSent);
        this.setState({ textToBeSent: "" });
    }

    render() {
        const { textToBeSent } = this.state;
        const { messages, onProcess, botInitialMessages, sendMessage, timerOne, timerTwo } = this.props;

        setTimeout(()=>{
            console.log(messages.length);
            console.log(messages);
            if (messages.length === 8)   {
                botInitialMessages("Thank You for the information, Let us begin with the Interview.");
            }
        }, 1000);
        return (
            <div style={chatbotBackStyle}>
                <div style={headingStyle}>Welcome to Techinal Interview</div>
                <div id="mainContainer" style={mainContainer}>
                    {/* message thread */}
                    <ul style={listStyle}>
                        {messages.map(({ text, sender, isErrorMessage }, index) => (
                            <div style={sender === "tIA" ? leftListDiv : rightListDiv}
                                ref={el => { this.el = el; }}>
                                <span style={sender === "tIA" ? botSenderStyle : hideOption}></span>
                                <li
                                    key={index}
                                    style={sender === "tIA" ? leftListInnerStyle : rightListInnerStyle}
                                >
                                <Steps text={text} sender={sender} index={index} />
                                 {messages.length === 5 && index === 4
                                    ? <div><button onClick={this.setCandidateResponse.bind(this)} style={buttonStyle}>Yes</button>
                                    <button onClick={(e) => window.location.reload(false)}>No</button></div>
                                    : ''
                                  }
                                <TextToSpeech value={text} sender={sender}/>
                                </li>
                                <span style={sender === "tIA" ? hideOption : userStyle}></span>
                            </div>
                        ))}
                    </ul>
                </div>
                    {/* form input to send chat message */}
                <div style={formPosStyle}>
                        {/*<SpeechToText/>*/}
                        <form onSubmit={this.handleSubmit} style={formStyle}>
                            <input
                                style={inputStyle}
                                ref={input => input && input.focus()}
                                type="text"
                                value={textToBeSent}
                                onChange={this.handleChange}
                                spellcheck
                                placeholder="Please enter your response here"
                            />
                            <div style={styleWithoutTimer}>
                              {/*  <CountdownCircleTimer
                                    isPlaying ={timerOne}
                                    durationSeconds={20}
                                    colors={[["green", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                                    size={45}
                                    strokeWidth={7}
                                    onComplete={() =>{ botInitialMessages("Waiting for your response", true, false, true);}}
                                />*/}
                                <CountdownCircleTimer
                                    isPlaying ={timerTwo}
                                    durationSeconds={30}
                                    key={timerTwo}
                                    colors={[["green", 0.33], ["#F7B8   01", 0.33], ["#A30000"]]}
                                    size={45}
                                    strokeWidth={7}
                                    onComplete={() =>{ botInitialMessages("Waiting for your response....", true, false, false);}}
                                />
                            </div>
                            <div style={onProcess? styleWithTimer : styleWithoutTimer}>
                                <CountdownCircleTimer
                                    isPlaying ={onProcess}
                                    durationSeconds={60}
                                    key={onProcess}
                                    colors={[["green", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                                    size={45}
                                    strokeWidth={7}
                                    renderTime={renderTime}
                                    onComplete={() =>{ sendMessage("Timed Out. Question unattempted");}}
                                />
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;
const mapActionToProps = { sendMessage: msgChatMessageRequest , botInitialMessages: msgChatMessageSuccess};

export default connect(mapStateToProps, mapActionToProps)(App);

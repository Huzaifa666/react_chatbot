import types from "../store/action-types";
import { msgChatMessageSuccess } from "../store/actions";

const asyncSendMessage = async text => {
   const data = { 'input': text };
    const response = await fetch("http://127.0.0.1:5000/output", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            return result.question;
        });
    return response;
};

const asyncGreetingSendMessage = async text => {
    const data = { 'name': text };
    const response = await fetch("http://127.0.0.1:5000/cid", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => res.json()).then(result => {
            return result.question;
        });
    return response;
};


const asyncExperienceSendMessage = async text => {
    const data = { 'experience': text };
    const response = await fetch("http://127.0.0.1:5000/experience", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => res.json()).then(result => {
            return result.question;
        });
    return response;
};


export default ({ getState, dispatch }) => next => action => {
    next(action);
    const messagesLen = () => getState().messages.length;

    if (action.type === types["CHAT/MESSAGE_REQUEST"]) {
        const { text } = action.payload.message;
        const { candidateResponse } = action.payload;
        if (messagesLen() === 4) {
            /** async block */
            (async () => {
                let speech = await asyncGreetingSendMessage(text);
                next(msgChatMessageSuccess(speech, false, false, false));
            })();
        }else if(messagesLen() === 6 && candidateResponse){
            next(msgChatMessageSuccess("Please let me know your overall years of experience", false, false, false));
        }else if (messagesLen() === 8) {
            /** async block */
            (async () => {
                let speech = await asyncExperienceSendMessage(text);
                //next(msgChatMessageSuccess(speech));
                setTimeout(
                    function() {
                        next(msgChatMessageSuccess(speech, true, true, true));
                    },
                    2000
                );
        })();
        } else {
            /** async block */
            if(messagesLen() !== 6){
                (async () => {
                    console.log(
                        "[chatbot:async] messagesLen: ",
                        messagesLen(),
                        " (before asyncSendMessage)"
                    );
                    console.log("[chatbot:async] will asyncSendMessage");
                    let speech = await asyncSendMessage(text);
                    console.log("[chatbot:async] finish asyncSendMessage");
                    console.log(
                        "[chatbot:async] messagesLen: ",
                        messagesLen(),
                        " (after asyncSendMessage)"
                    );

                    if(speech.includes('Thank you')){
                        next(msgChatMessageSuccess(speech, false, false, false));
                        setTimeout(
                            function() {
                                window.location.reload(false);
                            },
                            7000
                        );
                    }else{
                        next(msgChatMessageSuccess(speech, true, true, true));
                    }

                    //dispatch(msgChatMessageSuccess(speech));

                    // executed asynchronously after messages has increased
                    console.log(
                        "[chatbot:async] messagesLen: ",
                        messagesLen(),
                        " (after successfully push message into state)"
                    );
                })();
            }
        }
        /** **************** */
    }

    // executed immediately
    console.log(
        "[chatbot:outside async] messagesLen: ",
        messagesLen(),
        " (last line of code in the middleware)".toUpperCase()
    );

    // next(action);
};

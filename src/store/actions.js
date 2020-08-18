import types from "./action-types";

let isErrorMessage = false;
let onProcess = false;
let timerOne = false;
let timerTwo = false;
let sender = "tIA";
let error = null;
console.log("CHECK: ACTION ENTERED ONCE");

// action creator
export const msgChatMessageRequest = (text, candidateResponse = false) => ({
    type: types["CHAT/MESSAGE_REQUEST"],
    payload: {
        message: {
            text,
            sender: "User",
            isErrorMessage,
        },
        onProcess: false,
        timerOne: false,
        timerTwo: false,
        candidateResponse : candidateResponse,
        error
    }
});

export const msgChatMessageSuccess = (text, flag, flag1, flag2) => ({
    type: types["CHAT/MESSAGE_SUCCESS"],
    payload: {
        message: {
            text,
            sender,
            isErrorMessage
        },
        onProcess: flag,
        timerOne: flag1,
        timerTwo: flag2,
        error
    }
});

export const msgChatMessageError = error => ({
    type: types["CHAT/MESSAGE_ERROR"],
    payload: {
        message: {
            text: "Sorry! " + error.message,
            sender,
            isErrorMessage: true
        },
        onProcess,
        error
    }
});

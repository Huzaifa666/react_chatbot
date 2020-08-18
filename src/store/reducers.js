import types from "./action-types";

console.log("CHECK: REDUCER ENTERED ONCE");

const initState = {
    messages: [
        {
            text: "Hi, I am tIA, The Interviewing Assistant!",
            sender: "tIA",
            isErrorMessage: false
        }
    ],
    onProcess: false,
    timerOne : false,
    timerTwo : false,
    error: null
};

// Commit Reducers
const processChatMessage = (state, action) => {
    console.log("[reducer]", action.type);
    const { messages } = state;
    const { message, onProcess, timerOne, timerTwo } = action.payload;

    const newMessages = [...messages, message];

    return { ...state, messages: newMessages, onProcess: onProcess, timerOne: timerOne, timerTwo:timerTwo};
};

const commitChatMessageRequest = processChatMessage;
const commitChatMessageSuccess = processChatMessage;
const commitChatMessageError = processChatMessage;

// Hub Reducer
const ChatMessageReducer = (state = initState, action) => {
    let newState;
    switch (action.type) {
        case types["CHAT/MESSAGE_REQUEST"]:
            newState = commitChatMessageRequest(state, action);
            break;
        case types["CHAT/MESSAGE_SUCCESS"]:
            newState = commitChatMessageSuccess(state, action);
            break;
        case types["CHAT/MESSAGE_ERROR"]:
            newState = commitChatMessageError(state, action);
            break;
        default:
            newState = state;
    }

    return newState;
};

export default ChatMessageReducer;

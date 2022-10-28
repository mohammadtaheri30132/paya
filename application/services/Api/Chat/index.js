import http from "../../httpServices"

export const getAllUserChats = () =>http.get('/chat')

export const getChatMessages = (id) =>http.get('/chat/'+id)

export const createChat = ({participants,messages}) =>http.post('/chat',{participants,messages})

export const createMessage = ({chatId,body}) =>http.post('/chat/message',{chatId,body})

export const updateMessage = ({mId,body}) =>http.put('/chat/message',{_id:mId,body})

export const reactMessage = ({id,code}) =>http.put('/chat/message/'+id+"/react/"+code)

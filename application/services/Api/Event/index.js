import http from "../../httpServices"

export const getEvents = (data) =>http.get('/event',{params:data})


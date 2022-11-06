import http from "../../httpServices"

export const getCoaches = (data) =>http.get('/coach/all',{params:data})

export const getCoach = (id) =>http.get('/coach/'+id)


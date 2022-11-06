import http from "../../httpServices"

export const getCourts = (data) =>http.get('/facility/all',{params:data})

export const getCourt = (id) =>http.get('/facility/'+id)

export const createFacility = (data) =>http.post('/facility',data)

export const updateFacility = (data) =>http.put('/facility',data)




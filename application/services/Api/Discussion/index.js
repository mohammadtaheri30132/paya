import http from "../../httpServices"

export const getDiscussion = (data) =>http.get('/discussion',{params:data})
export const getDiscussionById = (id) =>http.get('/discussion/'+id)
export const getDiscussionComment = (id) =>http.get('/discussion/'+id+'/comment')

export const createComment = ({mId,body}) =>http.post('/discussion/comment',{discussionId:mId,body})
export const createDiscussion = ({participants,body,geometry}) =>http.post('/discussion',{participants,body,geometry})

export const updateCommentBody = ({mId,body}) =>http.put('/discussion/comment',{_id:mId,body})
export const updateDiscussionBody = ({mId,body}) =>http.put('/discussion',{_id:mId,body})

export const reactComment = ({id,code}) =>http.put('/discussion/comment/'+id+'/react/'+code)
export const reactDiscussion = ({id,code}) =>http.put('/discussion/'+id+'/react/'+code)

export const deleteComment = ({id}) =>http.delete('/discussion/comment/'+id)
export const deleteDiscussion = ({id}) =>http.delete('/discussion/'+id)

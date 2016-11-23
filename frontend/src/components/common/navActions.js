const navigate = ( place ) => ( dispatch ) => 
    dispatch( { type: 'NAVIGATION', location: place} )

export { navigate }

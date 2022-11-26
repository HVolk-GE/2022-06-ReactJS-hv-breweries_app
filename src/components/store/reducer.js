
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            {
                let loggedInUser = null
                state.users.forEach(user => {
                    if (action.username === user.username && action.password === user.password) {
                        loggedInUser = user
                    }
                })

                if (loggedInUser) {
                    console.log('Login successful');
                    localStorage.setItem("Auth", loggedInUser)
                    return { ...state, currentUser: loggedInUser }

                } else {
                    // No maching login data found:
                    console.log('Login failed');
                    return state
                }
            }

        case 'LOGOUT':
            console.log('User logged out');
            return { ...state, currentUser: null }

        case 'LOAD_USER_JSON':
            return action.data

        case 'HOLE_BREWERIES_DATA':
            return {
                ...state, holebreweries: action.holebreweries
            }

        case 'SEL_BREWERIES_CITY':
            return {
                ...state, breweriescity: action.breweriescity
            }

        case 'SEL_BREWERIES_TYPE':
            return { ...state, breweriestype: action.breweriestype }

        case 'SET_BREWERIY_DATA':
            return { ...state, brewerydataset: action.brewerydataset }

        case 'SET_USERFAVORITE_DATA':
            return { ...state, breweryuserdataset: action.breweryuserdataset }

        case 'SET_RENDERS':
            return { ...state, rendners: action.rendners }

        default:
            return state
    }
}

export default reducer

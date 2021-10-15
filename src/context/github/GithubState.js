import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext'; 
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        //global state for anything to do with github
        users: [],
        user: {},
        repos: [],
        loading: false, 
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Search Users
    const searchUsers = async text => {
        setLoading();
        //make request to github api
        const response = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${
            githubClientId}&client_secret=${
            githubClientSecret}`
        ); //must use backticks to use that syntax
        
        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        }); //dispatches response to reducer
    };

    // Get User
    const getUser = async username => {
        setLoading();
        //make request to github api
        const response = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`); //must use backticks to use that syntax
    
        dispatch({
            type: GET_USER,
            payload: response.data
        });
      };

    // Get Repos
    const getUserRepos = async username => {
        setLoading();
    
        //make request to github api
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
            githubClientId}&client_secret=${
            githubClientSecret}`
        ); //must use backticks to use that syntax
    
        dispatch({
            type: GET_REPOS,
            payload: response.data
        });
      };

    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });
    

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });


    return <githubContext.Provider 
        value = {{
            //make these available to entire app
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
    </githubContext.Provider>
}

export default GithubState;
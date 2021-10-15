import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
    const githubContext = useContext(GithubContext);
    const { getUser, loading, user, repos, getUserRepos } = githubContext;

    useEffect(() => { //to run when the component mounts
        getUser(match.params.login); //to pass login into getUser
        getUserRepos(match.params.login); //to pass login into getUserRepos
        //eslint-disable-next-line
    }, []); //[] keeps it from repeatedly making requests

    const { 
        name, 
        avatar_url, 
        bio,
        blog,
        company,
        login,
        html_url,
        followers,
        following,
        location,
        public_repos,
        public_gists,
        hireable
    } = user;  //get all of the above from the github api requests from this.props.user

    if(loading) return <Spinner />

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to Search
            </Link>
            Hireable: {' '}
            {hireable ? (
            <i className='fas fa-check text-success'/>
            ) : ( 
            <i className='fas fa-times-circle text-danger'/>
            )}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} className='round-img' style={{width: '150px'}} alt=''></img>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && ( 
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                    <ul>
                        <li>
                            {login &&  //conditional because login is not a required field
                                <Fragment>
                                    <strong>Username: {login}</strong>
                                </Fragment>}
                        </li>

                        <li>
                            {company && 
                                <Fragment>
                                    <strong>Company: {company}</strong>
                                </Fragment>}
                        </li>

                        <li>
                            {blog &&  
                                <Fragment>
                                    <strong>Website: {blog}</strong>
                                </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>

            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    )
}

export default User

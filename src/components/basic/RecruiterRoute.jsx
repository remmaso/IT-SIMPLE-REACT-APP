import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { loginStatus } from '../../utils/Utils';

export const RecruiterRoute = ({ component: Component, onOpen, title, ...rest }) => {

  return (
    <Route { ...rest } render={ (props) => (
      loginStatus() === "recruiter"
        ? <Component { ...props } />
        : <Redirect to='/login_employer' />
    ) } />
  )
}
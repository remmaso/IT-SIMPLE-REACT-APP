import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { loginStatus } from '../../utils/Utils';

export const CandidateRoute = ({ component: Component, onOpen, title, ...rest }) => {

  return (
    <Route { ...rest } render={ (props) => (
      loginStatus() === "candidate"
        ? <Component { ...props } />
        : <Redirect to='/login' />
    ) } />
  )
}
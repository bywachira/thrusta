/* eslint-disable */

import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchToken } from "@thrusta/core/helpers/localstorage";
import { getAccount } from "@thrusta/core/redux/actions/auth";
import { useEffect } from "react";

type Props = {
  component: any;
  exact: boolean;
  path: string;
};

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  exact,
  path,
}): React.ReactElement => {
  const dispatch = useDispatch();

  const token = fetchToken();

  useEffect(() => {
    if (token) {
      dispatch(getAccount());
    }
  }, []);

  return (
    <Route
      exact={true}
      path={path}
      render={(props: RouteProps | Readonly<RouteProps>) =>
        !fetchToken() ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;

import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RouteProtected({ authenticate, user, element }) {
  const location = useLocation();
  
  if (!authenticate && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  //   This means the user will be sent to the /home page if they try to access any admin or auth route without being an admin.
  if (
    authenticate &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") || location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if(authenticate && user?.role === 'instructor' && !location.pathname.includes('instructor')){
    return <Navigate to='/instructor' />
  }

  return <Fragment>{element}</Fragment>
}

export default RouteProtected;

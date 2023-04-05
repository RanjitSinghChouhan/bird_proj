import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../store/actions/authAction";
import { getUsedArea } from "../store/actions/superAdminAction";
// import Loader from "../components/common/Loader";

const RouterList = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state);
  useEffect(() => {
    if (loader) {
      const element = document.getElementsByTagName("body")[0];
      element.classList.add("loader");
    } else {
      const element = document.getElementsByTagName("body")[0];
      element.classList.remove("loader");
    }
  }, [loader]);

  useEffect(() => {
    dispatch(userInfo());
    dispatch(getUsedArea())
  }, [dispatch]);

  return (
    <div className="RouterList">
      {/* {loader && <Loader />} */}
      <BrowserRouter>
        <Suspense fallback={<div />}>
          <Routes>
            {routes &&
              routes.map((route, index) => (
                <Route
                  path={route.path}
                  key={index}
                  exact={route.exact}
                  element={
                    <>
                      {route.isPrivate ? (
                        <PrivateRoute isLayout={route.isLayout}>
                          <route.element />
                        </PrivateRoute>
                      ) : (
                        <route.element />
                      )}
                    </>
                  }
                >
                  {route.children &&
                    route.children.map((childroute, i) =>
                      childroute.path === "" ? (
                        <Route
                          index
                          key={i}
                          element={
                            <>
                              {childroute.isPrivate ? (
                                <PrivateRoute isLayout={childroute.isLayout}>
                                  <childroute.element />
                                </PrivateRoute>
                              ) : (
                                <childroute.element />
                              )}
                            </>
                          }
                        />
                      ) : (
                        <Route
                          path={childroute.path}
                          key={i}
                          element={<childroute.element />}
                        />
                      )
                    )}
                </Route>
              ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};
export default RouterList;

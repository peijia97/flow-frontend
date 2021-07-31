import React from "react";

const HomePage = React.lazy(() => import("./views/home/HomePage"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/", name: "HomePage", component: HomePage }
];

export default routes;

import React from "react";

const HomePage = React.lazy(() => import("./views/home/HomePage"));
const PreviewPage = React.lazy(() => import("./views/preview/PreviewPage"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/preview", name: "PreviewPage", component: PreviewPage },
  { path: "/", name: "HomePage", component: HomePage }
];

export default routes;

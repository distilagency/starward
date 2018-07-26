function fetchDataForRoute(routes, queries) {
  let params = {};
  let fetchData;
  let name;
  routes.forEach((route) => {
    params = {
      ...params,
      ...route.match.params,
    };
    ({ fetchData, name } = route.route);
  });
  return fetchData ? fetchData(params, name, queries) : Promise.resolve();
}

export default fetchDataForRoute;

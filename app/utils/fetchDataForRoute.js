function fetchDataForRoute(routes, queries) {
  let params = {};
  let fetchData;
  let name;
  routes.forEach((route) => {
    params = {
      ...params,
      ...route.match.params,
    };
    fetchData = route.route.fetchData;
    name = route.route.name;
  });
  return fetchData ? fetchData(params, name, queries) : Promise.resolve();
}

export default fetchDataForRoute;

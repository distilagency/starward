const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ routes, params }) {
  const matchedRoute = routes[routes.length - 1];
  const routeName = matchedRoute.name;
  const fetchDataHandler = matchedRoute.fetchData || defaultFetchData;
  return fetchDataHandler(params, routeName);
}

export default fetchDataForRoute;

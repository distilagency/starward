const defaultFetchData = () => Promise.resolve();

function fetchDataForApp({ routes, params, location }) {
  const appRoute = routes[0];
  const routeName = appRoute.name;
  const fetchAppHandler = appRoute.fetchData || defaultFetchData;
  return fetchAppHandler(params, routeName, location);
}

export default fetchDataForApp;

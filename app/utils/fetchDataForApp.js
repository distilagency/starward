const defaultFetchData = () => Promise.resolve();

function fetchDataForApp({ routes, params }) {
  const appRoute = routes[0];
  const routeName = appRoute.name;
  const fetchAppHandler = appRoute.fetchData || defaultFetchData;
  return fetchAppHandler(params, routeName);
}

export default fetchDataForApp;

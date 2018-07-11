import { isProduction } from '../../../app/config/app';

const createStaticAssets = isProduction ? require('./prod') : require('./dev');

export default createStaticAssets;

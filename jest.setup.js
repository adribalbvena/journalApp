import { getEnvironments } from './src/helpers';

import 'whatwg-fetch';
import 'setimmediate';
require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers', () => ({
    getEnvironments: () => ({ ...process.env })
}))
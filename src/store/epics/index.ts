import * as firstEpic from './firstEpic';
import * as secondEpic from './secondEpic';

export const rootEpic = [...Object.values(firstEpic), ...Object.values(secondEpic)];

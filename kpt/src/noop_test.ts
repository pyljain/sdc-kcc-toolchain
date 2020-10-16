import { Configs, TestRunner } from 'kpt-functions';
import { noop } from './noop';

const RUNNER = new TestRunner(noop);

describe('noop', () => {
  it('does something', async () => {
    // TODO: Populate the input to the function.
    const input = new Configs();

    // TODO: Populate the expected output of the function.
    const expectedOutput = new Configs();

    await RUNNER.assert(input, expectedOutput);
  });
});

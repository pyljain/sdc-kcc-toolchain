import { Configs, TestRunner } from 'kpt-functions';
import { activeassist } from './activeassist';

const RUNNER = new TestRunner(activeassist);

describe('activeassist', () => {
  it('does something', async () => {
    // TODO: Populate the input to the function.
    const input = new Configs();

    // TODO: Populate the expected output of the function.
    const expectedOutput = new Configs();

    await RUNNER.assert(input, expectedOutput);
  });
});

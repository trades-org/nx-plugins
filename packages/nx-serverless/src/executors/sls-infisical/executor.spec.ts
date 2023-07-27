import { testContext } from '../../utils/test-context';
import executor from './executor';
import { SlsInfisicalExecutorSchema } from './schema';

const options: SlsInfisicalExecutorSchema = {
  command: '',
  infisicalPath: '',
  infisicalEnv: '',
};

describe('SlsInfisical Executor', () => {
  it('can run', async () => {
    const output = await executor(options, testContext);
    expect(output.success).toBe(true);
  });
});

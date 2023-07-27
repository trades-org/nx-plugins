import { SlsInfisicalExecutorSchema } from './schema';
import executor from './executor';

const options: SlsInfisicalExecutorSchema = {};

describe('SlsInfisical Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
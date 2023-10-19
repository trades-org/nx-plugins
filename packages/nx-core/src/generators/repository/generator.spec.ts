import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import generator from './generator';
import { RepositoryGeneratorSchema } from './schema';

describe('repository generator', () => {
  let appTree: Tree;
  const options: RepositoryGeneratorSchema = {};

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run pass', async () => {
    await generator(appTree, options);

    expect(true).toBeDefined();
  });
});

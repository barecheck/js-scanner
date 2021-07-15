const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// TODO: have better approach of seitching between branches
// Would be great to have covered cases where we have errors during checkout and we can easily rollback

const checkoutToBranch = async (branch) => exec(`git checkout ${branch}`);

const getCurrentBranch = async () => {
  const { stdout: branch } = await exec('git rev-parse --abbrev-ref HEAD');

  return branch.trim();
};

const stash = () => exec(`git stash`);

const stashApply = () => exec(`git stash apply`);

const diffFileNames = async (branch) => {
  const { stdout: files } = await exec(`git diff --name-only ${branch}`);

  return files.split('\n').filter((path) => path !== '');
};

module.exports = {
  checkoutToBranch,
  getCurrentBranch,
  stash,
  stashApply,
  diffFileNames
};

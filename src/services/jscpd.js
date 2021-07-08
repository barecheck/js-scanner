const { MemoryStore, Statistic, getDefaultOptions } = require('@jscpd/core');
const { Tokenizer, getSupportedFormats } = require('@jscpd/tokenizer');
const { getFilesToDetect, InFilesDetector } = require('@jscpd/finder');

const detectClones = async (path) => {
  // TODO: Ability to confifure code duplication by passing jscpd config
  const options = {
    ...getDefaultOptions(),
    ...{
      minLines: 5,
      maxLines: 500,
      format: getSupportedFormats(),
      path
    }
  };

  const tokenizer = new Tokenizer();
  // here you can use any store what implement IStore interface
  const store = new MemoryStore();
  const statistic = new Statistic(options);

  const files = getFilesToDetect(options);

  const detector = new InFilesDetector(tokenizer, store, statistic, options);

  const clones = await detector.detect(files);

  return { statistic, clones };
};

module.exports = {
  detectClones
};

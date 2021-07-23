const { info, table } = require('../../../output');

const buildTrendValue = (value) => {
  if (parseInt(value, 10) === 0) return value;

  return `${value > 0 ? '+' : ''}${value}`;
};

const buildDetails = (clones, changedFiles) => {
  const duplicatesTable = clones.reduce(
    (acc, { duplicationA, duplicationB }) => {
      const buildLine = (duplication) => {
        const path = duplication.sourceId;
        const startLine = duplication.start.line;
        const endLine = duplication.end.line;

        return `${path}:${startLine}-${endLine}`;
      };

      // show report only with changed files
      if (changedFiles.includes(duplicationB.sourceId)) {
        const index = buildLine(duplicationB);
        const defaultDuplicatedBlock = {
          duplicates: []
        };
        const duplicatedBlock = acc[index] || defaultDuplicatedBlock;
        duplicatedBlock.duplicates.push(buildLine(duplicationA));
        acc[index] = duplicatedBlock;
      }

      return acc;
    },
    {}
  );

  return duplicatesTable;
};

const buildBody = ({ linesDiff, tokensDiff, totalPercentage, totalTokens }) => {
  const trendLinesOutput = buildTrendValue(linesDiff);
  const trendTokensOutput = buildTrendValue(tokensDiff);

  const totalPercentageOutput = `Total: ${totalPercentage}%`;
  const totalTokensOutput = `Total tokens: ${totalTokens}%`;

  const deescriptionLines = `Percentage of duplicated lines diff: ${trendLinesOutput}`;
  const deescriptionTokens = `Percentage of duplicated tokens diff: ${trendTokensOutput}`;
  const body = `${totalPercentageOutput}\n${totalTokensOutput}\n\n${deescriptionLines}\n${deescriptionTokens}`;

  return body;
};

const buildFullMessage = ({
  linesDiff,
  tokensDiff,
  totalPercentage,
  totalTokens,
  clones,
  changedFiles
}) => {
  const body = buildBody({
    linesDiff,
    tokensDiff,
    totalPercentage,
    totalTokens
  });
  const details = buildDetails(clones, changedFiles);

  info(body);
  if (Object.values(details).length > 0) table(details);
};

module.exports = buildFullMessage;

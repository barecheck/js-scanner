const { info, table } = require('../../../output');

const buildTrendValue = (value) => {
  if (parseInt(value, 10) === 0) return value;

  return `${value > 0 ? '+' : ''}${value}`;
};

const buildDetails = (clones) => {
  const duplicatesTable = clones.reduce(
    (acc, { duplicationA, duplicationB }) => {
      const buildLine = (duplication) => {
        const path = duplication.sourceId;
        const startLine = duplication.start.line;
        const endLine = duplication.end.line;

        return `${path}:${startLine}-${endLine}`;
      };
      const index = buildLine(duplicationB);

      const defaultDuplicatedBlock = {
        duplicates: []
      };
      const duplicatedBlock = acc[index] || defaultDuplicatedBlock;
      duplicatedBlock.duplicates.push(buildLine(duplicationA));
      acc[index] = duplicatedBlock;
      return acc;
    },
    {}
  );

  return duplicatesTable;
};

const buildBody = ({ linesDiff, tokensDiff, totalPercentage, totalTokens }) => {
  const trendLinesOutput = buildTrendValue(linesDiff);
  const trendBranchesOutput = buildTrendValue(tokensDiff);

  const totalPercentageOutput = `Total: ${totalPercentage}%`;
  const totalTokensOutput = `Total Branches: ${totalTokens}%`;

  const deescriptionLines = `Percentage of duplicated lines diff: ${trendLinesOutput}`;
  const deescriptionBranches = `Percentage of duplicated branches diff: ${trendBranchesOutput}`;
  const body = `${totalPercentageOutput}\n${totalTokensOutput}\n\n${deescriptionLines}\n${deescriptionBranches}`;

  return body;
};

const buildFullMessage = ({
  linesDiff,
  tokensDiff,
  totalPercentage,
  totalTokens,
  clones
}) => {
  const body = buildBody({
    linesDiff,
    tokensDiff,
    totalPercentage,
    totalTokens
  });
  const details = buildDetails(clones);

  info(body);
  if (Object.values(details).length > 0) table(details);
};

module.exports = buildFullMessage;

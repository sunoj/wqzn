const markdownQueryConfig = [
    {
        section: `document`,
        indexName: `document`,
        niceName: `document`,
    },
    {
        section: `knowledgeBase`,
        indexName: `knowledgeBase`,
        niceName: `Knowledge Base`,
    },
    {
        section: `actionGuide`,
        indexName: `actionGuide`,
        niceName: `Action Guide`,
    },
    {
        section: `showcase`,
        indexName: `showcase`,
        niceName: `Showcase`,
    },
]

module.exports = {
    defaultMarkdownSection: `document`,
    markdownQueryConfig,
    searchConfig: markdownQueryConfig
        .reduce((acc, { indexName, niceName }) => {
            acc[indexName] = niceName
            return acc
        }, {}),
}

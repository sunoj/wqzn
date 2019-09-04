const { allMarkdownPosts } = require(`./node-queries`)
const { markdownQueryConfig } = require(`./query-config`)
const { fragmentTransformer } = require(`./algolia-transforms`)
const urlUtils = require(`./urls`)

const algoliaMarkdownFields = `
    objectID:id
    fields {
        slug
        section
    }
    frontmatter {
        title
        heading
        image
    }
    html
`

const mdNodeMap = ({ node }) => {
    // Flatten fields
    node.slug = node.fields.slug
    node.section = node.fields.section
    node.title = node.frontmatter.heading
    // @TODO make this consistent?!
    // TODO: switch to relative URLs again, once the move to G3 is fully completed
    node.url = urlUtils.convertToAbsoluteUrl(node.slug)

    delete node.frontmatter
    delete node.fields
    return node
}

const mdQueries = markdownQueryConfig.map(({ section, indexName }) => {
    return {
        query: allMarkdownPosts(section, algoliaMarkdownFields),
        indexName,
        transformer: ({ data }) => data
            .allMarkdownRemark.edges
            .map(mdNodeMap)
            .reduce(fragmentTransformer, []),

    }
})

// The REAL DEAL
module.exports = mdQueries

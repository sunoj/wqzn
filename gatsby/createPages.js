const path = require(`path`)
const { allMarkdownPosts } = require(`../utils/node-queries`)

module.exports.createRedirects = ({ actions }) => {
    const { createRedirect } = actions

    // The /action-guide/ page doesn't exist, we need to redirect to
    // the first post of this section
    createRedirect({
        fromPath: `/action-guide/`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: `/action-guide/barbershop-card/`,
    })

    createRedirect({
        fromPath: `/document/`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: `/document/china-advertising-law/`,
    })

    createRedirect({
        fromPath: `/knowledge-base/`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: `/knowledge-base/general-methodology-of-struggle/`,
    })

    createRedirect({
        fromPath: `/about/`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: `/about/about/`,
    })

}

module.exports.createMarkdownPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const queryPromises = []

    queryPromises.push(new Promise((resolve, reject) => {
        graphql(allMarkdownPosts())
            .then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }
                return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    const DocTemplate = path.resolve(`./src/templates/markdown/post.js`)
                    createPage({
                        path: node.fields.slug,
                        component: DocTemplate,
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.fields.slug,
                            section: node.fields.section,
                        },
                    })
                    return resolve()
                })
            })
    }))

    return Promise.all(queryPromises)
}

module.exports.createShowcasePage = async ({ actions }) => {
    const { createPage } = actions
    const DocTemplate = path.resolve(`./src/templates/showcase.js`)
    createPage({
        path: `/showcase/`,
        component: DocTemplate,
    })
}

module.exports.createBrandPage = async ({ actions }) => {
    const { createPage } = actions
    const DocTemplate = path.resolve(`./src/pages/brand.js`)
    createPage({
        path: `/brand/`,
        component: DocTemplate,
    })
}

module.exports.createTagsPage = async ({ actions }) => {
    const { createPage } = actions
    const DocTemplate = path.resolve(`./src/templates/tagList.js`)
    createPage({
        path: `/tagList/`,
        component: DocTemplate,
    })
}

module.exports.createTagMatchPage = async ({ graphql, actions }) => {
    const { createPage } = actions
    const queryPromises = []

    queryPromises.push(new Promise((resolve, reject) => {
        graphql(allMarkdownPosts())
            .then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }
                return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    const DocTemplate = path.resolve(`./src/templates/tagMatch.js`)
                    const tag = node.frontmatter.tag;
                    if ( tag ) {
                        createPage({
                            path: `/tagList/${tag}`,
                            component: DocTemplate,
                            context: {
                                tag: tag
                            },
                        })
                    }
                    return resolve()
                })
            })
    }))

    return Promise.all(queryPromises)
}
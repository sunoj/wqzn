import { graphql } from 'gatsby'

export const siteMetaFields = graphql`
    fragment SiteMetaFields on Site {
        siteMetadata {
            siteUrl
            title
            description
        }
    }
`

export const markdownFields = graphql`
    fragment MarkdownFields on MarkdownRemark {
        frontmatter {
            title
            heading
            date
            date_pretty: date(formatString: "DD MMMM, YYYY")
            path
            meta_title
            meta_description
            image
            next {
                url
                title
                description
            }
            sidebar
            toc
            keywords
            category
            originalLinks
        }
        html
        fields {
            slug
        }
        timeToRead
        excerpt
        fileAbsolutePath
    }
`

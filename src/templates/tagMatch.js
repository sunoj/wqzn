import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common/layout'
import FullWidthBar from '../components/common/layout/FullWidthBar'
import BackToList from '../components/common/BackToList'
import DocMetaTitle from '../components/common/DocMetaTitle'

const TagMatch = ({ data, location }) => {
    const res = data.allMarkdownRemark.edges;

    return (
        <>
            <DocMetaTitle title="标签" location={location} />
            <Layout location={location}>
                <div className=" center mw-xl pl5 pr5 pl10-ns pr10-ns  flex flex-column flex-row-ns justify-start relative">
                    <div style={{margin: '0 auto'}}>
                        <div className="w-100 mw-content bg-white shadow-2 br4  br--bottom">
                            <FullWidthBar />
                            <article className="flex-auto pa5 pa8-m pa15-l pt10-ns pb10-ns pt10-l pb10-l relative">
                                <BackToList name="返回标签列表" to="/tagList/" />
                                <div className="flex content-between items-baseline justify-between no-wrap">
                                    <h3 className="f1-mobile lh-h2 f1-l lh-h1-l fw3 ma0 pa0 measure--1-0 darkgrey">根据标签匹配到</h3>
                                </div>
                                <section className="post-content external-scripts">
                                    <div>
                                        <ol>
                                            {
                                                res.length && (
                                                    res.map((item,index) => {
                                                        return (
                                                            <li style={{fontSize: '18px'}} key={index}>
                                                                <Link to={item.node.fields.slug}>
                                                                    {item.node.frontmatter.heading}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                )
                                            }
                                        </ol>
                                    </div>
                                </section>
                            </article>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

TagMatch.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        allMarkdownRemark: {
            edges: PropTypes.arrayOf({
                node: PropTypes.shape({
                    frontmatter: PropTypes.shape({
                        sidebar: PropTypes.string,
                        title: PropTypes.string.isRequired,
                    }).isRequired,
                }).isRequired
            })
        },
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default TagMatch

export const articleQuery = graphql`
    query($tag: String) {
        site {
            ...SiteMetaFields
        }
        allMarkdownRemark(
            limit: 2000,
            sort: { fields: [frontmatter___date], order: DESC },
            filter: {frontmatter: {tag: {eq: $tag}}}
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        heading
                        date
                        sidebar
                    }
                }
            }
        }
    }
`

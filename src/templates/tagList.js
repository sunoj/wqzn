import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common/layout'
import FullWidthBar from '../components/common/layout/FullWidthBar'
import _ from 'lodash'
import DocMetaTitle from '../components/common/DocMetaTitle'

const TagMatch = ({ data, location }) => {
  
  const res = data.allMarkdownRemark.edges;
  const tags = _.uniq(
    res.map(item => {
      return item.node.frontmatter.tag
    })
  )

  return (
    <>
      <DocMetaTitle title="标签列表" location={location} />
      <Layout location={location}>
        <div className=" center mw-xl pl5 pr5 pl10-ns pr10-ns  flex flex-column flex-row-ns justify-start relative">
          <div style={{ margin: '0 auto' }}>
            <div className="w-100 mw-content bg-white shadow-2 br4  br--bottom">
              <FullWidthBar/>
              <article className="flex-auto pa5 pa8-m pa15-l pt10-ns pb10-ns pt10-l pb10-l relative">
                <div className="flex content-between items-baseline justify-between no-wrap">
                  <h3 className="f1-mobile lh-h2 f1-l lh-h1-l fw3 ma0 pa0 measure--1-0 darkgrey">标签</h3>
                </div>
                <section className="post-content external-scripts">
                  <div style={{ marginTop: '20px' }}>
                    {
                      tags.length && (
                        tags.map((item, index) => {
                          return (
                            <Link className="tag-badge" to={`/tagList/${item}`} key={index}>
                              # {item}
                            </Link>
                          )
                        })
                      )
                    }
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
    query {
        site {
            ...SiteMetaFields
        }
        allMarkdownRemark(
            limit: 2000,
            filter: { frontmatter: { sidebar: { in: [ "document", "knowledge-base", "action-guide"]} } },
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        tag
                    }
                }
            }
        }
    }
`

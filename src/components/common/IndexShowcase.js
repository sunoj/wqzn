import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { HomeFAQLink } from '../home'

const IndexShowcase = ({data}) => {
  // console.log('---', data)
  const edges = data.allMarkdownRemark.edges;

  return (
    <section className="mt3 mt7-ns">
        {
          edges.map( (item, index ) => {
            return (
              <div key={index}>
                <HomeFAQLink to={item.node.fields.slug} title={item.node.frontmatter.title}>
                  {item.node.excerpt}
                </HomeFAQLink>
              </div>
            )
          })
        }
    </section>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
          allMarkdownRemark(
              limit: 7,
              sort: { fields: [frontmatter___date], order: DESC },
              filter: { frontmatter: { category: { eq: "showcase"} } },
          ) {
              edges {
                  node {
                      fields {
                          slug
                      }
                      frontmatter {
                          title
                          heading
                          avatar
                      }
                  }
              }
          }
      }
    `}
    render={data => <IndexShowcase data={data} {...props} />}
  />
)
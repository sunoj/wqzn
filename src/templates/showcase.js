import React, { useState, useEffect } from 'react'
import { Layout } from '../components/common/layout'
import FullWidthBar from '../components/common/layout/FullWidthBar'
import { Link, graphql } from 'gatsby'
import _ from 'lodash'
import DocMetaTitle from '../components/common/DocMetaTitle'

const Showcase = ({data, location}) => {

	const edges = data.allMarkdownRemark.edges;
	const types = _.uniq(edges.map( item => (item.node.frontmatter.type) ))
	const allTypesName = '全部'
	types.unshift(allTypesName)

	const [activeType, setActiveType] = useState(allTypesName)
	const [list, setList] = useState(edges)

	useEffect(()=>{
		setList(
			activeType === allTypesName
				? edges
				: edges.filter(item => {
					console.log(item.node.frontmatter.type, activeType)
					return item.node.frontmatter.type === activeType
				})
		)
	}, [activeType])

	return (
		<>
			<DocMetaTitle title="维权案例" location={location} />
			<Layout location={location}>
				<div className="center mw-xl pl5 pr5 pl10-ns pr10-ns  flex flex-column flex-row-ns justify-start relative">
					<div className="showcase">
						<FullWidthBar/>
						<div style={{padding: '48px 0 0 30px'}}>
							<h3 className="f1-mobile lh-h2 f1-l lh-h1-l fw3 ma0 pa0 measure--1-0 darkgrey">维权案例</h3>
						</div>
						<div className="showcase-types">
							{
								types.map((type, index) => {
									return (
										<span
											className={`type ${type === activeType ? 'active' : ''}`} 
											key={index}
											onClick={()=>{
												setActiveType(type)
											}}
										>
											{type}
										</span>
									)
								})
							}
						</div>
						<div className="showcase-container">
							{
								list.map( (item, index) => {
									return (
										<div key={index} className="showcase-item">
											<Link to={item.node.fields.slug}>
												<div className="avatar" style={{ backgroundImage: `url(${item.node.frontmatter.avatar})`}}></div>
												<h4 className="item-title">{item.node.frontmatter.heading}</h4>
												<p className="item-excerpt">{item.node.excerpt}</p>
											</Link>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Showcase

export const articleQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
        allMarkdownRemark(
            limit: 500,
            filter: { frontmatter: { category: { eq: "showcase"} } },
        ) {
            edges {
                node {
										excerpt(format: PLAIN, pruneLength: 32, truncate: true)
                    fields {
                        slug
                    }
                    frontmatter {
												title
												heading
												type
												avatar
                    }
                }
            }
        }
    }
`
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import RcViewer from '@hanyk/rc-viewer'
import { Layout } from '../../components/common/layout'
import { Spirit } from '../../styles/spirit-styles'
import { SidebarNav } from '../../components/common/sidebar'
import { PrevNextSection } from '../../components/common/prev-next'
import { PostHeader, Icon, TOC } from '../../components/common'
import FullWidthBar from '../../components/common/layout/FullWidthBar'
import BackToList from '../../components/common/BackToList'
import DocMetaTitle from '../../components/common/DocMetaTitle'

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isToggleOn: false,
            isSiderShow: true
        }

        this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
    }

    toggleMobileMenu() {
        this.setState((state) => {
            return { isToggleOn: !state.isToggleOn }
        })
    }


    render() {
        const { location } = this.props
        const post = this.props.data.markdownRemark
        const sideBarLayout = {}

        const { sidebar } = post.frontmatter || ``
        const toc = post.frontmatter.toc === false ? false : true

        const groups = [
            {
                key: "document",
                group: "法规文档",
                items: []
            },
            {
                key: "knowledge-base",
                group: "知识库",
                items: []
            },
            {
                key: "action-guide",
                group: "行动指南",
                items: []
            },
        ]

        this.props.data.allMarkdownRemark.edges.forEach(item => {
            let group = groups.find(group => group.key === item.node.frontmatter.sidebar)
            group.items.push(
                {
                    link: item.node.fields.slug,
                    title: item.node.frontmatter.title
                }
            )
        });

        if (sidebar && toc) {  // Layout #1: navigation left and right: sidebar and TOC
            sideBarLayout.leftSidebar = <SidebarNav location={location} sidebar={sidebar} groups={groups} />
            sideBarLayout.rightSidebar = <div className="nr3 sticky top-25"><TOC className="pr4" listClasses="mt2" /></div>
            sideBarLayout.justification = `justify-between`
        } else if (sidebar || toc) {  // Layout #2: navigation left only, either TOC or sidebar
            sideBarLayout.leftSidebar = sidebar ?
                <SidebarNav location={location} sidebar={sidebar} groups={groups}  /> :
                <div className="nr3 sticky top-25"><TOC listClasses="lefty" className="mt5 mb5 mt10-ns mb0-ns" showHeading={false} /></div>
            sideBarLayout.justification = `justify-start`
        } else {  // Layout #3: no sidebar navigation
            sideBarLayout.justification = `justify-center`
        }

        const FixedBottomTip = () => {
            return (
                <div className="post-content">
                    <hr/>
                    <h3>依然存在疑问？</h3>
                    <p>
                        请加入我们的
                        <a
                            href="https://t.me/wqznorg"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                        >
                            Telegram 群
                        </a>
                        ，获取大家的帮助。
                    </p>
                </div>
            )
        }

        const OriginalLinks = () => {
            return (
                <div className="post-content original-links">
                    <h3>外部链接</h3>
                    <ul>
                        {
                        post.frontmatter.originalLinks.length && (
                            post.frontmatter.originalLinks.map((item, index) => {
                                return (
                                    <li>
                                        <a href={`${item}`} target="_blank" rel="nofollow noopener noreferrer" >
                                            {`${item}`}
                                        </a>
                                    </li>
                                )
                            })
                        )
                        }
                    </ul>
                </div>
            )
        }


        // Show in Duohui backend drawer
        const isPostOnly = location.search.indexOf('iframe=true') > 0;
        if ( isPostOnly ) {
            return (
                <div className={`w-100 mw-content bg-white br4`}>
                    <article className="flex-auto pa5 pa8-m pa15-l pt10-ns pb10-ns pt10-l pb10-l relative">
                        <div className="flex content-between items-baseline justify-between no-wrap">
                            <h1 className={`${Spirit.h1} darkgrey`}>{post.frontmatter.title}</h1>
                        </div>
                        <section
                            className="post-content external-scripts"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />
                    </article>
                </div>
            )
        }

        const isShowcasePost = post.frontmatter.category === 'showcase';

        return (
            <>
                <DocMetaTitle title={post.frontmatter.heading} location={location} />
                <Layout location={this.props.location}>
                    <PostHeader location={location} />
                    <div className={`${Spirit.page.xl} flex flex-column flex-row-ns ${sideBarLayout.justification} relative`}>
                        <button
                            onClick={() => this.toggleMobileMenu()}
                            className="bg-transparent bn appearance-none absolute right-7 db dn-ns"
                            style={{ top: `-40px` }}
                        >
                            <Icon name="hamburger" className="w6 h-auto stroke-white db dn-ns" />
                        </button>

                        {sideBarLayout.leftSidebar && this.state.isSiderShow ?
                            <div className={`${(this.state.isToggleOn ? `mobile-nav-open` : ``)} w-100 w-sidebar-ns pr10 pl5 pl0-ns flex-shrink-0-l relative left-sidebar`}>
                                {sideBarLayout.leftSidebar}
                            </div>
                            : null
                        }
                        <div style={this.state.isSiderShow ? null : {margin: '0 auto'}}>
                            <div className={`w-100 mw-content bg-white shadow-2 br4 ${(this.state.isToggleOn ? `` : ` br--bottom`)}`}>
                                <FullWidthBar/>
                                <article className="flex-auto pa5 pa8-m pa15-l pt10-ns pb10-ns pt10-l pb10-l relative">
                                    {isShowcasePost && (<BackToList name="返回案例列表" to="/showcase/" />) }
                                    <div className="flex content-between items-baseline justify-between no-wrap">
                                        <h1 className={`${Spirit.h1} darkgrey`}>{post.frontmatter.title}</h1>
                                    </div>
                                    <RcViewer options={{}} ref='viewer'>
                                        <section
                                            className="post-content external-scripts"
                                            dangerouslySetInnerHTML={{ __html: post.html } }
                                            onMouseUp={(event)=> {
                                                // if (event.button === 0) this.shareSelected()
                                            }}
                                        />
                                    </RcViewer>
                                    { post.frontmatter.originalLinks && (<OriginalLinks />)}
                                    {!isShowcasePost && (<FixedBottomTip />) }
                                </article>

                                {
                                    this.state.isSiderShow && (
                                        <div className="mw-content pl5 pr5 pl15-ns pr15-ns bt b--whitegrey mt5">
                                            <PrevNextSection
                                                location={location}
                                                sidebar={sidebar}
                                                next={post.frontmatter.next}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            {/* <FeedbackForm location={location} /> */}
                        </div>
                        {sideBarLayout.rightSidebar && this.state.isSiderShow ?
                            <div className="order-3 w-sidebar flex-shrink-0 dn db-l pt10 pl7">
                                {sideBarLayout.rightSidebar}
                            </div>
                            : null
                        }
                    </div>
                </Layout>
            </>
        )
    }
}

Post.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.shape({
                toc: PropTypes.bool,
                sidebar: PropTypes.string,
                title: PropTypes.string.isRequired,
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

export default Post

export const articleQuery = graphql`
    query($slug: String!) {
        site {
            ...SiteMetaFields
        }
        markdownRemark(fields: { slug: {eq: $slug}}) {
            ...MarkdownFields
        }
        allMarkdownRemark(
            limit: 2000,
            sort: { fields: [frontmatter___date], order: ASC },
            filter: { frontmatter: { sidebar: { in: ["document", "knowledge-base",  "action-guide"]} } },
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        slug
                        title
                        heading
                        date
                        sidebar
                        originalLinks
                    }
                }
            }
        }
    }
`

import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Icon, Box, Showcase } from '../components/common'
import { Layout } from '../components/common/layout'
import { HomeHeader, HomeFAQLink } from '../components/home'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'

const HomePage = ({ data, location }) => {
  // Add meta title and description for this page here to overwrite the site meta data as set in the config
  const title = `维权指南`
  const description = `维权指南是一个开放的知识库，试图为消费者提供一系列在维权过程中切实可行的操作指南和法律参考。`
  const imageUrl = getMetaImageUrls()
  const latestUpdates = data.allMarkdownRemark.edges;

  return (
    <>
      <MetaData
        data={data}
        location={location}
        type="website"
        title={title}
        description={description}
        image={imageUrl}
      />
      <Layout
        location={location}
        headerDividerStyle="shadow"
        bodyClass="bg-white"
        mainClass="bg-whitegrey-l2 pb-vw6 pb-vw3-ns"
        header={<HomeHeader location={location} />}
      >
        <div className="pt-vw3 home-main-box-padding-ns">
          <div className={`${Spirit.page.xl} grid-12 gutter-row-20 gutter-40-ns`}>

            <section className="col-12 col-6-ns flex flex-column justify-between mt4 mt0-ns">
              <h3 className={`${Spirit.h3} link darkgrey flex-grow-0`}>维权案例</h3>
              <Showcase />
            </section>

            <section className="col-12 col-6-ns mt0-ns bt bn-ns b--whitegrey nl5 nr5 nl0-ns nr0-ns ml0-ns mr0-ns pl5 pr5 pl0-ns pr0-ns pt5 pt0-ns ">
              <h3 className={`${Spirit.h3} link darkgrey`}>最近更新</h3>
              <div className="mt3 mt7-ns">
                {
                  latestUpdates.map((item, index) => {
                    return (
                      <div key={index}>
                        <HomeFAQLink to={item.node.fields.slug} title={item.node.frontmatter.heading}>
                          {item.node.excerpt}
                        </HomeFAQLink>
                      </div>
                    )
                  })
                }
              </div>
            </section>

            <section className={`col-12 mt8 mt-vw3-ns bt bn-ns b--whitegrey pt5 pt0-ns`}>
              <a href="#" className={`${Spirit.h3} link darkgrey hover-midgrey`}>实用网站</a>
              <p className={`${Spirit.p} mt2 midgrey flex flex-column flex-row-ns justify-between items-center-ns`}>
                在维权过程中实用的工具或主管部门网站
                 <a to="https://ghost.org/integrations/" className="blue link din nb1 mt2 mt0-ns hover-underline-blue">
                  <span className="flex items-center fw5">浏览网址导航 <Icon name="arrow-right" className="w3 h3 ml1 fill-blue" /></span>
                </a>
              </p>
              <div className="grid-integrations-index mt4 mt6-l f8">
                <Box href="http://www.12315.cn/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                  <img className="w10 mb1" src="https://qiniu.cdn.qfzhi.com/wqzn/entrance.png" alt="中华人民共和国国家市场监督管理总局" />
                  市场监督 12315
                </Box>
                <Box href="https://www.12321.cn/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                  <img className="w10 mb1" src="https://www.12321.cn/Public/home/image/wenImg.png" alt="网络不良与垃圾信息举报受理中心" />
                  网络不良信息 12312
                </Box>
                <Box href="https://dxss.miit.gov.cn/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                  <img className="w10 mb1" src="https://qiniu.cdn.qfzhi.com/wqzn/miit.png" alt="工业和信息化部电信用户申诉受理中心" />
                  工信部申诉受理中心
                </Box>
                <Box href="http://sswz.spb.gov.cn/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                  <img className="w10 mb1" src="https://qiniu.cdn.qfzhi.com/wqzn/spb.png" alt="国家邮政局申诉网站" />
                  国家邮政局申诉
                </Box>
                <Box href="http://12358.ndrc.gov.cn/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                  <img className="w10 mb1" src="https://qiniu.cdn.qfzhi.com/12358.png" alt="物价监督举报" />
                  物价监督 12358
                </Box>
                <Box href="http://www.12331.org.cn/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                  <img className="w10 mb1" src="https://qiniu.cdn.qfzhi.com/fda.jpg" alt="食品和药品监管" />
                  食药监 12331
                </Box>
                <Box href="http://www.sh12345.gov.cn/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                  <img className="w10 mb1" src="https://qiniu.cdn.qfzhi.com/12345.jpg" alt="Google AMP" />
                  市民热线 12345
                </Box>
                <Box href="https://ghost.org/integrations/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn" elevation="2" radius="4">
                  <Icon name="more" className="w8 nudge-top--6" />
                  查看更多
                </Box>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}

HomePage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default HomePage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
        allMarkdownRemark(
            limit: 3,
            sort: { fields: [frontmatter___date], order: DESC },
            filter: { frontmatter: { sidebar: { in: ["action-guide", "document", "knowledge-base"]} } },
        ) {
            edges {
                node {
                    excerpt(format: PLAIN, pruneLength: 80, truncate: true)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        heading
                    }
                }
            }
        }
    }
`

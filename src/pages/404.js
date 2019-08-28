import React from 'react'

import { Spirit } from '../styles/spirit-styles'
import { Layout } from '../components/common/layout'
import DocMetaTitle from '../components/common/DocMetaTitle'

const NotFoundPage = ({location}) => (
    <>
        <DocMetaTitle title="404" location={location} />
        <Layout headerDividerStyle="shadow" location={location}>
            <div className={`${Spirit.page.m} pt-vw5 pb-vw5 flex flex-column items-center`}>
                <h1 className={`${Spirit.h1}`}>404 <span role="img" aria-label="img">👻</span></h1>
                <p className={`${Spirit.p} lightgrey`}>您要找的页面不见了</p>
                <p className={`${Spirit.p} lightgrey`}>Page not found</p>
                <div className="flex mt12">
                    <a href="/" className="pa2 dib blue hover-darkgrey link">返回首页</a>
                </div>
            </div>
        </Layout>
    </>
)

export default NotFoundPage

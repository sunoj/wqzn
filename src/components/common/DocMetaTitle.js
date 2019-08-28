import React from 'react'
import { MetaData, getMetaImageUrls } from './meta'

function DocMetaTitle({ title, location }) {

  const imageUrl = getMetaImageUrls()

  return (
    <MetaData
      data={{
        site: { siteMetadata: { description: '', siteUrl: '', title: '' } },
        ghostPost: { meta_title: `${title}-维权指南` }
      }}
      location={location}
      type="article"
      image={imageUrl}
    />
  )
}

export default DocMetaTitle;
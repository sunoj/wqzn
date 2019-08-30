import React from "react"
import PropTypes from 'prop-types'
import {
    InstantSearch,
    Configure,
} from 'react-instantsearch-dom'

const SearchWrapper = ({ children }) => (
    <InstantSearch
        appId={process.env.ALGOLIA_APP_ID}
        apiKey={process.env.ALGOLIA_ADMIN_KEY}
        indexName="document"
    >
        <Configure attributesToSnippet="html" />
        {children}
    </InstantSearch>
)

SearchWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SearchWrapper

import React from 'react'
import PropTypes from 'prop-types'

const Logo = ({ height }) => {
    return <img alt="logo" style={{ height: `${height}px`, width: `auto` }} src="/favicon.png"></img>
}

Logo.defaultProps = {
    height: 25,
    theme: `dark`,
}

Logo.propTypes = {
    height: PropTypes.number,
    theme: PropTypes.string,
}

export default Logo

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from './Header'
import Footer from './Footer'
import { SearchWrapper } from '../search'

import LoadingBar from './LoadingBar'

// Additional styles
import '../../../styles/app.css'
import '../../../styles/prism.css'

class DefaultLayout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoadingShow: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoadingShow: false
            })
        }, 300)
    }

    render() {
        return (
            <>
                <Helmet>
                    <html lang="en" className="fs-base" />
                    <body className={`${this.props.bodyClass} flex flex-column whitney f7 fw4 darkgrey readability`} />
                </Helmet>

                <SearchWrapper>
                    <LoadingBar isShow={this.state.isLoadingShow} />
                    {this.props.header || <Header dividerStyle={this.props.headerDividerStyle} location={this.props.location} />}

                    <main className={this.props.mainClass || `bg-whitegrey-l2 pb5 pb10-ns`}>
                        {this.props.children}
                    </main>

                    <Footer />
                </SearchWrapper>
            </>
        )
    }
}

DefaultLayout.defaultProps = {
    headerDividerStyle: `shadow`,
    bodyClass: `bg-white`,
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    mainClass: PropTypes.string,
    header: PropTypes.element,
    headerDividerStyle: PropTypes.oneOf([`hairline`, `shadow`]),
}

export default DefaultLayout

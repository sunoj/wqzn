import React from 'react'
import { Spirit } from '../../../styles/spirit-styles'
import { Logo } from '../.'

const listItemClass = `mb2 lh-1-65` // TODO: Probably should go to spirit-styles.js

const Footer = () => (
    <footer className="bt b--whitegrey">

        <section className={`${Spirit.page.xl} m1`}>

            <div className="flex justify-between items-center pt4">
                <ul className="flex list pa0 ma0 items-center">
                    <li className={listItemClass}><a href="https://www.wqzn.org/" target="_blank" rel="noopener noreferrer" className="dib pt2 mr6"><Logo /></a></li>
                </ul>

                <ul className="flex list pa0 ma0 items-center">
                    <li className={listItemClass}><a href="https://www.wqzn.org/" target="_blank" rel="noopener noreferrer" className="link pa2 midgrey hover-blue dib mr0">维权指南</a></li>
                </ul>
            </div>

        </section>
    </footer>
)

export default Footer

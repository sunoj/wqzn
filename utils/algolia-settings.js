#!/usr/local/bin/node

/**
 * This is a script that configures our indexes
 *
 * Usage:
 *
 * NODE_ENV=production node utils/algolia-settings.js
 */

// Load config
require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`,
})

const algoliasearch = require(`algoliasearch`)
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)

// Any defined settings will override those in the algolia UI
const REQUIRED_SETTINGS = {
    // We chunk our pages into small algolia entries, and mark them as distinct by slug
    // This ensures we get one result per page, whichever is ranked highest
    distinct: true,
    attributeForDistinct: `slug`,
    // This ensures that chunks higher up on a page rank higher
    customRanking: [`desc(customRanking.title)`, `asc(customRanking.position)`],
    // Defines the order algolia ranks various attributes in
    searchableAttributes: [`title`, `headings`, `html`, `url`, `tags.name`],
}

const getIndexByName = name => client.initIndex(name)

const setSettingsForIndex = (name) => {
    const index = getIndexByName(name)

    index
        .setSettings(REQUIRED_SETTINGS)
        .then(() => index.getSettings())
        .then(settings => console.log(name, settings))
}

client
    .listIndexes()
    .then(({ items }) => {
        items.forEach(item => setSettingsForIndex(item.name))
    })

const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const assert = require('assert')
const path = require('path')
const collections = require('metalsmith-collections')
const handlebars = require('handlebars')
const layouts = require('metalsmith-layouts')

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Chainist Blog',
      description: 'An open place to share our thought for what we are about to do next'
    }
  })
  .source(path.join(__dirname, 'src'))
  .destination(path.join(__dirname, 'public'))
  .use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    default: 'article.html',
    pattern: ['*/*/*html', '*,*html', '*html']
  }))
  .build(err => {
    assert.equal(null, err)
    console.log('Blog Built!')
  })

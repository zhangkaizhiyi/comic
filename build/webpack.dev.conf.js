'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
// 爬取信息
const cheerio = require('cheerio')
const express = require('express')
const axios = require('axios')
const app = new express
const apiRouter = express.Router()

// 这个是干嘛的呢
app.use('/api',apiRouter)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      // 去掉回车换行
      function iGetInnerText(testStr) {
        let ret = testStr.replace(/\ +/g, "").replace(/[ ]/g, "").replace(/[\r\n]/g, "")
        return ret
      }
      // 无量推荐
      app.get('/api/recommend', (req, res) => {
        let url = 'https://m.ac.qq.com/Recommend/get/'
        axios.get(url, {
          headers: {
            referer: 'https://m.ac.qq.com/',
            host: 'm.ac.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取详情页
      app.get('/api/detail', (req, res) => {
        let url = `https://m.ac.qq.com/comic/index/id/${req.query.id}`
        axios.get(url).then((response) => {
          const $ = cheerio.load(response.data)
          let comic = {}
          comic.id = req.query.id
          comic.desc = $('.detail-summary').find('p').text()
          comic.cover = $('.head-info').find('img').attr('src')
          // 5个信息
          comic.update = $('.comicList-info-update').text()
          comic.name = $('.head-info-title').find('h1').text()
          comic.grade = $('.head-info-grade').text()
          comic.tags = []
          $('.head-info-tags').find('span').each(function (item) {
            let pic = $(this)
            comic.tags.push(pic.text())
          })
          comic.author = iGetInnerText($('.head-info-author').text())
          comic.hot = $('.info-number').text()
          res.json(comic)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取搜索热门词条
      app.get('/api/searchHot', (req, res) => {
        let url = 'https://m.ac.qq.com/search/index'
        axios.get(url).then((response) => {
          const $ = cheerio.load(response.data)
          let list = []
          $('.search-hot-list li').each(function(item) {
            let pic = $(this)
            let comic = {}
            comic.id = pic.find('a').attr('href').substr(pic.find('a').attr('href').lastIndexOf('/')+1)
            comic.name = iGetInnerText(pic.text())
            list.push(comic)
          })
          res.json(list)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取评论
      app.get('/api/comment', (req, res) => {
        let url = `https://m.ac.qq.com/comment/getCommentList/id/${req.query.id}`
        axios.get(url, {
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 搜索
      app.get('/api/search', (req, res) => {
        let url = 'https://m.ac.qq.com/search/smart'
        axios.get(url, {
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取首页信息
      app.get('/api/index', (req, res) => {
        let url = 'https://m.ac.qq.com'
        axios.get(url).then((response) => {
          const $ = cheerio.load(response.data)
          let index = {}
          // 轮播图
          index.slider = []
          $('.banner-list li').each(function(item) {
            let pic = $(this)
            let obj = {}
            obj.href = pic.find('a').attr('href')
            obj.src = pic.find('img').attr('src')
            index.slider.push(obj)
          })
          // 每日一推
          index.recommend = {}
          let recommend = $('.light-comic-recommend')
          index.recommend.id = recommend.attr('data-id')
          index.recommend.cover = recommend.find('img').attr('src')
          index.recommend.name = recommend.find('.text').text()
          index.recommend.author = recommend.find('.artist').text()
          // 今日更新
          index.update = []
          let update = $('.update-today .comic-item')
          update.each(function (item) {
            let pic = $(this)
            let comic = {}
            comic.id = pic.find('a').attr('data-id')
            comic.cover = pic.find('img').attr('src')
            comic.name = pic.find('.comic-title').text()
            comic.author = pic.find('.comic-artist').text()
            comic.update = pic.find('.comic-latest').text()
            comic.grade = pic.find('rank-score').text()
            index.update.push(comic)
          })
          // 经典
          index.classic = []
          let classic = $('.japan-comic .comic-item')
          classic.each(function (item) {
            let pic = $(this)
            let comic = {}
            comic.id = pic.find('a').attr('data-id')
            comic.cover = pic.find('img').attr('src')
            comic.name = pic.find('.comic-title').text()
            comic.tags = pic.find('.comic-tag').text().split(' ')
            index.classic.push(comic)
          })
          // 新作上线
          index.new = []
          let newcomic = $('.new-comic .comic-item')
          newcomic.each(function (item) {
            let pic = $(this)
            let comic = {}
            comic.id = pic.find('a').attr('data-id')
            comic.cover = pic.find('img').attr('src')
            comic.name = pic.find('.comic-title').text()
            comic.tags = pic.find('.comic-tag').text().split(' ')
            index.new.push(comic)
          })
          res.json(index)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取分类信息
      app.get('/api/classify', (req, res) => {
        let url = 'https://m.ac.qq.com/category/index'
        axios.get(url).then((response) => {
          const $ = cheerio.load(response.data)
          let list = []
          $('.category-normal-ul li').each(function(item) {
            let pic = $(this)
            let obj = {}
            obj.href = pic.find('a').attr('href')
            obj.name = pic.find('.item-name').text()
            obj.src = pic.find('img').attr('src')
            list.push(obj)
          })
          res.json(list)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取排行榜信息
      app.get('/api/rank', (req, res) => {
        let url = 'https://m.ac.qq.com/rank/index'
        axios.get(url, {
          data:req.data,
          headers:{
            host: 'm.ac.qq.com',
            referer:'https://m.ac.qq.com/rank/index?type=pgv'
          },
          params:req.query
        }).then((response) => {
          const $ = cheerio.load(response.data)
          let obj = {}
          obj.top = []
          obj.li = []
          $('.top3-box-item').each(function (item) {
            let pic = $(this)
            let item1 = {}
            // 拿到id值
            item1.id = pic.find('a').attr('href').substring(pic.find('a').attr('href').lastIndexOf('/')+1)
            pic.find('a').replaceWith(`<div class="a">${pic.find('a').html()}</div>`)
            item1.html = pic.html()
            item1.title = pic.find('.comic-title').text()
            item1.cover = pic.find('img').attr('src')
            obj.top.push(item1)
          })
          $('.comic-item').each(function (item) {
            let pic = $(this)
            let item1 = {}
            // 拿到id值
            item1.id = pic.find('a').attr('href').substring(pic.find('a').attr('href').lastIndexOf('/')+1)
            pic.find('a').replaceWith(`<div class="a">${pic.find('a').html()}</div>`)
            item1.html = pic.html()
            item1.title = pic.find('.comic-title').text()
            item1.cover = pic.find('img').attr('src')
            item1.desc = pic.find('.comic-desc').text()
            item1.update = pic.find('.comic-update').text()
            obj.li.push(item1)
          })
          res.json(obj)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取月票
      app.get('/api/ticket', (req, res) => {
        let url = 'https://m.ac.qq.com/comic/getMonthTicketInfo'
        axios.get(url, {
          headers: {
            referer: 'https://m.ac.qq.com/',
            host: 'm.ac.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 推荐列表
      app.get('/api/others', (req, res) => {
        let url = 'https://m.ac.qq.com/Recommend/get/'
        axios.get(url, {
          headers: {
            referer: 'https://m.ac.qq.com/',
            host: 'm.ac.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
      // 获取更新列表
      app.get('/api/time', (req, res) => {
        let url = 'https://m.ac.qq.com/comic/schedule'
        axios.get(url, {
          data:req.data,
          headers:{
            host: 'm.ac.qq.com',
            referer:'https://m.ac.qq.com/rank/index?type=pgv'
          },
          params:req.query
        }).then((response) => {
          const $ = cheerio.load(response.data)
          let list = []
          $('.comic-item').each(function (item) {
            let pic = $(this)
            let item1 = {}
            item1.id = pic.find('a').attr('href').substring(pic.find('a').attr('href').lastIndexOf('/')+1)
            item1.name = pic.find('.comic-title').text()
            item1.cover = pic.find('.cover-image').attr('src')
            item1.update = pic.find('.comic-update').text()
            item1.desc = pic.find('.comic-desc').text()
            list.push(item1)
          })
          res.json(list)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

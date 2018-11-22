const cheerio = require('cheerio')

const $ = cheerio.load(`<!--headTrap<body></body><head></head><html></html>-->

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- fragBegin: withOutDynamicConfig -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<!-- fragBegin: withOutViewPort -->
<meta charset="UTF-8" />

<!-- 百度站长工具校验代码 -->
<meta name="baidu-site-verification" content="iCOfamZT3B" />

<!-- 关闭iOS电话号码识别、配置状态栏效果 -->
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="white" />

<!-- iOS主屏&书签图标 -->
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="//gtimg.ac.qq.com/h5/public/images/touch-icon-iphone-114.png?v=35ef6fea80e50951" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="//gtimg.ac.qq.com/h5/public/images/touch-icon-iphone-114.png?v=35ef6fea80e50951" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="//gtimg.ac.qq.com/h5/public/images/touch-icon-ipad-144.png?v=784fdda39985ba20" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="//gtimg.ac.qq.com/h5/public/images/touch-icon-ipad-144.png?v=784fdda39985ba20" />
<link rel="shortcut icon" href="//gtimg.ac.qq.com/h5/public/images/touch-icon-iphone-114.png?v=35ef6fea80e50951">
<link rel="shortcut icon" sizes="196x196" href="//gtimg.ac.qq.com/h5/public/images/touch-icon-iphone-196.png?v=271259d431f48a94">

<!-- QQ浏览器锁定竖屏、全屏、应用模式 -->
<!--<meta name="x5-orientation" content="portrait"/>-->
<!--<meta name="x5-fullscreen" content="true"/>-->
<meta name="x5-pagetype" content="webapp" />

<!-- UC浏览器锁定竖屏、全屏、应用模式 -->
<!--<meta name="screen-orientation" content="portrait"/>-->
<!--<meta name="full-screen" content="yes"/>-->
<!--<meta name="browsermode" content="application"/>-->

<!-- 分享信息 -->
<meta itemprop="image" content="https://gtimg.ac.qq.com/h5/public/images/share-icon.png?v=7ee367fb9d2965dc" />
<meta itemprop="name" content="腾讯动漫" />
<meta name="description" itemprop="description" content="中国最大最权威的正版动漫网站，连载众多原创国漫，原创动画，正版日漫等海内外最热正版动漫内容" /> 
<!--运营商限制-->
<meta http-equiv="Content-Security-Policy"
      content="default-src *.qq.com *.gtimg.com *.gtimg.cn *.qpic.cn *.qlogo.cn *.idqqimg.com 'self' data: callclient: txcomic: txcomicin: txcomicout: mtt: jsbridge: TcsJSBridge: 'unsafe-inline' 'unsafe-eval' https:; img-src *.qq.com *.gtimg.com *.gtimg.cn *.qpic.cn *.qlogo.cn *.idqqimg.com 'self' data: callclient: txcomic: txcomicin: txcomicout: mtt: jsbridge: TcsJSBridge: 'unsafe-inline' 'unsafe-eval' https:; media-src http: https:"/>


<meta name="page-name" content="search" />

<!-- 通用样式与脚本 -->
<link rel="stylesheet" href="//gtimg.ac.qq.com/h5/public/css/core.css?v=45bc5a92dfcb8d00" />
<!--<script src="//gtimg.ac.qq.com/h5/public/js/core.js?v=2b7eaa991dd546f8"></script>-->
<script>
  window.COOPERATION_CLIENT = '';
  window.CLIENT_URL_ANDROID = '';
  window.CLIENT_URL_IOS = '';

  window.pageAction = window.pageAction || {};
window.presetPageAction = window.presetPageAction || {};
;
  /**
 * Created by krimeshu on 2016/6/6.
 */

(function () {
    function Blocker(opts) {
        opts = opts || {};
        var timeKey = opts.timeKey || 'default';

        this.KEY = 'H5_BLOCKER-' + timeKey;
        this.EXPIRE_DAYS = 2;
        // this.BLOCK_TIME = ['00:00', '23:59'];
    }

    Blocker.prototype = {
        check: function () {
            var isCooperation = COOPERATION_CLIENT ? true : false,
                isPad = this.isPad(),
                hasBlocked = this.getCookie(this.KEY),
                // now = new Date(),
                // today = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                // blockTimeStart = new Date(today + ' ' + this.BLOCK_TIME[0]),
                // blockTimeEnd = new Date(today + ' ' + this.BLOCK_TIME[1]),
                // isBlockTime = now >= blockTimeStart && now < blockTimeEnd;
                isBlockTime = true;
            return (!isCooperation && !isPad && !hasBlocked && isBlockTime);
        },
        checkAndGo: function () {
            if (this.check()) {
                this.rememberBlocked();
                this.goBlockPage();
            }
        },
        checkAndDialog: function () {
            if (this.check()) {
                this.rememberBlocked();
                this.showBlockDialog();
            }
        },
        rememberBlocked: function () {
            var expire = this.EXPIRE_DAYS * 24 * 60;
            this.setCookie(this.KEY, new Date().getTime(), expire, '.m.ac.qq.com', '/');
        },
        goBlockPage: function () {
            var channelIDs = { 'index': 1 },
                channelID = channelIDs['search'];
            window.location.href = '/block.html?retUrl=' + encodeURIComponent(window.location.href) +
                (channelID ? '&channelID=' + channelID : '');
        },
        showBlockDialog: function () {
            var self = this,
                dialog = window.blockDialog;
            if (dialog) {
                dialog.open();
            } else {
                window.setTimeout(function () {
                    self.showBlockDialog();
                }, 50);
            }
        },
        getCookie: function (key) {
            var allcookies = document.cookie;
            var cookiesReg = new RegExp('(^|;)\\\\s*' + key + '\\\\s*(=\\\\s*([^;$]*?))?(;|$)');
            var groups = cookiesReg.exec(allcookies);
            return decodeURIComponent(groups ? (groups[3] || '') : '');
        },
        setCookie: function (key, value, expires, domain, path) {
            var values = [key + '=' + encodeURIComponent(value)];
            if (expires) {
                if (typeof expires === 'number') {
                    var expiresTime = new Date();
                    expiresTime.setMinutes(expiresTime.getMinutes() + expires);
                    values.push('expires=' + expiresTime.toGMTString());
                } else {
                    values.push('expires=' + expires);
                }
            }
            values.push('domain=' + (domain || '.ac.qq.com'));
            values.push('path=' + (path || '/'));
            document.cookie = values.join(';');
        },
        isPad: function () {
            var ua = window.navigator.userAgent;
            return /(^| |\\()iPad(;| |\\/|$)/.test(ua);
        }
    };

    window.Blocker = Blocker;
})();;
</script>
<!-- fragEnd: withOutDynamicConfig -->
<script>
  window.COOPERATION_CLIENT = '';
</script>






  <script>
    window.CLIENT_URL_ANDROID = 'http://m.ac.qq.com/apkSet/qqcomic_android_dm5004.apk';
    window.CLIENT_URL_IOS = 'https://itunes.apple.com/app/apple-store/id569387346?pt=604140&ct=h5zhuzhan1&mt=8';

    (function autoBlock() {
      // 拦截类型：页面、忽略、对话框（默认）
      var specBlockType = {
        'index': 'ignore',
        'chapter': 'ignore',
        'comic_info': 'ignore'
      };
      // 根据页面名称确定拦截类型，并做处理
      var blockType = specBlockType['search'];
      // 微博里不适合跳转拦截页，强制改为弹窗
      if (/(^| )(Weibo)( |\\/|$|\\()/i.test(navigator.userAgent)) {
        blockType = null;
      }
      switch (blockType) {
        case 'page':
          new Blocker().checkAndGo();
          break;
        case 'ignore':
          break;
        default:
          new Blocker().checkAndDialog();
          break;
      }
    })();
  </script>
  <!-- fragEnd: withOutViewPort -->
    
<!--普通情况引用正常的title-->
<title>搜索 - 腾讯动漫</title>

    <link rel="stylesheet" href="//gtimg.ac.qq.com/h5/search/css/index.css?v=be006d9cdffb158f"/>
    </head>
<body>
<!--搜索顶栏-->
<section class="search-top-bar">
    <form class="search-form" action="/search/result">
        <a class="search-top-btn back">[返回]</a>
        <!--搜索栏文本-->
        <div class="search-txt">
            <!--搜索栏文本 - 文本提示框-->
            <div class="search-hint-box">
                <div class="search-hint-pad focus-ani"></div>
                <i class="search-hint-icon">[搜]</i>
                <span class="search-hint-txt">漫画名|作者</span>

                <div class="search-hint-pad"></div>
            </div>
            <!--搜索栏文本 - 文本输入框-->
            <div class="search-text-box">
                <div class="txt-input-pad"></div>
                <input class="txt-input" type="search" autocapitalize="off" autocorrect="off" name="word"/>
                <a class="txt-input-clear">[X]</a>
            </div>
        </div>
        <input class="search-top-btn search" type="submit" value="搜索"/>
    </form>
</section>
<!-- 搜索智能提示 -->
<section class="search-smart-hint">
    <ul class="hint-list">
        <!--<li class="item">-->
        <!--<a class="link">中国惊奇先生</a>-->
        <!--</li>-->
        <!--<li class="item">-->
        <!--<a class="link">舌尖上的中国</a>-->
        <!--</li>-->
    </ul>
</section>
<!--搜索热词-->
<section class="search-hot">
    <div class="search-hot-npc">
        <i class="npc-avatar">[NPC头像]</i>
        <span class="npc-dialog">[大家都在搜]</span>
    </div>
    <ul class="search-hot-list">
                <li class="item">
            <a class="link" href="/comic/index/id/631488">
                败者为寇            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/632722">
                夺天阙            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/551556">
                绝命异人            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/634716">
                匪徒子            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/634829">
                在爱情杀死我之前            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/552724">
                猫妖的诱惑            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/552624">
                代嫁丞相            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/633649">
                致2008            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/636836">
                重启东西不东西            </a>
        </li>
                <li class="item">
            <a class="link" href="/comic/index/id/635879">
                远看春意盎然            </a>
        </li>
            </ul>
</section>

<script src="//gtimg.ac.qq.com/h5/public/js/core.js?v=2b7eaa991dd546f8"></script>
<script>

    window.COOPERATION_DOMAIN = ek.url.getDomain().toLowerCase();

    window.HOT_TAG_ROOT = 'h5_v3.';
    // 部分需要单独统计按键点击的渠道
    if (COOPERATION_CLIENT === 'qqbrowser_hd') {
        window.HOT_TAG_ROOT = 'h5_v3_qqbrowser_hd.';
    }

    ek.share.setShare({
        link: ek.url.appendQueryString(window.location.href, {'shared': 1}),
        img_url: $('meta[itemprop="image"]').attr('content'),
        title: $('meta[itemprop="name"]').attr('content'),
        desc: $('meta[itemprop="description"]').attr('content'),
        callback: function (res) {
            console.log('分享结果：', res);
        }
    });

    ek.ping.init({
        androidAppUrl: CLIENT_URL_ANDROID || 'http://mobile.ac.qq.com/apkSet/qqcomic_android_dm2309.apk',
        iOSAppUrl: CLIENT_URL_IOS || 'https://itunes.apple.com/us/app/teng-xun-wei-man/id569387346?ls=1&mt=8',
        virtualUrl: function () {
            var pathName = ek.url.getPathName();
            var pathArgs = pathName.split('/');
            if (/^\\/Chapter\\/index/i.test(pathName)) {
                // 浏览页特殊处理
                pathArgs[1] = 'Comic';
                pathArgs[2] = 'view';
            } else if (/^\\/Bookshelf\\/index/i.test(pathName)) {
                // 书架特殊处理
                var type = ek.url.getQueryString('type') || 'fav';  // 只做统计，不输出、不执行
                pathArgs[1] += '_' + type;
            } else if (!pathArgs[1] && !pathArgs[2]) {
                // 首页补全处理
                pathArgs = '/Index/index'.split('/');
            } else if (!pathArgs[2]) {
                // 其它补全处理
                pathArgs.push('index');
            }
            // 掌火特殊处理
            var isCfApp = /CfApp( |\\/|$)/i.test(window.navigator.userAgent);
            var client = isCfApp ? 'cfApp' : ek.clientType;
            pathArgs.splice(3, 0, 'client');
            //存在外部合作的时候，优先使用外部合作字段 COOPERATION_CLIENT
            pathArgs.splice(4, 0, COOPERATION_CLIENT || client);
            return pathArgs.join('/');
        },
        virtualDomain: 'm.ac.qq.com',
        downAppTag: function () {
            // 根据页面名称生成下载的按键统计标记
            var pageName = $('meta[name="page-name"]').attr('content');
            return ['h5_v3_app_down', pageName, ek.clientType, ek.os].join('.');
        },
        // 初始化完毕后上报页面访问URL
        reportVisit: true
    });

    // 尝试提交合作渠道访问记录
    window.tryReportCooperationVisit = function () {
        if (COOPERATION_CLIENT && COOPERATION_DOMAIN !== 'm.ac.qq.com') {
            //在渠道内打开并且使用渠道域名的时候，才做双重统计
            ek.ping.reportVisit(ek.ping.getVirtualUrl(), COOPERATION_DOMAIN);
        }
    };
    tryReportCooperationVisit();
</script>
<!--强制刷新-->
<script>
    var pg_SearchIndex = new BIU.Page({
        name: 'Page_SearchIndex'
    });
</script>
<script src="//gtimg.ac.qq.com/h5/search/js/index.js?v=3f33e7a183c27dd2"></script>
</body>
</html>

<!--tailTrap<body></body><head></head><html></html>-->
`)
console.log($('.search-hot-list li').each((item) => {
  console.log(item)
}))

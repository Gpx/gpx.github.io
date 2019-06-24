(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{164:function(e,t,a){"use strict";a.r(t);a(173);var n=a(0),r=a.n(n),o=a(166),l=a(175),i=(a(163),a(171)),c=a(170),m=a(167),u=Object(o.a)(m.a).withConfig({displayName:"post-header__Title",componentId:"sc-1okepgc-0"})(["display:block;font-weight:500;font-size:1.5rem;text-align:center;padding:0.5em 0;color:#fff;text-shadow:1px 0 1px #0004;text-decoration:none;width:100%;background:#3a6;"]),d=function(){return r.a.createElement(m.b,{query:"3892401927",render:function(e){return r.a.createElement(u,{to:"/"},e.site.siteMetadata.title)},data:c})};a.d(t,"query",function(){return f});var s=o.a.span.withConfig({displayName:"blog-post__Meta",componentId:"sc-7gkdnd-0"})(["display:block;font-size:0.45em;font-weight:400;color:#666;margin-top:0.5em;"]),p=o.a.footer.withConfig({displayName:"blog-post__Footer",componentId:"sc-7gkdnd-1"})(["font-size:0.85rem;text-align:center;margin-bottom:3rem;padding:0.5em 0;background:#e8eaf6;a{text-decoration:underline;}"]),f=(t.default=function(e){var t=e.data,a=t.markdownRemark;return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.Helmet,null,r.a.createElement("title",null,a.frontmatter.title),r.a.createElement("meta",{property:"og:title",content:a.frontmatter.title}),r.a.createElement("meta",{property:"og:type",content:"article"}),r.a.createElement("meta",{property:"og:url",content:""+t.site.siteMetadata.siteUrl+a.fields.slug}),a.frontmatter.cover?r.a.createElement("meta",{property:"og:image",content:""+t.site.siteMetadata.siteUrl+a.frontmatter.cover.file.publicURL}):null),r.a.createElement(d,null),r.a.createElement(i.a,null,r.a.createElement("article",{lang:"en"},r.a.createElement("h1",null,r.a.createElement("span",{dangerouslySetInnerHTML:{__html:a.frontmatter.title}}),r.a.createElement(s,null,a.frontmatter.date," · ",a.timeToRead," min read")),a.frontmatter.cover?r.a.createElement("figure",null,r.a.createElement("img",{src:a.frontmatter.cover.file.publicURL,alt:a.frontmatter.cover.alt}),r.a.createElement("figcaption",null,r.a.createElement("a",{href:a.frontmatter.cover.link,target:"_blank",rel:"noopener noreferrer"},"Photo by ",a.frontmatter.cover.author))):null,r.a.createElement("div",{dangerouslySetInnerHTML:{__html:a.html}})),r.a.createElement(p,null,"Would you like to have a civil discussion about this post? Hit me up on"," ",r.a.createElement("a",{href:"https://twitter.com/Gpx",target:"_blank",rel:"noopener noreferrer"},"twitter"),".")))},"1602923654")},167:function(e,t,a){"use strict";a.d(t,"b",function(){return d});var n=a(0),r=a.n(n),o=a(6),l=a.n(o),i=a(40),c=a.n(i);a.d(t,"a",function(){return c.a});a(168);var m=r.a.createContext({});function u(e){var t=e.staticQueryData,a=e.data,n=e.query,o=e.render,l=a?a.data:t[n]&&t[n].data;return r.a.createElement(r.a.Fragment,null,l&&o(l),!l&&r.a.createElement("div",null,"Loading (StaticQuery)"))}var d=function(e){var t=e.data,a=e.query,n=e.render,o=e.children;return r.a.createElement(m.Consumer,null,function(e){return r.a.createElement(u,{data:t,query:a,render:n||o,staticQueryData:e})})};d.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func}},168:function(e,t,a){var n;e.exports=(n=a(169))&&n.default||n},169:function(e,t,a){"use strict";a.r(t);a(41);var n=a(0),r=a.n(n),o=a(6),l=a.n(o),i=a(66),c=function(e){var t=e.location,a=e.pageResources;return a?r.a.createElement(i.a,Object.assign({location:t,pageResources:a},a.json)):null};c.propTypes={location:l.a.shape({pathname:l.a.string.isRequired}).isRequired},t.default=c},170:function(e){e.exports={data:{site:{siteMetadata:{title:"Giorgio Polvara's Blog"}}}}},171:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(166),l=a(167),i=o.a.div.withConfig({displayName:"footer__Container",componentId:"sc-1abtvul-0"})(["margin-top:4em;padding:3em 0.5em;text-align:right;background:#3a6;color:#fff;text-shadow:1px 0 1px #0004;"]),c=o.a.div.withConfig({displayName:"footer__Content",componentId:"sc-1abtvul-1"})(["max-width:calc(65 * 9px);margin:auto;> *{margin:0.7em;}> *:first-child{margin-left:0;}> *:last-child{margin-right:0;}"]),m=o.a.div.withConfig({displayName:"footer__Copy",componentId:"sc-1abtvul-2"})(["max-width:calc(65 * 9px);margin:auto;font-size:0.85em;margin-top:1em;"]),u=function(){return r.a.createElement(i,null,r.a.createElement(c,null,r.a.createElement(l.a,{to:"/"},"Home"),"·",r.a.createElement("a",{href:"/rss.xml"},"RSS"),"·",r.a.createElement("a",{href:"https://twitter.com/Gpx",target:"_blank",rel:"noopener noreferrer"},"Twitter"),"·",r.a.createElement("a",{href:"https://github.com/Gpx",target:"_blank",rel:"noopener noreferrer"},"GitHub")),r.a.createElement(m,null,"© 2014–",(new Date).getFullYear()," Giorgio Polvara"))},d=o.a.div.withConfig({displayName:"layout__Container",componentId:"sc-4dh0yk-0"})(["padding:0 0.5em;max-width:calc(65 * 9px);margin:auto;"]);t.a=function(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,null,t),r.a.createElement(u,null))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-6871fd37054f19b43e87.js.map
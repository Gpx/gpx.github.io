(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{166:function(e,l,t){"use strict";t.r(l);var c=t(0),a=t.n(c),n=t(168),r=t(167),i=t(172),o=t(191),m=t(192),d=t.n(m),s=Object(r.a)(function(e){var l=e.className,t=e.children;return a.a.createElement(n.b,{query:"2551066398",render:function(e){var c=e.desktop.childImageSharp.fluid;return a.a.createElement(d.a,{Tag:"header",className:l,fluid:c,background:"#6eb632"},t)},data:o})}).withConfig({displayName:"header__Header",componentId:"w0084c-0"})(["height:90vh;width:100vw;background-size:cover;background-align:center center;display:flex;justify-content:center;align-items:center;margin-bottom:2.5em;@media (max-width:768px){height:auto;}"]),p=r.a.div.withConfig({displayName:"header__Border",componentId:"w0084c-1"})(["flex-direction:column;position:relative;border:10px solid #fff;height:90%;width:90%;display:flex;align-items:stretch;justify-content:flex-end;padding:3% 5%;@media (max-width:768px){border:none;padding-top:4em;}@media (max-width:576px){padding-top:1em;}"]),h=r.a.span.withConfig({displayName:"header__Text",componentId:"w0084c-2"})(['color:#fff;font-size:20vmin;font-weight:700;line-height:1;text-shadow:1px 0 2px #0005;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";text-transform:uppercase;text-align:right;letter-spacing:0.05em;@media (max-width:768px){font-size:10vw;}@media (max-width:576px){font-size:11vw;}']),u=r.a.div.withConfig({displayName:"header__TextLine",componentId:"w0084c-3"})(["display:flex;"]),f=r.a.div.withConfig({displayName:"header__Line",componentId:"w0084c-4"})(["background-image:linear-gradient( 180deg,transparent calc(50%),white calc(50%),white calc(50% + 10px),transparent calc(50% + 10px) );flex:1;margin-right:2%;"]),g=r.a.div.withConfig({displayName:"header__Menu",componentId:"w0084c-5"})(["display:flex;align-items:baseline;position:absolute;left:5%;top:6%;"]),v=Object(r.a)(n.a).withConfig({displayName:"header__MenuItem",componentId:"w0084c-6"})(['color:#fff;writing-mode:vertical-lr;text-transform:uppercase;letter-spacing:0.1em;font-size:1.2em;border-left:10px solid #fff;margin-right:1em;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";text-shadow:1px 0 2px #0005;@media (max-width:768px){writing-mode:horizontal-tb;border-left:none;border-bottom:5px solid #fff;}@media (max-width:576px){display:none;}']),b=function(){return a.a.createElement(s,null,a.a.createElement(p,null,a.a.createElement(g,null,a.a.createElement(v,{to:"/"},"Home"),a.a.createElement(v,{as:"a",href:"https://twitter.com/gpx",target:"_blank",rel:"noopener noreferrer"},"Twitter"),a.a.createElement(v,{as:"a",href:"https://github.com/gpx/",target:"_blank",rel:"noopener noreferrer"},"Github"),a.a.createElement(v,{to:"/rss.xml"},"RSS")),a.a.createElement(u,null,a.a.createElement(f,null),a.a.createElement(h,null,"Giorgio")),a.a.createElement(u,null,a.a.createElement(f,null),a.a.createElement(h,null,"Polvara"))))};t.d(l,"query",function(){return y});var w=r.a.div.withConfig({displayName:"pages__Post",componentId:"ifild7-0"})(["margin-bottom:2.5rem;"]),x=r.a.div.withConfig({displayName:"pages__Title",componentId:"ifild7-1"})(["font-size:1.2em;font-weight:600;"]),y=(l.default=function(e){var l=e.data;return a.a.createElement(a.a.Fragment,null,a.a.createElement(b,null),a.a.createElement(i.a,null,l.allMarkdownRemark.edges.map(function(e){var l=e.node;return a.a.createElement(n.a,{key:l.id,to:l.fields.slug,style:{color:"inherit"}},a.a.createElement(w,null,a.a.createElement(x,{dangerouslySetInnerHTML:{__html:l.frontmatter.title}}),l.frontmatter.date," · ",l.timeToRead," min read"))})))},"2958056261")},168:function(e,l,t){"use strict";t.d(l,"b",function(){return s});var c=t(0),a=t.n(c),n=t(6),r=t.n(n),i=t(40),o=t.n(i);t.d(l,"a",function(){return o.a});t(169);var m=a.a.createContext({});function d(e){var l=e.staticQueryData,t=e.data,c=e.query,n=e.render,r=t?t.data:l[c]&&l[c].data;return a.a.createElement(a.a.Fragment,null,r&&n(r),!r&&a.a.createElement("div",null,"Loading (StaticQuery)"))}var s=function(e){var l=e.data,t=e.query,c=e.render,n=e.children;return a.a.createElement(m.Consumer,null,function(e){return a.a.createElement(d,{data:l,query:t,render:c||n,staticQueryData:e})})};s.propTypes={data:r.a.object,query:r.a.string.isRequired,render:r.a.func,children:r.a.func}},169:function(e,l,t){var c;e.exports=(c=t(171))&&c.default||c},171:function(e,l,t){"use strict";t.r(l);t(41);var c=t(0),a=t.n(c),n=t(6),r=t.n(n),i=t(66),o=function(e){var l=e.location,t=e.pageResources;return t?a.a.createElement(i.a,Object.assign({location:l,pageResources:t},t.json)):null};o.propTypes={location:r.a.shape({pathname:r.a.string.isRequired}).isRequired},l.default=o},172:function(e,l,t){"use strict";var c=t(0),a=t.n(c),n=t(167),r=t(168),i=n.a.div.withConfig({displayName:"newsletter-form__Card",componentId:"a2ms4a-0"})(["display:block;max-width:500px;margin:auto;margin-top:3em;box-shadow:2px 2px 3px 2px #0003;padding:2em 2.5em;text-align:center;transition:transform 0.2s;border-radius:6px;"]),o=n.a.input.attrs({type:"submit",value:"Subscribe"}).withConfig({displayName:"newsletter-form__Button",componentId:"a2ms4a-1"})(["color:red;"]),m=n.a.form.withConfig({displayName:"newsletter-form__Form",componentId:"a2ms4a-2"})([""]),d=n.a.h1.withConfig({displayName:"newsletter-form__Title",componentId:"a2ms4a-3"})(["margin:0;font-size:1.6em;font-weight:500;line-height:1;"]),s=n.a.div.withConfig({displayName:"newsletter-form__Sub",componentId:"a2ms4a-4"})([""]),p=n.a.div.withConfig({displayName:"newsletter-form__InputGroup",componentId:"a2ms4a-5"})(['display:flex;flex-direction:column;margin-top:2em;label{text-align:left;margin-bottom:0.3em;}[type="email"]{font-size:1.3em;border:1px solid #333;padding:0.3em 0.6em;border-radius:6px;margin-bottom:0.5em;}[type="submit"]{background:#3a6;border:none;font-size:1.3em;padding:0.6em;color:#fff;text-shadow:1px 0 1px #0004;border-radius:6px;cursor:pointer;}']),h=function(){return a.a.createElement(i,null,a.a.createElement(d,null,"Subscribe to my newsletter"),a.a.createElement(s,null,"No spam. Unsubscribe when you want."),a.a.createElement(m,{action:"https://buttondown.email/api/emails/embed-subscribe/gpx",method:"post",target:"popupwindow",onsubmit:"window.open('https://buttondown.email/gpx', 'popupwindow')"},a.a.createElement(p,null,a.a.createElement("label",{for:"bd-email"},"Email"),a.a.createElement("input",{type:"email",name:"email",id:"bd-email",placeholder:"Your email",required:!0}),a.a.createElement(o,null)),a.a.createElement("input",{type:"hidden",value:"1",name:"embed"})))},u=n.a.div.withConfig({displayName:"footer__Container",componentId:"sc-1abtvul-0"})(["margin-top:4em;padding:3em 0.5em;text-align:right;background:#3a6;color:#fff;text-shadow:1px 0 1px #0004;"]),f=n.a.div.withConfig({displayName:"footer__Content",componentId:"sc-1abtvul-1"})(["max-width:calc(65 * 9px);margin:auto;> *{margin:0.7em;}> *:first-child{margin-left:0;}> *:last-child{margin-right:0;}"]),g=n.a.div.withConfig({displayName:"footer__Copy",componentId:"sc-1abtvul-2"})(["max-width:calc(65 * 9px);margin:auto;font-size:0.85em;margin-top:1em;"]),v=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(h,null),a.a.createElement(u,null,a.a.createElement(f,null,a.a.createElement(r.a,{to:"/"},"Home"),"·",a.a.createElement("a",{href:"/rss.xml"},"RSS"),"·",a.a.createElement("a",{href:"https://twitter.com/Gpx",target:"_blank",rel:"noopener noreferrer"},"Twitter"),"·",a.a.createElement("a",{href:"https://github.com/Gpx",target:"_blank",rel:"noopener noreferrer"},"GitHub")),a.a.createElement(g,null,"© 2014–",(new Date).getFullYear()," Giorgio Polvara")))},b=n.a.div.withConfig({displayName:"layout__Container",componentId:"sc-4dh0yk-0"})(["padding:0 0.5em;max-width:calc(65 * 9px);margin:auto;"]);l.a=function(e){var l=e.children;return a.a.createElement(a.a.Fragment,null,a.a.createElement(b,null,l),a.a.createElement(v,null))}},191:function(e){e.exports={data:{desktop:{childImageSharp:{fluid:{tracedSVG:"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='400'%20height='267'%3e%3cpath%20d='M0%2016l1%2016v-1c0-2%201-2%205%200%204%201%205%206%202%208-1%201-3%201-7-1l-1%205v6l3-1c5-2%207%200%207%205%200%204-5%2010-9%2010l-1%205c0%205%200%205%203%206h4c-1-1%202-5%204-5%204%201%205%203%203%208-2%202-2%206-2%2010%200%207-1%207-4%2010l-6%202H0v39l4-2c5-2%2010%202%2010%2010%200%201-3%204-5%204-4%200-5%200-7-2l-2-2v3c0%202%200%203%202%203s6%204%206%206-3%205-4%206c-4%200-4%200-4%2031%200%2030%201%2030%203%2028v-2c-3-3-2-6%203-9%206-5%2010-4%2012%202%203%2010-7%2019-16%2015-2-1-2%200-2%2010%200%206%200%2010%201%209l2-2%201-1%202-1c3%200%204%204%202%208-1%203-4%203-7-1-1-1-1%200-1%205s0%207%202%207l1%202c0%202%203%202%2018%202h18v-9c2-1%206%200%206%203l1-2%202-3v-2l1-3%201%201c-1%202%200%202%201%202l2-1c1-1%201-1%201%201%200%201%200%202%202%201l1%201%201%204c1%202%201%202-2%205l-2%202h11l11-1h1a1249%201249%200%200%200%20127%201h7l-3-4-1-5c0-2-1-1-4%201-6%205-15%203-17-2-5-15%201-23%2018-24%204%200%205-1%206-2%200-2%200-2%201-1l-1%204c-1%203%200%2010%202%2011%202%200%203-2%203-5%200-2%200-2%201%200l2%204%201%202c5%200%208%2011%205%2017l-2%204h6c4%200%206%200%207-2%204-6%2013-6%2018%200%203%202%2013%203%2015%201%202-3%208-3%208%200l15%201h15l1-3c0-4%202-3%203%200%200%203%200%203%208%203h8l1-4c0-4%201-5%203-5%203%200%207%203%207%206v3h29c29%200%2029%200%2030-2%202-2%202-2%203-1%201%202%202-3%202-20l-1-12c0%205-1%206-4%203-2-1-2-1-1-2v-10l1-2%201-5v-4l-5%202c-5%202-8%200-7-3l-1-3-1-2c1-1%200-2-2-3s-3-1-3-5-1-4%2010-7c9-2%2011%202%2012%2020l1-50-1-61c0%202-4%204-7%204l-2%201%201%201c3%200%208%206%207%209v4c0%203-5%207-7%207s-3%201-3%204c-4%2018-26%2017-26-1-1-7%205-12%2016-12l4-1c0-1-1-2-3-2-6%200-16-3-17-6-2-7-3-17-2-20%201-2%200-3-3%200-5%203-10%202-15-3s-5-5-4-10l2-7v-2c-1%200-3%202-3%204-2%207-9%2011-17%2010-3-1-4-3-1-3l5-5%201-1%201-1c0-2-2-4-4-3l-2-3c-1-2-1-2%202-5l4-2c2%200%201-2-1-2-4%200-11-4-13-6-2-5-1-7%202-10l3-4c0-2%205-4%208-4%209%202%2015%2016%2010%2024l-2%204%202%202%204%203h10c5-1%206-1%205-3-2-3%200-9%203-10%203%200%207%204%205%206-1%201%200%202%202%201v3l-2%203-1%201c-2%200-1%202%201%205%203%204%203%205%203%209l-1%205%203-1c5-2%209-1%2014%201l5%202c1-2%207-5%2010-5l3%201V72l1-10-1%201c0%202-3%203-4%201l-1-1c-1%201-2%200-3-1v-2c1%200%202-1%201-2h-2l1-2h3l-4-2c-19-5-37-23-45-46l-2-7h-12c-16%200-16%200-16%203%200%2012-9%2019-21%2016-4-1-6-3-4-4v-2c-1-2-2-8-1-11l1-3h-50l2%203c1%202%201%202-1%204-2%203-2%203-1%207%202%208-3%2015-11%2015-6%200-9-3-11-9-3-10%201-16%2010-16%203%200%204%200%204-2%201-2%200-2-10-2l-10%201v2l-1%203-2%202c-2%201-2%201-2%204%201%205-7%2010-10%206l-2-1v-1l-1-1c-1%201-7-4-7-7%200-2%203-5%207-7%201-1%200-1-5-1-6%200-6%200-5%202%202%203%201%2011-2%2014-7%2010-21-1-17-14%201-2%200-2-3%202s-4%204-6%203l-3-4V0h-15c-16%200-14-1-18%208l-3%204-6%201-1-3-2-6%201-3-33-1C45%200%2044%200%2042%202c-2%203-8%203-8%200%200-1-1-2-5-2h-5v4c-1%205-8%2010-10%207l-2-1c-4%200-8-4-6-6L5%203V1L3%200H0v16M372%202c0%203-2%206-4%206l6%206%208%205%202%201%201%201%201%201%205%203%204%202%203%201%202%202v-6c0-5%200-6-3-8l-3-1c-1%200-4-3-4-5l5-3c4-2%205-3%205-5s0-2-14-2-14%200-14%202M133%202v4l-4%204c-9%204-3%2010%209%2010%208-1%2011-9%205-16-3-3-9-4-10-2m122%200c-7%201-9%205-5%209v2l1%201v4c0%205%203%209%2010%2010%205%200%2010-4%2011-11l2-6V8l-6-3c-5-3-10-4-13-3m86%2018c-2%201-1%2010%202%2012l3%201c1-1%202%200%203%202%201%201%201%201%201-1s0-2%201-1c3%202%204-4%202-7-3-5-9-8-12-6m-237%202c-2%201-1%204%201%205l1%201-6%204c-4%203-4%204-4%207%201%205%201%205-4%201-3-2-4-3-2-5%201-2%201-4-2-6-2-1-8%200-8%203-1%201-5%202-5%200l-2-1c-2%200%200%202%204%205%204%202%204%202%202%203-5%202-9%2010-7%2015%202%209%204%2012%209%2015l4%203c-2%200-5%204-5%207-1%203-1%203-6%203s-6%200-9%203-5%208-3%2010l1%205c1%204%204%206%208%207h4l-4%204c-4%204-4%205%200%205s4%201-1%206c-4%204-5%206-5%209%200%209%206%2015%2012%2012l5-1%204-2h1l1-1%202-3%201-2v-2c2-1%200-7-4-11l-3-5c2-1-1-9-4-10-2%200-2-1-1-2%203-2%205-6%205-10%200-2%200-2%203-2%203%201%204%200%209-4l5-7%201-2c0-2-2-7-4-9-1-1-1-2%202-3%202-1%203-1%202-3%200-2%200-2%201-1l2-1%201-2v-2l3-1%203-1-1-2c-3%200-7%202-7%203l-2-3c-1-5-1-6%201-4%207%205%2017-2%2015-11-1-5-2-7-5-8l-2-3c1-2-5-8-7-6m63%203l2%201c2%200%204%206%202%208-1%202-1%207%201%208%203%200%207-3%208-6v-4l-7-7-4-1-2%201M27%2029c-5%204-2%2013%205%2015%204%201%2011-2%2012-4%201-5%201-11-1-10h-1c2-2-3-4-8-4-4%200-5%200-7%203m108-1v4c1%203%200%209-1%209l-3%201%201%201h3c1%202%200%205-3%205v1c5%203%2016-1%2018-7%201-3%201-3%202-2%201%203%202%202%202%200%200-4-1-6-3-6l-2-2-3-2-3-1-8-1m104%208c-3%203-4%2010-2%2012l1%201c-1%202%204%205%209%206%2011%201%2015-16%205-21-5-1-6-1-6%201l-1%201-1-1c0-3-2-2-5%201m-38%200c-4%202-7%207-7%2011s0%204-1%203c-4-5-14-4-14%201l-2%205c-3%204-3%206-1%208%208%207%2020%201%2019-9l-1-4%202%202c3%203%208%205%2011%204%201-1%202-1%201%204%200%207%202%2011%207%2014l6%202c1%200%200%205-2%207-1%202%200%205%203%205l6%201c5%201%206%201%206-4%200-2%202-3%207-4%202%200%203%201%204%204l2%204h6c5-1%207-1%2010-4%203-4%203-4%203-12l1-6c1%202%206%202%2010%200%203-2%205-1%203%202-3%205%200%2014%205%2020%202%203%204%203%207%203s5%200%204%201c-1%202%201%206%205%209%2010%207%2019-1%2013-13v-4c0-2-3-6-5-5s-2%201-2-1c0-1%201-2%204-2%203-1%204-1%203-2%200-3-3-3-5-1-3%202-3-1%200-3l2-7c0-6-1-9-8-12l-5-3-3%204-3%205-1%201v-5c1-15-17-22-27-10-4%205-4%207-3%2011%202%205%201%206-3%204-5-3-9-3-13-1s-5%202-6%201l-4-3-6-2-2-2%202-2c2-1%202-2%201-5-2-6-6-7-11-3l-2%203-1-3c-1-6-9-10-15-7m-38%209h-4c-1%200-3%203-1%204%201%202%200%206-2%207-2%200-2%201-1%202v3l2%203c3%202%205%207%204%207l-6%203c-5%203-6%206-4%206%201%200%202%201%201%202-1%206%208%2013%2015%2013%2013-2%2016-17%204-23-4-2-5-3-4-4v-3c0-2%202-7%204-9s2-2%201-4l-4-4c-2-4-3-4-5-3m-22%209l-3%201-2%202-3%202c-2%200-1%206%202%209%202%203%203%203%207%202l3-1%202-2%201-6c-1-7-3-8-7-7m-79%201c-6%203-3%2015%204%2017%208%202%2011-4%204-8-3-2-5-6-3-7v-2h-5m54%202c-4%201-8%206-8%2011%200%204%203%2011%206%2012l2%202c0%202%200%203%202%203s3-2%202-3c-1-2-1-2%202-3%207-3%2010-11%207-17l-2-3-4-1-7-1M27%2069c-3%200-4%205-2%207l1%204c0%206%207%207%2011%202%204-4%202-10-3-12-3-2-4-2-7-1m170%202l-5%202h-2l-1%201-2%201%203%201h2v1l6%205-3%202-2%201-1%201c-1-1-2%200-3%201-1%202-3%203-4%202l-5%202c-3%202-3%202-3%208%200%207%201%2010%205%2011%205%201%208-3%206-8-2-3-2-8%200-8l3%204c1%203%202%204%204%204h13c-1-1%200-2%201-3%202-2%201-7-1-11l-2-3%202-2c2-1%202-3%202-5%200-8-7-12-13-7M52%2072l-3%202c-2%200%200%204%203%205%202%201%203%204%201%207-2%202%201%202%203%200h1l1-1c1-2%200-8-1-9v-1c2%201%202%200%201-2s-5-2-6-1m81%204c-10%206%203%2021%2014%2016%204-2%203-13-1-16s-9-3-13%200m-29%207c-2%200-3%206-1%209%202%204%2010%204%2013-1s-5-10-12-8m123%209l-2%201c-2-1-7%204-5%205%201%202%202%201%202-1s0-2%203%201c2%204%203%206%201%207-1%201%200%204%202%204l1%201%201-1%202-1-1-10v-2l-2-3-2-1m46%203v9l2%201c1%203%206%203%209%200%204-4%204-9-1-9l-7-4c-2-3-4-1-3%203m60-3c-1%201-1%201%202%202%202%201%203%202%202%203l1%202v6h-2l-1%201%202%202h3v-1c5%200%208-11%204-14-2-2-9-3-11-1m-211%202c-7%201-11%2012-8%2019%203%206%2016%2010%2020%206%202-2%205-11%205-16%200-6-8-10-17-9m114%202v9l1%207h3c9%200%2013-12%206-17l-7-2c-4%200-4%200-3%203M88%2097c-4%204-1%2011%204%2011%207%200%209-4%204-9-4-5-5-5-8-2m64-1c-7%201-15%2015-11%2019l3%205%203%202%203%201c2%202%207%200%2014-6%206-4%206-5%206-9%200-5-4-10-9-11-5-2-5-2-9-1m149%2014c-2%202-3%203-2%206v6c-1%201%200%202%201%203l1%203c0%202%202%201%205-2%205-5%205-10%201-16l-4-3-2%203m-43%201c-9%204-8%2018%201%2023l3%202-2%202c-3%203-3%207%200%208l6-3%204-1c4%200%205%201%203%202l-1%207-1%205-2%201c-2%201-10%204-12%203l-1-2-1%201-1%203v-7l1-2%201-6c1-8-11-17-17-11-1%201-1%201-1-2l2-7c1-7-7-14-12-10l-1%202-3%202c-9%201-12%205-12%2012%200%206%203%208%2013%209l9-1c2%200%203%200%204%202%200%203%201%204%206%204%205%201%2010%203%207%203h-3l-1%201h-2c-2-1-2-1-4%201s-2%202-3%201h-2l1%203c1%201%201%201-2%201-2-1-3%200-3%201l1%206v2l1%201%201-1h2v3l1%203c2%203%2010%203%2014-1l3-2-1%203-1%207c1%207%201%207-1%205-4-5-14-8-20-5l-4%201c-2%200-3%201-3%207-3%2017%209%2027%2023%2021%201-1%202%200%202%205%200%206%200%207-2%207-1%201-2%200-3-3-2-5-3-5-13-5l-11%201c-2%202-2%202%200%2015%201%206%206%209%2013%209%204-1%205-1%205%201l1%202%202%201c2%203%203%203%202%200%200-2%201-3%203-4%205-5%209-9%209-11s1-2%206-2c13%200%2020-12%2013-23-3-4-7-5-15-3l-5%202v-12c-1-2-1-2%204%202%2010%209%2025%203%2027-10l1-4c3%202%209%201%2012-2l4-5c0-1%201-2%203-2%202-1%205-2%206-4l2-2%202%203c0%202%202%204%204%205%203%202%204%203%203%205-1%205%206%209%209%204%202-1%202-2%200-5-1-3-1-3%201-6%203-2%204-8%203-11%200-4-6-12-6-11l-5%201-6%202-3%202-2-2-5-5c-2-1-3-2-4-5l-3-4c-5%200-6%203-4%207%202%201%202%202%200%203l-1%205%205%2017h-6l-9%201c-2%202-2%202-3-1-1-2-1-2%201-4%203-2%203-3%205-13%200-6-4-9-11-9-5%201-5%201-5-1l-1-4c-1-2%202-5%205-5%205%201%207-2%206-8-2-6-4-8-7-8-1%200-3%200-4-2-4-3-11-4-15-1m-60%201c-2%203-3%206-2%2012l1%204c0%203%205%202%2012-2%208-5%209-8%201-13-4-4-8-4-12-1m-99%200c-5%203-3%2014%202%2014%202%200%203%200%203%206v7l4%202%208%201h3v4c2%203%2015%203%2018%200%205-6%200-17-8-16-2%201-3%201-4-1-1-4-4-7-9-8l-4-3c0-5-8-9-13-6m218%201c-5%203-7%206-5%2013%203%2013%206%2017%2016%2016l7%201v1l1%205c0%201%200%202%202%201s2-4%201-8c-2-2-2-3%200-5l2-9c0-5%200-6-3-9-6-7-14-10-21-6m-146%202c-5%202-6%207-1%205%202%200%202%200%201%201l-2%204%201%203h2c1%201%200%202-2%203l-2%205c-1%204-8%203-8-1h-4c-4%200-9%204-11%207-3%207%202%2017%2010%2020%204%202%2012%203%2012%201l3-4c3-3%203-6%203-10-1-3-1-3%202-3l7-1c2%200%203%200%203%203l1%204%204%203%204%201c3%200%203%200%202%202-2%206%202%2015%2011%2021v1h-7c-1-5-11-6-16-2-6%205-6%2015%201%2019%204%202%202%203-2%203-3-1-4%200-6%203l-3%204-2-3c-4-7-15-11-21-8l-6%201c-2%200-3%200-2%201%203%200%202%202%200%202-1%200-2%200-1-1l-1-1c-2%201-3%205-2%206l1-1%201-1c1%200%202%201%201%204-2%2017%2025%2026%2031%2011l1-3%202%203c2%205%205%207%2014%207l9-1%202-1%203-3c5-5%204-14-2-22-2-3-2-6%201-5h5c5-1%208-5%208-11%200-1%201-3%203-3l5-3%202-2%202-4c3-14-4-23-17-22-5%201-5%201-5-2-1-5-6-9-10-9h-4v-5c0-6-3-13-5-13l-4-2c-2-2-8-3-12-1m-148%201c-4%203-1%2013%205%2013%205%200%208-11%204-13h-9m19%206l-1%202%201%203%201%204v1l-1%202%202%201h7c3-2%202-8-2-11s-5-4-7-2m-18%2011c-3%202-6%205-8%209s0%209%204%2012c6%205%2011%203%2016-6%202-6%202-6%200-9-4-7-8-9-12-6m326%2021c-4%200-6%204-5%207v2l3%207v1l1%205c2%205%206%205%2011%201%203-2%203-2%205%200l1%202v3c-1%201%200%202%201%205s2%203%205%203c6%200%209-3%2011-7%201-4%201-6-1-6l-2-1c0-2%200-2%201-1%203%202%203-1%200-4-2-3-8-5-13-5l-3%201-1-5c0-4%200-5-2-5l-3-1c-1-1-7-3-9-2m-259%204c-2%200-3%204-2%205v10c-1%202-4%203-4%201l-2-2-2%201v3c-1%202%201%203%207%204h6l6-2c2%200%202%200%201-1s0-3%201-6c3-9-2-15-11-13m16%202c-8%207%200%2022%208%2015%203-3%203-16%200-17-3-2-6-1-8%202m70-2c-4%202-7%208-4%208v2c0%202%204%201%205-1h1l3%204%201-2h2c1%202%202%201%203-3%201-7-5-11-11-8m-160%201c-9%203-11%2011-6%2018%202%202%202%202%202-2l-1-5c-1-1%200-1%204-2l2-1h3l1%201h3l2%201c2%201%202%201%201-1l1-3c1-1-1-5-4-6h-8m44%209c-10%2011-1%2026%2012%2019%205-3%206-6%203-10l-4-7c-2-5-7-6-11-2m246%205l-2%202-3%204-4%205-1%201c-2%200-4%202-4%205l-2%202-1%203-1%203-1%202-1%202-1%202-4%206-4%207-1%203-1%201-1%201-3%203-3%204-2%202-1%202v3l2%203c1%205%2011%207%2017%203s9-13%207-17c-1-2%200-3%202-5l4-2c2%200%2016-14%2018-17l2-2c0%202%205%207%208%208%202%200%202%200%201-1l-1-3c1-1%204%203%204%205l1%201h2c4%202%208-2%205-5-2-1-2-2-1-3%204-8-3-16-12-14l-3%201v-6l-1-7c-4-4-11-5-14-2m-184%207c-2%201-3%203-2%203l-1%201v1l2-1c1-2%204-3%204-1l-1%201v2l2%201%201%201-1%201-2%201h-6l-2-2-3-4c-4-5-5-5-10-5-11%200-15%2015-5%2019%207%203%2012%201%2014-5%200-4%202-4%203-1%200%203%200%203%204%202%203-2%204-1%201%202-2%201%201%203%209%203%207%201%209%200%2010-5%202-8%201-11-4-11l-3-1h-1v-2c0-4-5-4-9%200m41%201c-3%203-3%208-1%2010%201%200%202%201%201%202l2%201%202%201%201%201%201%201c-1%201%204%201%206-1%201-2%200-13-2-15-2-3-6-2-10%200m-84%207c-12%203-15%2015-5%2018l3%201-3%202-6%207c-3%206-2%209%203%2014l4%206c-1%202%200%202%202%203s6%200%206-2%2010-7%2011-5l-1%202c-2%202-2%203%200%204%202%203%209%201%208-2v-1c1%200%201-2-1-6-1-3-3-4-5-2l-1-4c1-8-1-11-7-15l-4-2%202-2%203-1%201-1c1-3%200-9-2-12-2-2-5-3-8-2m-71%203c0%202%200%202-2%202-2-1-5%201-3%203h3c1-1%201-1%201%201-2%204%203%205%208%202%204-3%202-8-5-10-2-1-2-1-2%202m41%200c-7%206-5%2017%204%2017%2012%200%2013-15%201-17h-5m61%2012c-5%203-5%207-2%209v1l-1%201%203%201c3-1%207%202%204%203v1l-1%202c-2%201-1%203%201%203h1c0%201%206%201%207-1h1l1-1c-1-1%200-3%201-4%203-2%203-9-1-11-5-4-11-6-14-4m-78%2010c-5%205-5%205-4%209%201%206%205%206%2011%201%209-6%2010-8%205-12-4-4-6-4-12%202m281-4c-4%202-5%208-2%2013l-1%202c-2-1-1%204%200%206%202%203%209%204%2012%202l2-4c0-2%201-5%204-7%204-6%204-7%201-10-2-3-3-3-8-3l-8%201m-262%206l1%202-2%203c-3%202-4%208-2%208s4%203%204%206c0%202%200%202%201%201%200-3%201-2%204%200l4%202c3%200%207-3%206-5l-1-5c-1-6-3-9-7-10h-4l-1-2c-1-1-3-2-3%200m117%2012c-2%204-6%206-9%202-5-6-21-5-24%202-3%206%201%2013%209%2015%204%200%2011-3%2014-7%203-3%206-4%206-1%201%202%205%203%2011%201%2011-3%208-16-3-16-2%200-3%201-4%204m206-3l1%2014c3%203%209-2%209-8s-4-9-10-6m-340%209c-3%201-4%204-5%2010%200%206%201%206%207%203%204-2%204-3%204-6%200-5-3-8-6-7m85%204v3c-1%202-1%202%201%202l1%201c-2%201-2%201-2%207v4l-2-2-2-1%202%203%201%202c0%202%201%202%206%200%204-1%207-5%207-10%200-3-1-5-3-5%200%201-2%200-3-2l-4-3-2%201m233%204c-1%202-4%204-7%205-7%202-7%203-7%208%201%204%201%204%204%206l4%204h4l4-4%204-2%201%202c2%207%206%206%2011-1%204-6%205-10%202-12-3-1-7-1-7%201-1%202-4%201-5-3-3-7-4-8-8-4m-185%205l-3%205c0%204%204%2010%206%2010l4%204c-1%201%201%201%204-1%202%200%203-2%203-3%200-2-3-6-5-6l-1-2%202%201h2l2-2%201-2h-1l-2%201v-2l-1-1c2-1-3-5-6-5-2%200-4%201-5%203m-92%200c-4%202-4%208%200%2010%209%203%2017-4%209-9-4-2-6-2-9-1m69%204c-6%203-6%206-3%2010%207%206%2014%200%2012-10-1-4-3-4-9%200m-47-1c-2%202-1%208%201%2011%204%204%2012%203%2013-1%201-1-1-4-2-4s-5-4-5-6h-7'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",aspectRatio:1.5,src:"/static/166b7223e51d8b7bf415144d96e8dc86/95388/bg.jpg",srcSet:"/static/166b7223e51d8b7bf415144d96e8dc86/ac6ef/bg.jpg 1040w,\n/static/166b7223e51d8b7bf415144d96e8dc86/5d93e/bg.jpg 2080w,\n/static/166b7223e51d8b7bf415144d96e8dc86/95388/bg.jpg 4160w,\n/static/166b7223e51d8b7bf415144d96e8dc86/b1724/bg.jpg 6000w",srcWebp:"/static/166b7223e51d8b7bf415144d96e8dc86/defa2/bg.webp",srcSetWebp:"/static/166b7223e51d8b7bf415144d96e8dc86/17cca/bg.webp 1040w,\n/static/166b7223e51d8b7bf415144d96e8dc86/93223/bg.webp 2080w,\n/static/166b7223e51d8b7bf415144d96e8dc86/defa2/bg.webp 4160w,\n/static/166b7223e51d8b7bf415144d96e8dc86/2b242/bg.webp 6000w",sizes:"(max-width: 4160px) 100vw, 4160px"}}}}}}}]);
//# sourceMappingURL=component---src-pages-index-js-d18ec082075261f9b2ff.js.map
(function(t){function e(e){for(var a,s,o=e[0],l=e[1],c=e[2],d=0,f=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,o=1;o<n.length;o++){var l=n[o];0!==i[l]&&(a=!1)}a&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},i={app:0},r=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/Vue-AR-Card/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("85ec"),i=n.n(a);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view")],1)],1)},r=[],s={name:"App",components:{}},o=s,l=(n("034f"),n("2877")),c=Object(l["a"])(o,i,r,!1,null,null,null),u=c.exports,d=n("951b"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"screen-main"}},[n("div",{staticClass:"left"}),n("div",{staticClass:"right"},["login"==t.state?n("div",{staticClass:"container"},[t._m(0),n("form",{staticClass:"container-inputfield"},[n("md-field",[n("label",[t._v("UserName")]),n("md-input")],1),n("md-field",[n("label",[t._v("Password")]),n("md-input")],1)],1),n("div",{staticClass:"loginstate"},[n("md-checkbox",[t._v("Remember me")]),n("md-button",{staticClass:"loginstate-forgot",attrs:{"md-ripple":!1}},[t._v("Forgot Password")])],1),n("div",{staticClass:"container-buttons"},[n("a",{staticClass:"buttons-login",attrs:{href:""}},[t._v("Login")]),n("a",{staticClass:"buttons-signup",on:{click:function(e){return t.toRegister()}}},[t._v("Sign up")])])]):t._e(),"register"==t.state?n("div",{staticClass:"container"},[n("div",{staticClass:"main-container"},[t._m(1),n("form",{staticClass:"container-inputfield"},[n("md-field",[n("label",[t._v("FirstName")]),n("md-input")],1),n("md-field",[n("label",[t._v("LastName")]),n("md-input")],1),n("md-field",[n("label",[t._v("UserName")]),n("md-input")],1),n("md-field",[n("label",[t._v("Email")]),n("md-input")],1),n("md-field",[n("label",[t._v("Password")]),n("md-input")],1),n("md-field",[n("label",[t._v("Comfirm Password")]),n("md-input")],1)],1),n("md-checkbox",[t._v("I agree with terms and conditions")]),n("a",{staticClass:"container-buttons-skip"},[t._v("Skip")]),n("a",{staticClass:"buttons-Already",on:{click:function(e){return t.toLogin()}}},[t._v("Already have an account? Sign in.")])],1)]):t._e()])])},p=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-title"},[n("h1",{staticClass:"md-title md-headline"},[t._v("IBM AR Business Card")]),n("h2",[t._v("Welcome back! Please login to your account.")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-title"},[n("h1",{staticClass:"md-title md-headline"},[t._v("IBM AR Business Card")]),n("h2",[t._v("Please complete to create your account.")])])}],m={name:"home",methods:{toRegister:function(){this.state="register"},toLogin:function(){this.state="login"}},data:function(){return{state:"login"}}},v=m,b=(n("dc6f"),n("c26a"),Object(l["a"])(v,f,p,!1,null,"64ec99db",null)),h=b.exports,_=[{path:"/",name:"login",component:h}],g=new d["a"]({routes:_}),C=n("43f9"),y=n.n(C);n("51de"),n("e094");a["default"].use(d["a"]),a["default"].use(y.a),new a["default"]({render:function(t){return t(u)},router:g}).$mount("#app")},"85ec":function(t,e,n){},c26a:function(t,e,n){"use strict";var a=n("ef99"),i=n.n(a);i.a},dc6f:function(t,e,n){"use strict";var a=n("f7fc"),i=n.n(a);i.a},ef99:function(t,e,n){},f7fc:function(t,e,n){}});
//# sourceMappingURL=app.62a70429.js.map
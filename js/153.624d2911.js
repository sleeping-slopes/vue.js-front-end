"use strict";(self["webpackChunkvuejs_spa"]=self["webpackChunkvuejs_spa"]||[]).push([[153],{4153:function(t,s,e){e.r(s),e.d(s,{default:function(){return _}});var n=e(3396),l=e(7139);const i={class:"column"},o={class:"row y-center"},r=(0,n._)("span",{class:"secondary-text font-size-big"},"Hear the songs you’ve played:",-1),a={class:"row gap-20 y-center right"},c={class:"row y-center gap-5"},u=(0,n._)("span",{class:"secondary-text font-size-medium"},"View",-1),y=(0,n._)("label",{class:"label-search"},[(0,n._)("input",{type:"text",placeholder:"Filter",autocomplete:"off"}),(0,n._)("i",{class:"fa fa-search"})],-1);function g(t,s,e,g,p,d){const h=(0,n.up)("songContainer"),b=(0,n.up)("panel");return(0,n.wg)(),(0,n.iD)("div",i,[(0,n._)("div",o,[r,(0,n._)("div",a,[(0,n._)("div",c,[u,(0,n._)("button",{class:(0,l.C_)([{toggled:1==this.currentViewStyle},"button button-secondary bi bi-grid-fill"]),onClick:s[0]||(s[0]=t=>this.currentViewStyle=1)},null,2),(0,n._)("button",{class:(0,l.C_)([{toggled:0==this.currentViewStyle},"button button-secondary bi bi-list"]),onClick:s[1]||(s[1]=t=>this.currentViewStyle=0)},null,2)]),y,(0,n._)("button",{class:"button button-secondary",onClick:s[2]||(s[2]=t=>{this.$store.dispatch("clearSongHistory"),p.historyPlaylist.songs=[]})},"Clear all history")])]),0==this.currentViewStyle?((0,n.wg)(),(0,n.j4)(b,{key:0},{content:(0,n.w5)((()=>[(0,n.Wm)(h,{type:"ul-list scroll-hidden",dynamicComponent:"songExtended",playlist:p.historyPlaylist},null,8,["playlist"])])),_:1})):((0,n.wg)(),(0,n.j4)(h,{key:1,type:"ul-grid",dynamicComponent:"songCard",playlist:p.historyPlaylist},null,8,["playlist"]))])}var p=e(1417),d=e(3818),h={name:"YourHistoryView",components:{panel:p.Z,songContainer:d.Z},data(){return{historyPlaylist:{id:"[]RENAME",songs:JSON.parse(JSON.stringify(this.$store.getters.getSongHistory)),...JSON.parse(JSON.stringify(this.$store.getters.getSongHistory)).length<1&&{error:{status:404,message:"No HISTORY songs"}}},currentViewStyle:1}}},b=e(89);const w=(0,b.Z)(h,[["render",g]]);var _=w}}]);
//# sourceMappingURL=153.624d2911.js.map
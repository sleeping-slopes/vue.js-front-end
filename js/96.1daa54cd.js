"use strict";(self["webpackChunkvuejs_spa"]=self["webpackChunkvuejs_spa"]||[]).push([[96],{306:function(s,t,e){e.d(t,{Z:function(){return h}});var i=e(3396),l=e(7139);const o={class:"carousel"};function r(s,t,e,r,n,a){return(0,i.wg)(),(0,i.iD)("div",o,[(0,i._)("div",{class:"carousel-content scroll-hidden",ref:"carousel",onScroll:t[0]||(t[0]=(...s)=>this.scroll&&this.scroll(...s))},[(0,i.WI)(s.$slots,"content",{},void 0,!0)],544),(0,i._)("button",{class:"button button-default button-round button-medium bi bi-arrow-left-circle-fill",ref:"leftScrollButton",style:(0,l.j5)({left:this.leftVisible?"10px":"-40px"}),onClick:t[1]||(t[1]=s=>a.shift(-1))},null,4),(0,i._)("button",{class:"button button-default button-round button-medium bi bi-arrow-right-circle-fill",ref:"rightScrollButton",style:(0,l.j5)({right:this.rightVisible?"10px":"-40px"}),onClick:t[2]||(t[2]=s=>a.shift(1))},null,4)])}var n=e(5834),a={name:"carousel",components:{playlistContainer:n.Z},data(){return{scrollPosition:0,maxScroll:void 0,resizeObserver:void 0}},computed:{leftVisible(){return this.scrollPosition>0},rightVisible(){return this.scrollPosition<this.maxScroll}},mounted(){this.resizeObserver=new ResizeObserver(this.sizeChanged),this.resizeObserver.observe(this.$refs.carousel)},beforeUnmount(){this.resizeObserver.disconnect()},methods:{sizeChanged(){this.maxScroll=this.$refs.carousel.scrollWidth-this.$refs.carousel.offsetWidth},scroll(s){this.scrollPosition=s.target.scrollLeft},shift(s){this.scrollPosition+=138*s*2,this.scrollPosition=Math.max(0,this.scrollPosition),this.scrollPosition=Math.min(this.scrollPosition,this.maxScroll),this.$refs.carousel.scroll(this.scrollPosition,0)}}},u=e(89);const c=(0,u.Z)(a,[["render",r],["__scopeId","data-v-5e71dbd4"]]);var h=c},3096:function(s,t,e){e.r(t),e.d(t,{default:function(){return f}});var i=e(3396),l=e(7139);function o(s,t,e,o,r,n){const a=(0,i.up)("playlistContainer"),u=(0,i.up)("carousel"),c=(0,i.up)("panel"),h=(0,i.up)("songContainer");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(c,null,{header:(0,i.w5)((()=>[(0,i.Uk)("Playlists liked by "+(0,l.zw)(this.user.username),1)])),content:(0,i.w5)((()=>[(0,i.Wm)(u,null,{content:(0,i.w5)((()=>[(0,i.Wm)(a,{type:"row gap-10",playlists:r.userPlaylistLikes,dynamicComponent:"playlistCarouselCard"},null,8,["playlists"])])),_:1})])),_:1}),(0,i.Wm)(c,null,{header:(0,i.w5)((()=>[(0,i.Uk)("Songs liked by "+(0,l.zw)(this.user.username),1)])),content:(0,i.w5)((()=>[(0,i.Wm)(h,{type:"ul-list",dynamicComponent:"songExtended",playlist:r.userSongLikes},null,8,["playlist"])])),_:1})],64)}var r=e(1417),n=e(306),a=e(3818),u=e(5834),c=e(3278),h={name:"UserLikesView",components:{panel:r.Z,carousel:n.Z,songContainer:a.Z,playlistContainer:u.Z},props:{login:{default:"route_param_login"}},data(){return{userPlaylistLikes:void 0,userSongLikes:void 0}},computed:{user(){return this.$store.getters.getUser(this.login)}},async created(){this.userSongLikes=(await c.Z.get("users/"+this.login+"/songs/likes")).songList,this.userPlaylistLikes=await c.Z.get("users/"+this.login+"/playlists/likes")}},d=e(89);const p=(0,d.Z)(h,[["render",o]]);var f=p}}]);
//# sourceMappingURL=96.1daa54cd.js.map
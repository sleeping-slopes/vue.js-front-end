"use strict";(self["webpackChunkvuejs_spa"]=self["webpackChunkvuejs_spa"]||[]).push([[190],{7913:function(e,s,n){n.d(s,{Z:function(){return Z}});var t=n(3396),a=n(9242),o=n(7139);const i={key:0,class:"row"},r=["src"],l={key:1,class:"cover bi bi-music-note"},c={class:"info-wrapper"},d={class:"secondary-text font-size-big"},p={key:1},u={key:2};function g(e,s,n,g,m,h){const w=(0,t.up)("router-link"),k=(0,t.up)("songHeaderSkeleton");return(0,t.wg)(),(0,t.j4)(a.uT,{name:"skeletonFade"},{default:(0,t.w5)((()=>[(this.$parent.loaded??1)&&this.loaded?((0,t.wg)(),(0,t.iD)("div",i,[(0,t.Wm)(w,{to:{name:"Song",params:{id:this.id}},class:"cover-wrapper s100x100"},{default:(0,t.w5)((()=>[this.song.cover?((0,t.wg)(),(0,t.iD)("img",{key:0,class:"cover",src:this.song.coversrc},null,8,r)):((0,t.wg)(),(0,t.iD)("div",l))])),_:1},8,["to"]),(0,t._)("div",c,[(0,t._)("div",d,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(this.song.artists,((e,s)=>((0,t.wg)(),(0,t.iD)(t.HY,null,[e.login?((0,t.wg)(),(0,t.j4)(w,{key:0,to:{name:"User",params:{login:e.login}},class:"alink"},{default:(0,t.w5)((()=>[(0,t.Uk)((0,o.zw)(e.name),1)])),_:2},1032,["to"])):((0,t.wg)(),(0,t.iD)("span",p,(0,o.zw)(e.name),1)),s+1<this.song.artists.length?((0,t.wg)(),(0,t.iD)("span",u,", ")):(0,t.kq)("",!0)],64)))),256))]),(0,t._)("h1",null,[(0,t.Wm)(w,{to:{name:"Song",params:{id:this.id}},class:"primary-text hoverable font-size-large"},{default:(0,t.w5)((()=>[(0,t.Uk)((0,o.zw)(this.song.name),1)])),_:1},8,["to"])])])])):((0,t.wg)(),(0,t.j4)(k,{key:1}))])),_:1})}var m=n(8438);const h={class:"row"},w=(0,t._)("div",{class:"cover-wrapper s100x100 shimmer"},null,-1),k={class:"info-wrapper"};function v(e,s,n,a,o,i){const r=(0,t.up)("skeleton");return(0,t.wg)(),(0,t.iD)("div",h,[w,(0,t._)("div",k,[(0,t.Wm)(r,{class:"font-size-big shimmer",minwidth:150,maxwidth:300}),(0,t.Wm)(r,{class:"font-size-large shimmer",minwidth:200,maxwidth:400})])])}var f=n(3097),_={name:"songHeaderSkeleton",components:{skeleton:f.Z}},y=n(89);const b=(0,y.Z)(_,[["render",v]]);var S=b,x={name:"songHeader",extends:m.Z,components:{songHeaderSkeleton:S}};const W=(0,y.Z)(x,[["render",g]]);var Z=W},4175:function(e,s,n){n.r(s),n.d(s,{default:function(){return w}});var t=n(3396);const a={key:0,class:"content column"},o={class:"sticky-top"},i={style:{position:"relative"}},r={class:"nav-tab"},l=(0,t.uE)('<article class="project-info row"><p><span>About website</span><br> Non-commercial project created solely for demonstration purposes.<br> I do not own the copyrights to the posted content. </p><p><span>Technologies used</span><br> Frontend: HTML, CSS (PostCSS), Vue.js, Axios;<br> Backend: Express.js, MySQL, REST API, Multer, JSON Web Token. </p><p style="white-space:nowrap;">Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target="”_blank”" rel="noopener noreferrer">@sleeping-slopes</a></p><p class="right" style="white-space:nowrap;"><span class="accent-text">Language: </span>English (US)</p></article>',1);function c(e,s,n,c,d,p){const u=(0,t.up)("songHeader"),g=(0,t.up)("router-link"),m=(0,t.up)("userContainer");return this.song&&!this.song.error?((0,t.wg)(),(0,t.iD)("div",a,[(0,t._)("div",o,[(0,t._)("div",i,[(0,t.Wm)(u,{id:this.id},null,8,["id"])]),(0,t._)("nav",r,[(0,t._)("ul",null,[(0,t._)("li",null,[(0,t.Wm)(g,{to:{name:"SongLikes",params:{id:this.id}}},{default:(0,t.w5)((()=>[(0,t.Uk)("Likes")])),_:1},8,["to"])]),(0,t._)("li",null,[(0,t.Wm)(g,{to:{name:"SongPlaylists",params:{id:this.id}}},{default:(0,t.w5)((()=>[(0,t.Uk)("In playlists")])),_:1},8,["to"])]),(0,t._)("li",null,[(0,t.Wm)(g,{to:{name:"SongRelated",params:{id:this.id}}},{default:(0,t.w5)((()=>[(0,t.Uk)("Related songs")])),_:1},8,["to"])])])])]),(0,t.Wm)(m,{type:"ul-grid",dynamicComponent:"userCard",users:d.users},null,8,["users"]),l])):(0,t.kq)("",!0)}n(7658);var d=n(3278),p=n(7913),u=n(9419),g={name:"SongLikesView",components:{songHeader:p.Z,userContainer:u.Z},props:{id:{default:"route_param_id"}},data(){return{song:void 0,users:void 0}},async created(){this.song=await d.Z.get("songs/"+this.id),this.song.error&&this.$router.push({name:"Song",params:{id:this.id}}),this.users=await d.Z.get("songs/"+this.id+"/likes")}},m=n(89);const h=(0,m.Z)(g,[["render",c]]);var w=h}}]);
//# sourceMappingURL=190.a7f385f9.js.map
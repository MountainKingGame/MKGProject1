var xls,isNode,isEncrypt=!1;!function(e){function _(){return e.load=function(_){n("items",e.rootPath+(e.language?"/"+e.language:"")+"/items.json",function(n,o){var a=n.tables;e.tables=a.slice();var r,i=a.length,s=[];for(e.requisites=["items"],r=0;r<i;r++)n[a[r]].merge?s.push(a[r]):e.requisites.push(a[r]),t(n,n[a[r]]);var l=function(e){return n["table_"+e]?n["table_"+e]:(console.warn("ID为"+e+"的配置不存在!"),null)},L=function(_,t,n){if(n){var o=e[l(n).name];return o.hasLoaded?o.getSubkeyItem(_,t):(console.warn("配置表"+l(n).name+"没有加载."),null)}return console.warn("必须指定tableId值."),null},u=function(_,t){if(t){var o=e[l(t).name];return o.hasLoaded?o.getItem(_):(console.warn("配置表"+l(t).name+"没有加载."),null)}return e.isGlobal?n[_]:(console.warn("非全局ID打表模式必须指定tableId值."),null)},d=function(_){var t=e[l(_).name];return t.hasLoaded?t.getItems():(console.warn("配置表"+l(_).name+"没有加载."),null)};e.getSubkeyItem=L,e.getItem=u,e.getItems=d,e.getAttribute=l;var T=i=s.length;for(r=0;r<i;r++)e[s[r]].load(function(){T--,T<=0&&(e.hasInitialized=!0,_(n,o))})},e.modificationTimestamp)},e.loadAll=function(_){e.load(function(t,n){var o=t.tables,a=o.slice(),r=function(){a.length?e[a.shift()].load(r):_&&_(t,n)};r()})},!1}function t(_,a,r,i){var s=e.rootPath+"/"+(e.language?"/"+e.language:"")+"/"+a.name+".json";s=s.replace(/\/\/+/g,"/");var l=e[a.name]||(e[a.name]={}),L=function(n,o,r,i){var L=o.table;if(l.hasLoaded)return void i(a.values,s);var u,d,T,A,I,E,g,f,Y=_[L[0]].subkey||(_[L[0]].subkey={});switch(o.type){case"info":E=L[1],Y[E]?e[L[0]].load(function(){if(o.split)for(u=0,T=n.length;u<T;u++){I=n[u],g=I[o.field].split(o.split[0]);var e=[];for(d=0,A=g.length;d<A;d++)e.push(Y[E][g[d]]);I["$"+o.field]=e}else for(u=0,T=n.length;u<T;u++)I=n[u],I["$"+o.field]=Y[E][I[o.field]];i(a.values,s)}):i(a.values,s);break;case"definition":var h,U,R=[];if(o.split)for(u=0,T=n.length;u<T;u++){var c=[];if(n[u][o.field])for(g=n[u][o.field].split(o.split[0]),d=0,A=g.length;d<A;d++){I={},c.push(I);var p=g[d].split(o.split[1]),P=r.fields,M=r.types;for(h=0,U=P.length;h<U;h++)"string"==M[h]?I[P[h]]=p[h]||null:I[P[h]]=+p[h]||null}R=R.concat(c),n[u][o.field]=c}else for(u=0,T=n.length;u<T;u++){if(n[u][o.field]){I={};var p=n[u][o.field].split(o.split[0]),P=r.fields,M=r.types;for(h=0,U=P.length;h<U;h++)"string"==M[h]?I[P[h]]=p[h]||"":M[h].search(/^\s*(?:number|int|uint)\s*$/)!=-1?I[P[h]]=p[h]||0:I[P[h]]=+p[h]||null;R.push(I)}n[u][o.field]=I}_[L[0]].values=R,t(_,_[L[0]],function(){_[L[0]].values.length=0,i(a.values,s)},!0);break;case"link":E=L[1],Y[E]?e[L[0]].load(function(){for(u=0,T=n.length;u<T;u++)I=n[u],null!=(f=Y[E][I[o.field]])?I[o.field]=f[L[2]]||null:(console.warn("配置表"+a.name+","+o.field+"字段，值为("+I[o.field]+")的映射数据不存在."),I[o.field]=null);i(a.values,s)}):i(a.values,s)}},u=function(t,n){var r=a.values;if(r){var i,s,l,u,d,T,A=r.length,I=a.htmlField,g=a.multidimensional,f=a.multidimensionalValues,Y=a.subkey||(a.subkey={});if(I)if(d=I.length,e.isGlobal)for(i=0;i<A;i++){r[i].getTableId=E,_[r[i].id]=r[i];for(l in Y)Y[l][r[i][l]]=r[i];for(s=0;s<d;s++)u=r[i][I[s]],u&&(r[i][I[s]]=o(u))}else{var h=a.data={};for(i=0;i<A;i++){r[i].getTableId=E,h[r[i].id]=r[i];for(l in Y)Y[l][r[i][l]]=r[i];for(s=0;s<d;s++)u=r[i][I[s]],u&&(r[i][I[s]]=o(u))}}else if(e.isGlobal)for(i=0;i<A;i++){r[i].getTableId=E,_[r[i].id]=r[i];for(l in Y)Y[l][r[i][l]]=r[i]}else{var h=a.data={};for(i=0;i<A;i++){r[i].getTableId=E,h[r[i].id]=r[i];for(l in Y)Y[l][r[i][l]]=r[i]}}if(g&&n){T=g.length;var U=T;for(i=0;i<T;i++)L(r,g[i],f?f[i]:"",function(){U--,U<=0&&t()})}else t()}},d=function(){return a},T=function(e,_){var t=a.subkey[e];return t?(t=t[_],t||console.warn("配置表"+a.name+","+e+"列中不存在子健为"+_+"的数据项."),t):(console.warn("配置表"+a.name+"中不存在子健为"+e+"的字段."),null)},A=function(t){var n=e.isGlobal?_[t]:a.data&&a.data[t];return n||console.warn("配置表"+a.name+"中不存在ID为"+t+"的数据项."),n},I=function(){return a.values},E=function(){return a.id},g=function(e){var _=function(_,t){return l.hasLoaded?void e(a.values,t):(a.values=_,void u(function(){l.hasLoaded=!0,e(_,t)},!0))};l.hasLoaded?isNode?e(a.values,s):egret.callLater(e,this,a.values,s):a.merge?isNode?_(a.values,s):egret.callLater(_,this,a.values,s):n(l.getAttribute().name,s,_,a.modification)};l.hasLoaded=!1,l.load=g,l.getAttribute=d,l.getItem=A,l.getSubkeyItem=T,l.getItems=I,_["table_"+a.id]=a,i&&u(function(){r(a.values,s)},!0)}function n(_,t,o,i){if(r)return void a.push([_,t,o,i]);r=!0;var s=function(e){r=!1,o(e,t),a.length&&n.apply(this,a.shift())};return"items"!=_&&e[_].hasLoaded?void s(e[_].getItems(),t):void(e.customLoader?e.customLoader(isNode,isEncrypt,i,_,t,s):isNode?s(require(t),t):RES.getResByUrl(t+"?v="+i,s,this,RES.ResourceItem.TYPE_JSON))}function o(e){var _=/&lt;|&gt;|&amp;|&apos;|&quot;/g;return e.replace(_,function(e,_){switch(e){case"&lt;":return"<";case"&gt;":return">";case"&amp;":return"&";case"&apos;":return"’";case"&quot;":return'"'}return e})}e.hasInitialized=_(),e.language="cn",e.rootPath="resource/xls/json",e.isGlobal=!1,e.createTimestamp=1519376564853,e.modificationTimestamp=1519375942278,e.customLoader,e.tables,e.requisites;var a=[],r=!1}(xls||(xls={}));try{require&&module&&require("child_process")&&(isNode=!0,xls.rootPath.indexOf(":")==-1&&0!=xls.rootPath.indexOf("./")&&(xls.rootPath="./"+xls.rootPath,xls.rootPath=xls.rootPath.replace(/\/\/+/g,"/")),module.exports=global.xls=xls)}catch(e){}var xls;!function(e){var _=function(){function e(){}return e.QUALITY_2X_EXP_SCROLL=4,e.QUALITY_2X_TRIAL_CARD=4,e.QUALITY_STAMINA_POT=4,e.QUALITY_LV_1_HP_POT=1,e.QUALITY_LV_1_PATK_POT=1,e.QUALITY_LV_1_PDEF_POT=1,e.QUALITY_LV_1_BLOCK_POT=1,e.QUALITY_LV_1_MATK_POT=1,e.QUALITY_LV_1_MDEF_POT=1,e.QUALITY_LV_1_CRIT_POT=1,e.QUALITY_LV_1_SPD_POT=1,e.QUALITY_LV_2_HP_POT=2,e.QUALITY_LV_2_PATK_POT=2,e.QUALITY_LV_2_PDEF_POT=2,e.QUALITY_LV_2_BLOCK_POT=2,e.QUALITY_LV_2_MATK_POT=2,e.QUALITY_LV_2_MDEF_POT=2,e.QUALITY_LV_2_CRIT_POT=2,e.QUALITY_LV_2_SPD_POT=2,e.QUALITY_LV_3_HP_POT=3,e.QUALITY_LV_3_PATK_POT=3,e.QUALITY_LV_3_PDEF_POT=3,e.QUALITY_LV_3_BLOCK_POT=3,e.QUALITY_LV_3_MATK_POT=3,e.QUALITY_LV_3_MDEF_POT=3,e.QUALITY_LV_3_CRIT_POT=3,e.QUALITY_LV_3_SPD_POT=3,e.QUALITY_LV_1_PATK_GEM=1,e.QUALITY_LV_2_PATK_GEM=2,e.QUALITY_LV_3_PATK_GEM=3,e.QUALITY_LV_4_PATK_GEM=4,e.QUALITY_LV_5_PATK_GEM=5,e.QUALITY_LV_6_PATK_GEM=6,e.QUALITY_LV_1_PDEF_GEM=1,e.QUALITY_LV_2_PDEF_GEM=2,e.QUALITY_LV_3_PDEF_GEM=3,e.QUALITY_LV_4_PDEF_GEM=4,e.QUALITY_LV_5_PDEF_GEM=5,e.QUALITY_LV_6_PDEF_GEM=6,e.QUALITY_LV_1_MATK_GEM=1,e.QUALITY_LV_2_MATK_GEM=2,e.QUALITY_LV_3_MATK_GEM=3,e.QUALITY_LV_4_MATK_GEM=4,e.QUALITY_LV_5_MATK_GEM=5,e.QUALITY_LV_6_MATK_GEM=6,e.QUALITY_LV_1_MDEF_GEM=1,e.QUALITY_LV_2_MDEF_GEM=2,e.QUALITY_LV_3_MDEF_GEM=3,e.QUALITY_LV_4_MDEF_GEM=4,e.QUALITY_LV_5_MDEF_GEM=5,e.QUALITY_LV_6_MDEF_GEM=6,e.QUALITY_LV_1_HP_GEM=1,e.QUALITY_LV_2_HP_GEM=2,e.QUALITY_LV_3_HP_GEM=3,e.QUALITY_LV_4_HP_GEM=4,e.QUALITY_LV_5_HP_GEM=5,e.QUALITY_LV_6_HP_GEM=6,e.QUALITY_LV_1_CRIT_GEM=1,e.QUALITY_LV_2_CRIT_GEM=2,e.QUALITY_LV_3_CRIT_GEM=3,e.QUALITY_LV_4_CRIT_GEM=4,e.QUALITY_LV_5_CRIT_GEM=5,e.QUALITY_LV_6_CRIT_GEM=6,e.QUALITY_LV_1_BLOCK_GEM=1,e.QUALITY_LV_2_BLOCK_GEM=2,e.QUALITY_LV_3_BLOCK_GEM=3,e.QUALITY_LV_4_BLOCK_GEM=4,e.QUALITY_LV_5_BLOCK_GEM=5,e.QUALITY_LV_6_BLOCK_GEM=6,e.QUALITY_LV_1_SPD_GEM=1,e.QUALITY_LV_2_SPD_GEM=2,e.QUALITY_LV_3_SPD_GEM=3,e.QUALITY_LV_4_SPD_GEM=4,e.QUALITY_LV_5_SPD_GEM=5,e.QUALITY_LV_6_SPD_GEM=6,e.QUALITY_LV_1_FURY_GEM=1,e.QUALITY_LV_2_FURY_GEM=2,e.QUALITY_LV_3_FURY_GEM=3,e.QUALITY_LV_4_FURY_GEM=4,e.QUALITY_LV_5_FURY_GEM=5,e.QUALITY_LV_6_FURY_GEM=6,e.QUALITY_DIAMOND_OPENER=4,e.QUALITY_TRANSFER_STONE=4,e.QUALITY_HORN_L_=4,e.QUALITY_HORN_S_=4,e.QUALITY_VIP1_PACK=5,e.QUALITY_VIP2_PACK=5,e.QUALITY_VIP3_PACK=5,e.QUALITY_VIP4_PACK=5,e.QUALITY_VIP5_PACK=5,e.QUALITY_VIP6_PACK=5,e.QUALITY_VIP7_PACK=5,e.QUALITY_VIP8_PACK=5,e.QUALITY_VIP9_PACK=5,e.QUALITY_VIP10_PACK=5,e.QUALITY_LV10_NEWBIE_PACK=5,e.QUALITY_LV20_NEWBIE_PACK=5,e.QUALITY_LV30_NEWBIE_PACK=5,e.QUALITY_LV40_NEWBIE_PACK=5,e}();e.PropConst=_}(xls||(xls={}));var xls;!function(e){var _=function(){function e(){}return e.DUNGEON_AFK="Congrats you obtained [#prop_list#] through AFK in Dungeon.",e.SYSTEM_MAIL="System Mail, don't reply.",e.ARSENAL="Congrats you get [#prop_list#] through combining in Arsenal. ",e.TRIAL_TOWE_AFK="Congrats you obtained [#prop_list#] through AFK in Trial Tower.",e.REWARDS_FOR_GUILD_BATTLE="Congrats you obtained [#prop_list#] in Guild Battle.",e.RANKING_REWARDS_IN_BATTLE_OF_GODS="Congrats you obtained following rewards in Battle of Gods：#prop_list#",e.ESCORT_REWARDS="Congrats you finished Escort,obtained #prop_list#",e.NEWBIE_LOGIN_REWARDS="Congrats you get [#prop_list#] for newbie rewards.",e.DUNGEON_S_LOOT="Congrats you obtained [#prop_list#] in Dungeon.",e.REWARDS_FROM_DUNGEON="Congrats you obtained [#prop_list#] in Dungeon.",e.REWARDS_FROM_UNITY_GATE="Congrats you obtained [#prop_list#] in Dungeon.",e.CRYSTAL_ALTAR_S_LOOT="Congrats you obtained [#prop_list#] in Crystal Altar.",e.TRIAL_TOWE_S_LOOT="Congrats you obtained [#prop_list#] in Trial Tower.",e.GUILD_MASTER_TRANSFER="Guild Master [#Player_Name#] is offline 7 days. The Guild Master will be automatically transferred when offline for more than 10 days.\n1.The Vice Guild Master who has logged on in the past 3 days will be the default candidate for new Guild Master.If no one qualifies, players holding the next highest position will be considered.\n2.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, and the candidate with the most votes will be the new guild master.\n3.If the Guild Master returns during voting, transfer procedures will be rendered invalid.",e.NEW_GUILD_MASTER="Guild Master [#Player_Name#] is offline 15 days. Guild Master transfer to [#Player_Name#], congrats to him/her.",e.GUILD_MASTER_ELECTION="Guild Master [#Player_Name#] is offline 10 days, candidates is expecting for your vote. You can click “Election” in Guild to vote.\n1.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, candidate with the most votes will be the new guild master.\n2.If the guild master returns during voting, transfer procedures will be rendered invalid.",e.GUILD_MASTER_RETURNS_="The Guild Master [#Player_Name#] returns during voting, transfer procedures will be rendered invalid.",e.GUILD_DISMISSED="All members in [#guild_name#] didn't login in 90 days, your guild dismissed.",e.LOGIN_REWARDS="Congrats you gaind [#prop_list#] as login rewards.",e.REWARDS_FOR_BEAST_SHOOTING="Congrats you obtained [#prop_list#] in Beast Shooting.",e.ONLINE_REWARDS_AT_20_00_EVERYDAY_="Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 20:00 everyday. Wish you have fun in game.",e.ONLINE_REWARDS_AT_21_00_EVERYDAY_="Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 21:00 everyday. Wish you have fun in game.",e.REWARDS_FROM_IDEAS_OF_MARCH="You've made outstanding contribution in Ideas March, you're the 1st, rewarded [#prop_list#]",e.CLEARANCE_REWARDS_FOR_THE_TRIAL_TOWER="Congrat you reach to Floor[#n_floor#] in the Trial Tower, obtained the gorgeous rewards.",e.CLAIM_REWARDS_="All rewards have been sent to you via the mail as your inventory is full, please sort your inventory as soon as possible.",e.REWARDS_OF_LAST_HIT="You gave the last hit of the Guard in Honor&amp;Glory, rewarded [#prop_list#]",e.REWARDS_FOR_HONOR_AMP_GLORY="Congrats you obtained [#prop_list#] in Honor&amp;Glory.",e.REWARDS_FROM_HONOR_AMP_GLORY="Congrats you got guard rewards in Honor&amp;Glory,rewarded [#prop_list#]",e.TREASURE_REWARDS="Congrats you got [#prop_list#] in Ancient Treasure.",e.REWARDS_OF_LAST_HIT_IN_WORLD_BOSS="You gave the final blow to the Boss in World Boss, rewarded [#prop_list#]",e.REWARDS_FROM_WORLD_BOSS="Congrats you obtained [#prop_list#] in World Boss.",e.YOUR_INVENTORY_IS_FULL="Your rewards were sent via the mail as your inventory is full, please sort as soon as possible.",e.BYE_REWARDS="Dear Warrior，\nYour guild receives a bye in the group stage of Dragon Hegemony, and you will receive the following rewards.",e.DRAGON_HEGEMONY_NOTICE="Dear Player，\nYour guild will fight against [#guild_name#] at 20:00 tonight, it&apos;s your time to shine!",e.DRAGON_HEGEMONY_REWARDS="Dear Warrior,\nCongrats on getting the rewards in Dragon Hegemony：[#prop_list#].",e.GODS_GLORY_REWARDS="Distinguished Hero,\nCongrats on getting #Rank#th place in Gods'Glory.You have won awesome rewards!",e.GROUP_COMPLETION_REWARDS="Distinguished Hero,\nCongrats you obtained Group Completion Rewards in Cross-Server Arena.",e}();e.MailConst=_}(xls||(xls={}));
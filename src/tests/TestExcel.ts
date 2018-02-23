namespace tests {
    export class TestExcel{
        func1(){
            console.log("[info]","tests.TestExcel.func1");
            //加载索引表配置,tips表在索引表中标记了为合并，所以下面不需要对tips表再做加载处理.
            xls.load(() => {
                console.log("[info]","load complete");
                console.log("[log]",xls.rootPath,xls.language);
                var list_mail = xls.mail.getItems();
                console.log("[info]",list_mail.length,"<-`list_mail.length`");
                var list_tips = xls.tips.getItems();
                console.log("[info]",list_tips.length,"<-`list_tips.length`");
                var list = xls.monsterReward.getItems();
                console.log("[info]",list.length,"<-`list.length`");
                var info:xls.IMonsterRewardInfo = xls.monsterReward.getItem(588009);
                console.log("[info]",info.getTableId(),info.id,info.monster_reward_prop,info.name);
            });
        }
    }
}
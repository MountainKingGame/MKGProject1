declare module xls
{
	/**
	 * ## 对应配置表monsterReward.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterRewardInfo extends IItemBaseInfo
	{
		/**
		* ### 掉落包id 
		*/
		id:number;

		/**
		* ### 物品串 
		* >
		* 
		* ----
		* ### 定义关联:monsterRewardPropDef.xls
		* > ***monsterRewardPropDef表字段列表:***
		* 
		* > |id|monster_reward_prop|
		* |:-:|:-:|
		* |uint|uint| 
		*/
		monster_reward_prop:IMonsterRewardPropDefInfo[];

	}
}

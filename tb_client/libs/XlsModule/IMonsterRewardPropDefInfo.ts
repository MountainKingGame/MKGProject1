declare module xls
{
	/**
	 * ## 对应配置表monsterRewardPropDef.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterRewardPropDefInfo extends IItemBaseInfo
	{
		/**
		* ### 物品ID 
		* >奖励包内容表的id 
		*/
		id:number;

		/**
		* ### 物品数量 
		* >掉落数量 
		*/
		monster_reward_prop:number;

	}
}

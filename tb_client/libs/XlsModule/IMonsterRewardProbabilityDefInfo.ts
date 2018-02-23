declare module xls
{
	/**
	 * ## 对应配置表monsterRewardProbabilityDef.xls中的数据.
	 * @author deden-configuration
	 */
	export interface IMonsterRewardProbabilityDefInfo extends IItemBaseInfo
	{
		/**
		* ### 掉落包ID 
		* >奖励包内容表的id,关联掉落包内容
		* 
		* ----
		* ### 索引关联:$id 
		*/
		id:number;

		/**
		* ### 掉落包数量 
		* >掉落数量 
		*/
		monster_reward_prop:number;

		/**
		* ### 掉落概率 
		* >掉落概率是0-1000的值，放大百分百到千位数 
		*/
		probability:number;

		/**
		* ### 掉落包id 
		* >奖励包内容表的id,关联掉落包内容
		* 
		* ----
		* ### 索引关联:monsterReward.xls
		* >索引字段 id:
		* `$id	<===>	id`
		* 
		* ***monsterReward表字段列表:***
		* 
		* > |id|monster_reward_prop|
		* |:-:|:-:|
		* |int|monsterRewardPropDef[]| 
		*/
		$id:IMonsterRewardInfo;

	}
}

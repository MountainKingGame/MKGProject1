declare module xls
{
	/**
	 * ##配置表mail.xls 的表宏定义信息.
	 * @author deden-configuration
	*/
	class MailConst
	{
		/**
		* ## id:608201
		* Congrats you obtained [#prop_list#] through AFK in Dungeon.
		*/
		static DUNGEON_AFK : string;
		/**
		* ## id:608202
		* System Mail, don't reply.
		*/
		static SYSTEM_MAIL : string;
		/**
		* ## id:608203
		* Congrats you get [#prop_list#] through combining in Arsenal. 
		*/
		static ARSENAL : string;
		/**
		* ## id:608204
		* Congrats you obtained [#prop_list#] through AFK in Trial Tower.
		*/
		static TRIAL_TOWE_AFK : string;
		/**
		* ## id:608205
		* Congrats you obtained [#prop_list#] in Guild Battle.
		*/
		static REWARDS_FOR_GUILD_BATTLE : string;
		/**
		* ## id:608206
		* Congrats you obtained following rewards in Battle of Gods：#prop_list#
		*/
		static RANKING_REWARDS_IN_BATTLE_OF_GODS : string;
		/**
		* ## id:608207
		* Congrats you finished Escort,obtained #prop_list#
		*/
		static ESCORT_REWARDS : string;
		/**
		* ## id:608208
		* Congrats you get [#prop_list#] for newbie rewards.
		*/
		static NEWBIE_LOGIN_REWARDS : string;
		/**
		* ## id:608209
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		static DUNGEON_S_LOOT : string;
		/**
		* ## id:608210
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		static REWARDS_FROM_DUNGEON : string;
		/**
		* ## id:608211
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		static REWARDS_FROM_UNITY_GATE : string;
		/**
		* ## id:608212
		* Congrats you obtained [#prop_list#] in Crystal Altar.
		*/
		static CRYSTAL_ALTAR_S_LOOT : string;
		/**
		* ## id:608213
		* Congrats you obtained [#prop_list#] in Trial Tower.
		*/
		static TRIAL_TOWE_S_LOOT : string;
		/**
		* ## id:608215
		* Guild Master [#Player_Name#] is offline 7 days. The Guild Master will be automatically transferred when offline for more than 10 days.
		* 1.The Vice Guild Master who has logged on in the past 3 days will be the default candidate for new Guild Master.If no one qualifies, players holding the next highest position will be considered.
		* 2.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, and the candidate with the most votes will be the new guild master.
		* 3.If the Guild Master returns during voting, transfer procedures will be rendered invalid.
		*/
		static GUILD_MASTER_TRANSFER : string;
		/**
		* ## id:608216
		* Guild Master [#Player_Name#] is offline 15 days. Guild Master transfer to [#Player_Name#], congrats to him/her.
		*/
		static NEW_GUILD_MASTER : string;
		/**
		* ## id:608217
		* Guild Master [#Player_Name#] is offline 10 days, candidates is expecting for your vote. You can click “Election” in Guild to vote.
		* 1.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, candidate with the most votes will be the new guild master.
		* 2.If the guild master returns during voting, transfer procedures will be rendered invalid.
		*/
		static GUILD_MASTER_ELECTION : string;
		/**
		* ## id:608218
		* The Guild Master [#Player_Name#] returns during voting, transfer procedures will be rendered invalid.
		*/
		static GUILD_MASTER_RETURNS_ : string;
		/**
		* ## id:608219
		* All members in [#guild_name#] didn't login in 90 days, your guild dismissed.
		*/
		static GUILD_DISMISSED : string;
		/**
		* ## id:608220
		* Congrats you gaind [#prop_list#] as login rewards.
		*/
		static LOGIN_REWARDS : string;
		/**
		* ## id:608221
		* Congrats you obtained [#prop_list#] in Beast Shooting.
		*/
		static REWARDS_FOR_BEAST_SHOOTING : string;
		/**
		* ## id:608222
		* Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 20:00 everyday. Wish you have fun in game.
		*/
		static ONLINE_REWARDS_AT_20_00_EVERYDAY_ : string;
		/**
		* ## id:608223
		* Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 21:00 everyday. Wish you have fun in game.
		*/
		static ONLINE_REWARDS_AT_21_00_EVERYDAY_ : string;
		/**
		* ## id:608224
		* You've made outstanding contribution in Ideas March, you're the 1st, rewarded [#prop_list#]
		*/
		static REWARDS_FROM_IDEAS_OF_MARCH : string;
		/**
		* ## id:608228
		* Congrat you reach to Floor[#n_floor#] in the Trial Tower, obtained the gorgeous rewards.
		*/
		static CLEARANCE_REWARDS_FOR_THE_TRIAL_TOWER : string;
		/**
		* ## id:608229
		* All rewards have been sent to you via the mail as your inventory is full, please sort your inventory as soon as possible.
		*/
		static CLAIM_REWARDS_ : string;
		/**
		* ## id:608233
		* You gave the last hit of the Guard in Honor&amp;Glory, rewarded [#prop_list#]
		*/
		static REWARDS_OF_LAST_HIT : string;
		/**
		* ## id:608234
		* Congrats you obtained [#prop_list#] in Honor&amp;Glory.
		*/
		static REWARDS_FOR_HONOR_AMP_GLORY : string;
		/**
		* ## id:608235
		* Congrats you got guard rewards in Honor&amp;Glory,rewarded [#prop_list#]
		*/
		static REWARDS_FROM_HONOR_AMP_GLORY : string;
		/**
		* ## id:608236
		* Congrats you got [#prop_list#] in Ancient Treasure.
		*/
		static TREASURE_REWARDS : string;
		/**
		* ## id:608238
		* You gave the final blow to the Boss in World Boss, rewarded [#prop_list#]
		*/
		static REWARDS_OF_LAST_HIT_IN_WORLD_BOSS : string;
		/**
		* ## id:608239
		* Congrats you obtained [#prop_list#] in World Boss.
		*/
		static REWARDS_FROM_WORLD_BOSS : string;
		/**
		* ## id:608240
		* Your rewards were sent via the mail as your inventory is full, please sort as soon as possible.
		*/
		static YOUR_INVENTORY_IS_FULL : string;
		/**
		* ## id:608241
		* Dear Warrior，\nYour guild receives a bye in the group stage of Dragon Hegemony, and you will receive the following rewards.
		*/
		static BYE_REWARDS : string;
		/**
		* ## id:608242
		* Dear Player，\nYour guild will fight against [#guild_name#] at 20:00 tonight, it&apos;s your time to shine!
		*/
		static DRAGON_HEGEMONY_NOTICE : string;
		/**
		* ## id:608243
		* Dear Warrior,\nCongrats on getting the rewards in Dragon Hegemony：[#prop_list#].
		*/
		static DRAGON_HEGEMONY_REWARDS : string;
		/**
		* ## id:608244
		* Distinguished Hero,\nCongrats on getting #Rank#th place in Gods'Glory.You have won awesome rewards!
		*/
		static GODS_GLORY_REWARDS : string;
		/**
		* ## id:608245
		* Distinguished Hero,\nCongrats you obtained Group Completion Rewards in Cross-Server Arena.
		*/
		static GROUP_COMPLETION_REWARDS : string;

	}
}

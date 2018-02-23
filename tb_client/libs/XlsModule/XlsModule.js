/**
 * xls配置表模块.
 * @author deden-configuration
*/
var xls, isNode;
var isEncrypt = false;
(function (xls) {
    /** 是否已经初始化模块. */
    xls.hasInitialized = initConfig();
    /** 当前加载配置的国家语言. */
    xls.language = 'cn';
    /** 数据文件存储根目录url路径. */
    xls.rootPath = 'resource/xls/json';
    /** 配置表ID是否全局唯一. */
    xls.isGlobal = false;
    /** 生成配置的时间戳. */
    xls.createTimestamp = 1519376721932;
    /** 索引表最后修改的时间戳. */
    xls.modificationTimestamp = 1519375942278;
    /** 自定义加载器. */
    xls.customLoader;
    /** 获取配置`模块表`列表. */
    xls.tables;
    /** 获取需要加载的配置项,包含`索引表`和`模块表`列表. */
    xls.requisites;

    /**
     * 初始化配置信息
     * @returns {boolean}
     */
    function initConfig() {
        /** 加载合并的Json大表 */
        xls.load = function (onFinishedCallBack) {
            getResByUrl('items', xls.rootPath + (xls.language ? '/' + xls.language : '') + '/items.json', function (bigJson, url) {
                //获取配置表队列
                var _tables = bigJson['tables'];
                xls.tables = _tables.slice();
                var _len = _tables.length;
                //初始化索引数据，获得合并列表数据表
                var i;
                var mergeList = [];
                xls.requisites = ['items'];
                for (i = 0; i < _len; i++) {
					if (bigJson[_tables[i]].merge){
                        mergeList.push(_tables[i]);
                    }else{
                        xls.requisites.push(_tables[i]);
                    } 
                    flush(bigJson, bigJson[_tables[i]]);
                }
                //获取表类别ID.
                var _getAttribute = function (tableId) {
                    if (!bigJson['table_' + tableId]) {
                        console.warn('ID为' + tableId + '的配置不存在!');
                        return null;
                    }
                    return bigJson['table_' + tableId];
                };
                //通过子健获取独立的数据信息.
                var _getSubkeyItem = function (subfield, subkey, tableId) {
                    if (tableId) {
                        var table = xls[_getAttribute(tableId).name];
                        if (table.hasLoaded) {
                            return table.getSubkeyItem(subfield, subkey);
                        }
                        else {
                            console.warn('配置表' + _getAttribute(tableId).name + '没有加载.');
                            return null;
                        }
                    }
                    else {
                        console.warn('必须指定tableId值.');
                        return null;
                    }
                };
                //通过ID获取独立的数据信息.
                var _getItem = function (id, tableId) {
                    if (tableId) {
                        var table = xls[_getAttribute(tableId).name];
                        if (table.hasLoaded) {
                            return table.getItem(id);
                        }
                        else {
                            console.warn('配置表' + _getAttribute(tableId).name + '没有加载.');
                            return null;
                        }
                    }
                    else {
                        if (xls.isGlobal) {
                            return bigJson[id];
                        }
                        else {
                            console.warn('非全局ID打表模式必须指定tableId值.');
                            return null;
                        }
                    }
                };
                //通过ID获取独立的数据信息.
                var _getItems = function (tableId) {
                    var table = xls[_getAttribute(tableId).name];
                    if (table.hasLoaded) {
                        return table.getItems();
                    }
                    else {
                        console.warn('配置表' + _getAttribute(tableId).name + '没有加载.');
                        return null;
                    }
                };
                xls.getSubkeyItem = _getSubkeyItem;
                xls.getItem = _getItem;
                xls.getItems = _getItems;
                xls.getAttribute = _getAttribute;
                //合并表初始化
                var _count = _len = mergeList.length;
				for (i = 0; i < _len; i++) {
					xls[mergeList[i]].load(function () {
                        _count--;
                        if (_count <= 0) {
                            xls.hasInitialized = true;
                            onFinishedCallBack(bigJson, url);
                        }
                    });
                }
            }, xls.modificationTimestamp);
        };
        /** 加载所有配置 */
        xls.loadAll = function (onFinishedCallBack) {          
            xls.load(function (bigJson, url) {
                //获取配置表队列
                var _tables = bigJson['tables'];
                var list = _tables.slice();
                var loadSingleTable = function () {
                    if (list.length) {
                        xls[list.shift()].load(loadSingleTable);
                    }
                    else {
                        if (onFinishedCallBack)
                            onFinishedCallBack(bigJson, url);
                    }
                };
                loadSingleTable();
            });
        };
        return false;
    }
    /**
     * 植入JSON数据
     * @param bigJson
     * @param obj
     */
    function flush(bigJson, obj, onFinishedCallBack, associateMultidimensional) {
        var url = xls.rootPath + '/' + (xls.language ? '/' + xls.language : '') + '/' + obj.name + '.json';
        url = url.replace(/\/\/+/g, '/');
        //给模块接口赋值
        var _attributes = xls[obj.name] || (xls[obj.name] = {});
        //关联多为表数据.
        var _flushMultidimensionalData = function (values, multidimensional, multidimensionalValues, onSubFinishedCallBack) {
            //映射表信息
            var tableInfo = multidimensional.table;
            //是否加载过
			if (_attributes.hasLoaded) {
				onSubFinishedCallBack(obj.values, url);
				return;
			}
            //创建子健对象
            var subkey = bigJson[tableInfo[0]].subkey || (bigJson[tableInfo[0]].subkey = {});
            var j, k, len, len2, subObj, key, defValues, value;
            switch (multidimensional.type) {
                case 'info':
                    key = tableInfo[1];
                    if (subkey[key]) {
                        xls[tableInfo[0]].load(function () {
							if (multidimensional.split) {
								for (j = 0, len = values.length; j < len; j++) {
									subObj = values[j];
									defValues = subObj[multidimensional.field].split(multidimensional.split[0]); //分解数组
									var infoList = [];
									for (k = 0, len2 = defValues.length; k < len2; k++) {
										infoList.push(subkey[key][defValues[k]]);
									}
									subObj['$' + multidimensional.field] = infoList;
								}
							} else {
								for (j = 0, len = values.length; j < len; j++) {
									subObj = values[j];
									subObj['$' + multidimensional.field] = subkey[key][subObj[multidimensional.field]];
								}
							}
                            onSubFinishedCallBack(obj.values, url);
                        });
                    }
                    else {
                        onSubFinishedCallBack(obj.values, url);
                    }
                    break;
                case 'definition':
                    var l, len3;
                    var definitionVlues = [];
                    if (multidimensional.split) {
	                    for (j = 0, len = values.length; j < len; j++) {
	                        var definitionList = [];
	                        if (values[j][multidimensional.field]) {
	                            defValues = values[j][multidimensional.field].split(multidimensional.split[0]); //定义原始数据
	                            for (k = 0, len2 = defValues.length; k < len2; k++) {
	                                subObj = {};
	                                definitionList.push(subObj);
	                                var subValues = defValues[k].split(multidimensional.split[1]);
	                                var fields = multidimensionalValues.fields;
	                                var types = multidimensionalValues.types;
	                                for (l = 0, len3 = fields.length; l < len3; l++) {
	                                    if (types[l] == 'string') {
	                                        subObj[fields[l]] = subValues[l] || null;
	                                    }
	                                    else {
	                                        subObj[fields[l]] = +subValues[l] || null;
	                                    }
	                                }
	                            }
	                        }
	                        definitionVlues = definitionVlues.concat(definitionList);
	                        values[j][multidimensional.field] = definitionList;
	                    }
                    }else{
                    	for (j = 0, len = values.length; j < len; j++) {	                        
	                        if (values[j][multidimensional.field]) {
                                subObj = {};
                                var subValues = values[j][multidimensional.field].split(multidimensional.split[0]); 
                                var fields = multidimensionalValues.fields;
                                var types = multidimensionalValues.types;
                                for (l = 0, len3 = fields.length; l < len3; l++) {
                                    if (types[l] == 'string') {
                                        subObj[fields[l]] = subValues[l] || "";
                                    }
                                    else if (types[l].search(/^\s*(?:number|int|uint)\s*$/) != -1) {
                                        subObj[fields[l]] = subValues[l] || 0;
                                    }
                                    else {
                                        subObj[fields[l]] = +subValues[l] || null;
                                    }
                                }
                                definitionVlues.push(subObj);
	                        }
	                        values[j][multidimensional.field] = subObj;
	                    }
                    }
                    bigJson[tableInfo[0]].values = definitionVlues;
					flush(bigJson, bigJson[tableInfo[0]], function () {
                        bigJson[tableInfo[0]].values.length = 0;
						onSubFinishedCallBack(obj.values, url);
                    }, true);
                    break;
                case 'link':
                    key = tableInfo[1];
                    if (subkey[key]) {
                        xls[tableInfo[0]].load(function () {
                            for (j = 0, len = values.length; j < len; j++) {
                                subObj = values[j];
                                if ((value = subkey[key][subObj[multidimensional.field]]) != null) {
                                    subObj[multidimensional.field] = value[tableInfo[2]] || null;
                                }
                                else {
                                    console.warn('配置表' + obj.name + ',' + multidimensional.field + '字段，值为(' + subObj[multidimensional.field] + ')的映射数据不存在.');
                                    subObj[multidimensional.field] = null;
                                }
                            }
                            onSubFinishedCallBack(obj.values, url);
                        });
                    }
                    else {
                        onSubFinishedCallBack(obj.values, url);
                    }
                    break;
            }
        };
        //将数据信息个根据ID作为key索引到独立实例.
        var _flushData = function (callback, associate) {
            var values = obj.values;
            if (values) {
                var len2 = values.length;
                var j, k, key, htmlValue, len3, len4, element;
                var htmlList = obj.htmlField;
                var multidimensional = obj.multidimensional;
                var multidimensionalValues = obj.multidimensionalValues;
                var subObj = obj.subkey || (obj.subkey = {});
                if (htmlList) {
                    len3 = htmlList.length;
                    if (xls.isGlobal) {
                        for (j = 0; j < len2; j++) {
                            values[j].getTableId = _getTableId;
                            bigJson[values[j].id] = values[j];
                            for (key in subObj) {
                                subObj[key][values[j][key]] = values[j];
                            }
                            for (k = 0; k < len3; k++) {
                                htmlValue = values[j][htmlList[k]];
                                if (htmlValue)
                                    values[j][htmlList[k]] = decodeHtml(htmlValue);
                            }
                        }
                    }
                    else {
                        var data = obj['data'] = {};
                        for (j = 0; j < len2; j++) {
                            values[j].getTableId = _getTableId;
                            data[values[j].id] = values[j];
                            for (key in subObj) {
                                subObj[key][values[j][key]] = values[j];
                            }
                            for (k = 0; k < len3; k++) {
                                htmlValue = values[j][htmlList[k]];
                                if (htmlValue)
                                    values[j][htmlList[k]] = decodeHtml(htmlValue);
                            }
                        }
                    }
                }
                else {
                    if (xls.isGlobal) {
                        for (j = 0; j < len2; j++) {
                            values[j].getTableId = _getTableId;
                            bigJson[values[j].id] = values[j];
                            for (key in subObj) {
                                subObj[key][values[j][key]] = values[j];
                            }
                        }
                    }
                    else {
                        var data = obj['data'] = {};
                        for (j = 0; j < len2; j++) {
                            values[j].getTableId = _getTableId;
                            data[values[j].id] = values[j];
                            for (key in subObj) {
                                subObj[key][values[j][key]] = values[j];
                            }
                        }
                    }
                }
                if (multidimensional && associate) {                   
                        len4 = multidimensional.length;
                        var _count = len4;
                        for (j = 0; j < len4; j++) {
                            {
                                _flushMultidimensionalData(values, multidimensional[j], multidimensionalValues?multidimensionalValues[j]:"", function () {
                                    _count--;
                                    if (_count <= 0) {
                                        callback();
                                    }
                                });
                            }
                        }
                }
                else {
                    callback();
                }
            }
        };
        //获取表属性
        var _getAttribute = function () {
            return obj;
        };
        //通过子健获取实例项.
        var _getSubkeyItem = function (subfield, subkey) {
            var result = obj.subkey[subfield];
            if (!result) {
                console.warn('配置表' + obj.name + '中不存在子健为' + subfield + '的字段.');
                return null;
            }
            result = result[subkey];
            if (!result)
                console.warn('配置表' + obj.name + ',' + subfield + '列中不存在子健为' + subkey + '的数据项.');
            return result;
        };
        //通过ID获取实例项.
        var _getItem = function (id) {
            var result = xls.isGlobal ? bigJson[id] : obj.data && obj.data[id];
            if (!result)
                console.warn('配置表' + obj.name + '中不存在ID为' + id + '的数据项.');
            return result;
        };
        //获取实例队列.
        var _getItems = function () {
            return obj.values;
        };
        //获取表ID.
        var _getTableId = function () {
            return obj.id;
        };
        //加载子表
        var _load = function (onSubFinishedCallBack) {
            var _flushDataOnTableLoaded = function (data, url) {
            	if(_attributes.hasLoaded){
            		onSubFinishedCallBack(obj.values, url);
            		return;
            	}
                obj.values = data;
                _flushData(function () {
                    _attributes.hasLoaded = true;
                    onSubFinishedCallBack(data, url);
                }, true);
            }
            //外部子表加载完成，合并到大表中
            if (_attributes.hasLoaded) {
                if (isNode) {
					onSubFinishedCallBack(obj.values, url);
				} else {
					egret.callLater(onSubFinishedCallBack, this, obj.values, url);
				}
            }
            else if (obj.merge) {
                if (isNode) {
					_flushDataOnTableLoaded(obj.values, url);
				} else {
					egret.callLater(_flushDataOnTableLoaded, this, obj.values, url);
				}
            }
            else {
                getResByUrl(_attributes.getAttribute().name, url, _flushDataOnTableLoaded, obj.modification);
            }
        };
        //给模块接口赋值
        _attributes.hasLoaded = false;
        _attributes.load = _load;
        _attributes.getAttribute = _getAttribute;
        _attributes.getItem = _getItem;
        _attributes.getSubkeyItem = _getSubkeyItem;
        _attributes.getItems = _getItems;
        bigJson['table_' + obj.id] = obj;
        if (associateMultidimensional) {
			_flushData(function () {
				onFinishedCallBack(obj.values, url);
			}, true);
		}
    }


    //加载顺序列表
	var sortLoadList = [];
	//是否在加载中
	var isLoading = false;

	/**
	 * 载入配置文件的加载器，可设置自定义加载器.
	 */
	function getResByUrl(table, url, compFunc, modification) {
        if (isLoading) {
			sortLoadList.push([table, url, compFunc, modification]);
			return;
		}
		isLoading = true;
		var cb = function (data) {
			isLoading = false;
			compFunc(data, url);
			if (sortLoadList.length) getResByUrl.apply(this, sortLoadList.shift());
		}
		if (table != 'items' && xls[table].hasLoaded){
            cb(xls[table].getItems(), url);
            return;
        } 

		if (xls.customLoader) {
			xls.customLoader(isNode, isEncrypt, modification, table, url, cb);
		} else {
			if (isNode) {
				cb(require(url), url);
			} else {
				RES.getResByUrl(url + "?v=" + modification, cb, this, RES.ResourceItem.TYPE_JSON);
			}
		}
	}

    /** 解码带html支持的配置表 */
    function decodeHtml(str) {
        var reg = /&lt;|&gt;|&amp;|&apos;|&quot;/g;
        return str.replace(reg, function (marchStr, replaceStr) {
            switch (marchStr) {
                case "&lt;":
                    return "<";
                case "&gt;":
                    return ">";
                case "&amp;":
                    return "&";
                case "&apos;":
                    return "’";
                case "&quot;":
                    return "\"";
            }
            return marchStr;
        });
    }
})(xls || (xls = {}));
/** 兼容nodejs的判断语句. */
try{
    if (require && module && require("child_process")) {
        isNode = true;
        if (xls.rootPath.indexOf(":") == -1 && xls.rootPath.indexOf("./") != 0) {
            xls.rootPath = "./" + xls.rootPath;
            xls.rootPath = xls.rootPath.replace(/\/\/+/g, '/');
        }
        module.exports = global.xls = xls;
    }
}catch(e){};
var xls;
(function (xls) {
    /**
	 * ##配置表prop.xls 的表宏定义信息.
	 * @author deden-configuration
	*/
    var PropConst = (function () {
		function PropConst() {
		}
		/**
		* ## id:130001
		* 2x EXP Scroll
		*/
		PropConst.QUALITY_2X_EXP_SCROLL = 4;
		/**
		* ## id:130002
		* 2x Trial Card
		*/
		PropConst.QUALITY_2X_TRIAL_CARD = 4;
		/**
		* ## id:130003
		* Stamina Pot
		*/
		PropConst.QUALITY_STAMINA_POT = 4;
		/**
		* ## id:130004
		* LV.1 HP Pot
		*/
		PropConst.QUALITY_LV_1_HP_POT = 1;
		/**
		* ## id:130005
		* LV.1 PATK Pot
		*/
		PropConst.QUALITY_LV_1_PATK_POT = 1;
		/**
		* ## id:130006
		* LV.1 PDEF Pot
		*/
		PropConst.QUALITY_LV_1_PDEF_POT = 1;
		/**
		* ## id:130007
		* LV.1 BLOCK Pot
		*/
		PropConst.QUALITY_LV_1_BLOCK_POT = 1;
		/**
		* ## id:130008
		* LV.1 MATK Pot
		*/
		PropConst.QUALITY_LV_1_MATK_POT = 1;
		/**
		* ## id:130009
		* LV.1 MDEF Pot
		*/
		PropConst.QUALITY_LV_1_MDEF_POT = 1;
		/**
		* ## id:130010
		* LV.1 CRIT Pot
		*/
		PropConst.QUALITY_LV_1_CRIT_POT = 1;
		/**
		* ## id:130011
		* LV.1 SPD Pot
		*/
		PropConst.QUALITY_LV_1_SPD_POT = 1;
		/**
		* ## id:130012
		* LV.2 HP Pot
		*/
		PropConst.QUALITY_LV_2_HP_POT = 2;
		/**
		* ## id:130013
		* LV.2 PATK Pot
		*/
		PropConst.QUALITY_LV_2_PATK_POT = 2;
		/**
		* ## id:130014
		* LV.2 PDEF Pot
		*/
		PropConst.QUALITY_LV_2_PDEF_POT = 2;
		/**
		* ## id:130015
		* LV.2 BLOCK Pot
		*/
		PropConst.QUALITY_LV_2_BLOCK_POT = 2;
		/**
		* ## id:130016
		* LV.2 MATK Pot
		*/
		PropConst.QUALITY_LV_2_MATK_POT = 2;
		/**
		* ## id:130017
		* LV.2 MDEF Pot
		*/
		PropConst.QUALITY_LV_2_MDEF_POT = 2;
		/**
		* ## id:130018
		* LV.2 CRIT Pot
		*/
		PropConst.QUALITY_LV_2_CRIT_POT = 2;
		/**
		* ## id:130019
		* LV.2 SPD Pot
		*/
		PropConst.QUALITY_LV_2_SPD_POT = 2;
		/**
		* ## id:130020
		* LV.3 HP Pot
		*/
		PropConst.QUALITY_LV_3_HP_POT = 3;
		/**
		* ## id:130021
		* LV.3 PATK Pot
		*/
		PropConst.QUALITY_LV_3_PATK_POT = 3;
		/**
		* ## id:130022
		* LV.3 PDEF Pot
		*/
		PropConst.QUALITY_LV_3_PDEF_POT = 3;
		/**
		* ## id:130023
		* LV.3 BLOCK Pot
		*/
		PropConst.QUALITY_LV_3_BLOCK_POT = 3;
		/**
		* ## id:130024
		* LV.3 MATK Pot
		*/
		PropConst.QUALITY_LV_3_MATK_POT = 3;
		/**
		* ## id:130025
		* LV.3 MDEF Pot
		*/
		PropConst.QUALITY_LV_3_MDEF_POT = 3;
		/**
		* ## id:130026
		* LV.3 CRIT Pot
		*/
		PropConst.QUALITY_LV_3_CRIT_POT = 3;
		/**
		* ## id:130027
		* LV.3 SPD Pot
		*/
		PropConst.QUALITY_LV_3_SPD_POT = 3;
		/**
		* ## id:130501
		* LV.1 PATK Gem
		*/
		PropConst.QUALITY_LV_1_PATK_GEM = 1;
		/**
		* ## id:130502
		* LV.2 PATK Gem
		*/
		PropConst.QUALITY_LV_2_PATK_GEM = 2;
		/**
		* ## id:130503
		* LV.3 PATK Gem
		*/
		PropConst.QUALITY_LV_3_PATK_GEM = 3;
		/**
		* ## id:130504
		* LV.4 PATK Gem
		*/
		PropConst.QUALITY_LV_4_PATK_GEM = 4;
		/**
		* ## id:130505
		* LV.5 PATK Gem
		*/
		PropConst.QUALITY_LV_5_PATK_GEM = 5;
		/**
		* ## id:130506
		* LV.6 PATK Gem
		*/
		PropConst.QUALITY_LV_6_PATK_GEM = 6;
		/**
		* ## id:130507
		* LV.1 PDEF Gem
		*/
		PropConst.QUALITY_LV_1_PDEF_GEM = 1;
		/**
		* ## id:130508
		* LV.2 PDEF Gem
		*/
		PropConst.QUALITY_LV_2_PDEF_GEM = 2;
		/**
		* ## id:130509
		* LV.3 PDEF Gem
		*/
		PropConst.QUALITY_LV_3_PDEF_GEM = 3;
		/**
		* ## id:130510
		* LV.4 PDEF Gem
		*/
		PropConst.QUALITY_LV_4_PDEF_GEM = 4;
		/**
		* ## id:130511
		* LV.5 PDEF Gem
		*/
		PropConst.QUALITY_LV_5_PDEF_GEM = 5;
		/**
		* ## id:130512
		* LV.6 PDEF Gem
		*/
		PropConst.QUALITY_LV_6_PDEF_GEM = 6;
		/**
		* ## id:130513
		* LV.1 MATK Gem
		*/
		PropConst.QUALITY_LV_1_MATK_GEM = 1;
		/**
		* ## id:130514
		* LV.2 MATK Gem
		*/
		PropConst.QUALITY_LV_2_MATK_GEM = 2;
		/**
		* ## id:130515
		* LV.3 MATK Gem
		*/
		PropConst.QUALITY_LV_3_MATK_GEM = 3;
		/**
		* ## id:130516
		* LV.4 MATK Gem
		*/
		PropConst.QUALITY_LV_4_MATK_GEM = 4;
		/**
		* ## id:130517
		* LV.5 MATK Gem
		*/
		PropConst.QUALITY_LV_5_MATK_GEM = 5;
		/**
		* ## id:130518
		* LV.6 MATK Gem
		*/
		PropConst.QUALITY_LV_6_MATK_GEM = 6;
		/**
		* ## id:130519
		* LV.1 MDEF Gem
		*/
		PropConst.QUALITY_LV_1_MDEF_GEM = 1;
		/**
		* ## id:130520
		* LV.2 MDEF Gem
		*/
		PropConst.QUALITY_LV_2_MDEF_GEM = 2;
		/**
		* ## id:130521
		* LV.3 MDEF Gem
		*/
		PropConst.QUALITY_LV_3_MDEF_GEM = 3;
		/**
		* ## id:130522
		* LV.4 MDEF Gem
		*/
		PropConst.QUALITY_LV_4_MDEF_GEM = 4;
		/**
		* ## id:130523
		* LV.5 MDEF Gem
		*/
		PropConst.QUALITY_LV_5_MDEF_GEM = 5;
		/**
		* ## id:130524
		* LV.6 MDEF Gem
		*/
		PropConst.QUALITY_LV_6_MDEF_GEM = 6;
		/**
		* ## id:130525
		* LV.1 HP Gem
		*/
		PropConst.QUALITY_LV_1_HP_GEM = 1;
		/**
		* ## id:130526
		* LV.2 HP Gem
		*/
		PropConst.QUALITY_LV_2_HP_GEM = 2;
		/**
		* ## id:130527
		* LV.3 HP Gem
		*/
		PropConst.QUALITY_LV_3_HP_GEM = 3;
		/**
		* ## id:130528
		* LV.4 HP Gem
		*/
		PropConst.QUALITY_LV_4_HP_GEM = 4;
		/**
		* ## id:130529
		* LV.5 HP Gem
		*/
		PropConst.QUALITY_LV_5_HP_GEM = 5;
		/**
		* ## id:130530
		* LV.6 HP Gem
		*/
		PropConst.QUALITY_LV_6_HP_GEM = 6;
		/**
		* ## id:130531
		* LV.1 CRIT Gem
		*/
		PropConst.QUALITY_LV_1_CRIT_GEM = 1;
		/**
		* ## id:130532
		* LV.2 CRIT Gem
		*/
		PropConst.QUALITY_LV_2_CRIT_GEM = 2;
		/**
		* ## id:130533
		* LV.3 CRIT Gem
		*/
		PropConst.QUALITY_LV_3_CRIT_GEM = 3;
		/**
		* ## id:130534
		* LV.4 CRIT Gem
		*/
		PropConst.QUALITY_LV_4_CRIT_GEM = 4;
		/**
		* ## id:130535
		* LV.5 CRIT Gem
		*/
		PropConst.QUALITY_LV_5_CRIT_GEM = 5;
		/**
		* ## id:130536
		* LV.6 CRIT Gem
		*/
		PropConst.QUALITY_LV_6_CRIT_GEM = 6;
		/**
		* ## id:130537
		* LV.1 BLOCK Gem
		*/
		PropConst.QUALITY_LV_1_BLOCK_GEM = 1;
		/**
		* ## id:130538
		* LV.2 BLOCK Gem
		*/
		PropConst.QUALITY_LV_2_BLOCK_GEM = 2;
		/**
		* ## id:130539
		* LV.3 BLOCK Gem
		*/
		PropConst.QUALITY_LV_3_BLOCK_GEM = 3;
		/**
		* ## id:130540
		* LV.4 BLOCK Gem
		*/
		PropConst.QUALITY_LV_4_BLOCK_GEM = 4;
		/**
		* ## id:130541
		* LV.5 BLOCK Gem
		*/
		PropConst.QUALITY_LV_5_BLOCK_GEM = 5;
		/**
		* ## id:130542
		* LV.6 BLOCK Gem
		*/
		PropConst.QUALITY_LV_6_BLOCK_GEM = 6;
		/**
		* ## id:130543
		* LV.1 SPD Gem
		*/
		PropConst.QUALITY_LV_1_SPD_GEM = 1;
		/**
		* ## id:130544
		* LV.2 SPD Gem
		*/
		PropConst.QUALITY_LV_2_SPD_GEM = 2;
		/**
		* ## id:130545
		* LV.3 SPD Gem
		*/
		PropConst.QUALITY_LV_3_SPD_GEM = 3;
		/**
		* ## id:130546
		* LV.4 SPD Gem
		*/
		PropConst.QUALITY_LV_4_SPD_GEM = 4;
		/**
		* ## id:130547
		* LV.5 SPD Gem
		*/
		PropConst.QUALITY_LV_5_SPD_GEM = 5;
		/**
		* ## id:130548
		* LV.6 SPD Gem
		*/
		PropConst.QUALITY_LV_6_SPD_GEM = 6;
		/**
		* ## id:130549
		* LV.1 Fury Gem
		*/
		PropConst.QUALITY_LV_1_FURY_GEM = 1;
		/**
		* ## id:130550
		* LV.2 Fury Gem
		*/
		PropConst.QUALITY_LV_2_FURY_GEM = 2;
		/**
		* ## id:130551
		* LV.3 Fury Gem
		*/
		PropConst.QUALITY_LV_3_FURY_GEM = 3;
		/**
		* ## id:130552
		* LV.4 Fury Gem
		*/
		PropConst.QUALITY_LV_4_FURY_GEM = 4;
		/**
		* ## id:130553
		* LV.5 Fury Gem
		*/
		PropConst.QUALITY_LV_5_FURY_GEM = 5;
		/**
		* ## id:130554
		* LV.6 Fury Gem
		*/
		PropConst.QUALITY_LV_6_FURY_GEM = 6;
		/**
		* ## id:130701
		* Diamond Opener
		*/
		PropConst.QUALITY_DIAMOND_OPENER = 4;
		/**
		* ## id:130702
		* Transfer Stone
		*/
		PropConst.QUALITY_TRANSFER_STONE = 4;
		/**
		* ## id:130791
		* Horn(L)
		*/
		PropConst.QUALITY_HORN_L_ = 4;
		/**
		* ## id:130792
		* Horn(S)
		*/
		PropConst.QUALITY_HORN_S_ = 4;
		/**
		* ## id:130801
		* VIP1 Pack
		*/
		PropConst.QUALITY_VIP1_PACK = 5;
		/**
		* ## id:130802
		* VIP2 Pack
		*/
		PropConst.QUALITY_VIP2_PACK = 5;
		/**
		* ## id:130803
		* VIP3 Pack
		*/
		PropConst.QUALITY_VIP3_PACK = 5;
		/**
		* ## id:130804
		* VIP4 Pack
		*/
		PropConst.QUALITY_VIP4_PACK = 5;
		/**
		* ## id:130805
		* VIP5 Pack
		*/
		PropConst.QUALITY_VIP5_PACK = 5;
		/**
		* ## id:130806
		* VIP6 Pack
		*/
		PropConst.QUALITY_VIP6_PACK = 5;
		/**
		* ## id:130807
		* VIP7 Pack
		*/
		PropConst.QUALITY_VIP7_PACK = 5;
		/**
		* ## id:130808
		* VIP8 Pack
		*/
		PropConst.QUALITY_VIP8_PACK = 5;
		/**
		* ## id:130809
		* VIP9 Pack
		*/
		PropConst.QUALITY_VIP9_PACK = 5;
		/**
		* ## id:130810
		* VIP10 Pack
		*/
		PropConst.QUALITY_VIP10_PACK = 5;
		/**
		* ## id:130816
		* LV10 Newbie Pack
		*/
		PropConst.QUALITY_LV10_NEWBIE_PACK = 5;
		/**
		* ## id:130817
		* LV20 Newbie Pack
		*/
		PropConst.QUALITY_LV20_NEWBIE_PACK = 5;
		/**
		* ## id:130818
		* LV30 Newbie Pack
		*/
		PropConst.QUALITY_LV30_NEWBIE_PACK = 5;
		/**
		* ## id:130819
		* LV40 Newbie Pack
		*/
		PropConst.QUALITY_LV40_NEWBIE_PACK = 5;

		return PropConst;
    })();
    xls.PropConst = PropConst;
})(xls || (xls = {}));
var xls;
(function (xls) {
    /**
	 * ##配置表mail.xls 的表宏定义信息.
	 * @author deden-configuration
	*/
    var MailConst = (function () {
		function MailConst() {
		}
		/**
		* ## id:608201
		* Congrats you obtained [#prop_list#] through AFK in Dungeon.
		*/
		MailConst.DUNGEON_AFK = "Congrats you obtained [#prop_list#] through AFK in Dungeon.";
		/**
		* ## id:608202
		* System Mail, don't reply.
		*/
		MailConst.SYSTEM_MAIL = "System Mail, don't reply.";
		/**
		* ## id:608203
		* Congrats you get [#prop_list#] through combining in Arsenal. 
		*/
		MailConst.ARSENAL = "Congrats you get [#prop_list#] through combining in Arsenal. ";
		/**
		* ## id:608204
		* Congrats you obtained [#prop_list#] through AFK in Trial Tower.
		*/
		MailConst.TRIAL_TOWE_AFK = "Congrats you obtained [#prop_list#] through AFK in Trial Tower.";
		/**
		* ## id:608205
		* Congrats you obtained [#prop_list#] in Guild Battle.
		*/
		MailConst.REWARDS_FOR_GUILD_BATTLE = "Congrats you obtained [#prop_list#] in Guild Battle.";
		/**
		* ## id:608206
		* Congrats you obtained following rewards in Battle of Gods：#prop_list#
		*/
		MailConst.RANKING_REWARDS_IN_BATTLE_OF_GODS = "Congrats you obtained following rewards in Battle of Gods：#prop_list#";
		/**
		* ## id:608207
		* Congrats you finished Escort,obtained #prop_list#
		*/
		MailConst.ESCORT_REWARDS = "Congrats you finished Escort,obtained #prop_list#";
		/**
		* ## id:608208
		* Congrats you get [#prop_list#] for newbie rewards.
		*/
		MailConst.NEWBIE_LOGIN_REWARDS = "Congrats you get [#prop_list#] for newbie rewards.";
		/**
		* ## id:608209
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		MailConst.DUNGEON_S_LOOT = "Congrats you obtained [#prop_list#] in Dungeon.";
		/**
		* ## id:608210
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		MailConst.REWARDS_FROM_DUNGEON = "Congrats you obtained [#prop_list#] in Dungeon.";
		/**
		* ## id:608211
		* Congrats you obtained [#prop_list#] in Dungeon.
		*/
		MailConst.REWARDS_FROM_UNITY_GATE = "Congrats you obtained [#prop_list#] in Dungeon.";
		/**
		* ## id:608212
		* Congrats you obtained [#prop_list#] in Crystal Altar.
		*/
		MailConst.CRYSTAL_ALTAR_S_LOOT = "Congrats you obtained [#prop_list#] in Crystal Altar.";
		/**
		* ## id:608213
		* Congrats you obtained [#prop_list#] in Trial Tower.
		*/
		MailConst.TRIAL_TOWE_S_LOOT = "Congrats you obtained [#prop_list#] in Trial Tower.";
		/**
		* ## id:608215
		* Guild Master [#Player_Name#] is offline 7 days. The Guild Master will be automatically transferred when offline for more than 10 days.
		* 1.The Vice Guild Master who has logged on in the past 3 days will be the default candidate for new Guild Master.If no one qualifies, players holding the next highest position will be considered.
		* 2.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, and the candidate with the most votes will be the new guild master.
		* 3.If the Guild Master returns during voting, transfer procedures will be rendered invalid.
		*/
		MailConst.GUILD_MASTER_TRANSFER = "Guild Master [#Player_Name#] is offline 7 days. The Guild Master will be automatically transferred when offline for more than 10 days.\n1.The Vice Guild Master who has logged on in the past 3 days will be the default candidate for new Guild Master.If no one qualifies, players holding the next highest position will be considered.\n2.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, and the candidate with the most votes will be the new guild master.\n3.If the Guild Master returns during voting, transfer procedures will be rendered invalid.";
		/**
		* ## id:608216
		* Guild Master [#Player_Name#] is offline 15 days. Guild Master transfer to [#Player_Name#], congrats to him/her.
		*/
		MailConst.NEW_GUILD_MASTER = "Guild Master [#Player_Name#] is offline 15 days. Guild Master transfer to [#Player_Name#], congrats to him/her.";
		/**
		* ## id:608217
		* Guild Master [#Player_Name#] is offline 10 days, candidates is expecting for your vote. You can click “Election” in Guild to vote.
		* 1.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, candidate with the most votes will be the new guild master.
		* 2.If the guild master returns during voting, transfer procedures will be rendered invalid.
		*/
		MailConst.GUILD_MASTER_ELECTION = "Guild Master [#Player_Name#] is offline 10 days, candidates is expecting for your vote. You can click “Election” in Guild to vote.\n1.Players with at least 100 Guild Contribution are allowed to vote. Voting lasts for 3 days, candidate with the most votes will be the new guild master.\n2.If the guild master returns during voting, transfer procedures will be rendered invalid.";
		/**
		* ## id:608218
		* The Guild Master [#Player_Name#] returns during voting, transfer procedures will be rendered invalid.
		*/
		MailConst.GUILD_MASTER_RETURNS_ = "The Guild Master [#Player_Name#] returns during voting, transfer procedures will be rendered invalid.";
		/**
		* ## id:608219
		* All members in [#guild_name#] didn't login in 90 days, your guild dismissed.
		*/
		MailConst.GUILD_DISMISSED = "All members in [#guild_name#] didn't login in 90 days, your guild dismissed.";
		/**
		* ## id:608220
		* Congrats you gaind [#prop_list#] as login rewards.
		*/
		MailConst.LOGIN_REWARDS = "Congrats you gaind [#prop_list#] as login rewards.";
		/**
		* ## id:608221
		* Congrats you obtained [#prop_list#] in Beast Shooting.
		*/
		MailConst.REWARDS_FOR_BEAST_SHOOTING = "Congrats you obtained [#prop_list#] in Beast Shooting.";
		/**
		* ## id:608222
		* Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 20:00 everyday. Wish you have fun in game.
		*/
		MailConst.ONLINE_REWARDS_AT_20_00_EVERYDAY_ = "Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 20:00 everyday. Wish you have fun in game.";
		/**
		* ## id:608223
		* Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 21:00 everyday. Wish you have fun in game.
		*/
		MailConst.ONLINE_REWARDS_AT_21_00_EVERYDAY_ = "Dear Lord：\nCongrats you obtained the online rewards.\nBetween September 6th and September 8th, we prepare abundant online giftpack for you. You can get it as long as you are online at 21:00 everyday. Wish you have fun in game.";
		/**
		* ## id:608224
		* You've made outstanding contribution in Ideas March, you're the 1st, rewarded [#prop_list#]
		*/
		MailConst.REWARDS_FROM_IDEAS_OF_MARCH = "You've made outstanding contribution in Ideas March, you're the 1st, rewarded [#prop_list#]";
		/**
		* ## id:608228
		* Congrat you reach to Floor[#n_floor#] in the Trial Tower, obtained the gorgeous rewards.
		*/
		MailConst.CLEARANCE_REWARDS_FOR_THE_TRIAL_TOWER = "Congrat you reach to Floor[#n_floor#] in the Trial Tower, obtained the gorgeous rewards.";
		/**
		* ## id:608229
		* All rewards have been sent to you via the mail as your inventory is full, please sort your inventory as soon as possible.
		*/
		MailConst.CLAIM_REWARDS_ = "All rewards have been sent to you via the mail as your inventory is full, please sort your inventory as soon as possible.";
		/**
		* ## id:608233
		* You gave the last hit of the Guard in Honor&amp;Glory, rewarded [#prop_list#]
		*/
		MailConst.REWARDS_OF_LAST_HIT = "You gave the last hit of the Guard in Honor&amp;Glory, rewarded [#prop_list#]";
		/**
		* ## id:608234
		* Congrats you obtained [#prop_list#] in Honor&amp;Glory.
		*/
		MailConst.REWARDS_FOR_HONOR_AMP_GLORY = "Congrats you obtained [#prop_list#] in Honor&amp;Glory.";
		/**
		* ## id:608235
		* Congrats you got guard rewards in Honor&amp;Glory,rewarded [#prop_list#]
		*/
		MailConst.REWARDS_FROM_HONOR_AMP_GLORY = "Congrats you got guard rewards in Honor&amp;Glory,rewarded [#prop_list#]";
		/**
		* ## id:608236
		* Congrats you got [#prop_list#] in Ancient Treasure.
		*/
		MailConst.TREASURE_REWARDS = "Congrats you got [#prop_list#] in Ancient Treasure.";
		/**
		* ## id:608238
		* You gave the final blow to the Boss in World Boss, rewarded [#prop_list#]
		*/
		MailConst.REWARDS_OF_LAST_HIT_IN_WORLD_BOSS = "You gave the final blow to the Boss in World Boss, rewarded [#prop_list#]";
		/**
		* ## id:608239
		* Congrats you obtained [#prop_list#] in World Boss.
		*/
		MailConst.REWARDS_FROM_WORLD_BOSS = "Congrats you obtained [#prop_list#] in World Boss.";
		/**
		* ## id:608240
		* Your rewards were sent via the mail as your inventory is full, please sort as soon as possible.
		*/
		MailConst.YOUR_INVENTORY_IS_FULL = "Your rewards were sent via the mail as your inventory is full, please sort as soon as possible.";
		/**
		* ## id:608241
		* Dear Warrior，\nYour guild receives a bye in the group stage of Dragon Hegemony, and you will receive the following rewards.
		*/
		MailConst.BYE_REWARDS = "Dear Warrior，\nYour guild receives a bye in the group stage of Dragon Hegemony, and you will receive the following rewards.";
		/**
		* ## id:608242
		* Dear Player，\nYour guild will fight against [#guild_name#] at 20:00 tonight, it&apos;s your time to shine!
		*/
		MailConst.DRAGON_HEGEMONY_NOTICE = "Dear Player，\nYour guild will fight against [#guild_name#] at 20:00 tonight, it&apos;s your time to shine!";
		/**
		* ## id:608243
		* Dear Warrior,\nCongrats on getting the rewards in Dragon Hegemony：[#prop_list#].
		*/
		MailConst.DRAGON_HEGEMONY_REWARDS = "Dear Warrior,\nCongrats on getting the rewards in Dragon Hegemony：[#prop_list#].";
		/**
		* ## id:608244
		* Distinguished Hero,\nCongrats on getting #Rank#th place in Gods'Glory.You have won awesome rewards!
		*/
		MailConst.GODS_GLORY_REWARDS = "Distinguished Hero,\nCongrats on getting #Rank#th place in Gods'Glory.You have won awesome rewards!";
		/**
		* ## id:608245
		* Distinguished Hero,\nCongrats you obtained Group Completion Rewards in Cross-Server Arena.
		*/
		MailConst.GROUP_COMPLETION_REWARDS = "Distinguished Hero,\nCongrats you obtained Group Completion Rewards in Cross-Server Arena.";

		return MailConst;
    })();
    xls.MailConst = MailConst;
})(xls || (xls = {}));

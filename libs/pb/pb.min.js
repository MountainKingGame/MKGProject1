var $protobuf = protobuf;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pb = (function() {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    var pb = {};

    /**
     * cmd enum.
     * @enum {string}
     * @property {number} None=0 None value
     * @property {number} ConnectSuccess=101 ConnectSuccess value
     * @property {number} ConnectException=102 ConnectException value
     * @property {number} ConnectBreak=103 ConnectBreak value
     * @property {number} ConnectFailure=104 ConnectFailure value
     * @property {number} CommonMsg=1000 CommonMsg value
     * @property {number} BattleEnter=5001 BattleEnter value
     * @property {number} BattleTankMove=5002 BattleTankMove value
     */
    pb.cmd = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "None"] = 0;
        values[valuesById[101] = "ConnectSuccess"] = 101;
        values[valuesById[102] = "ConnectException"] = 102;
        values[valuesById[103] = "ConnectBreak"] = 103;
        values[valuesById[104] = "ConnectFailure"] = 104;
        values[valuesById[1000] = "CommonMsg"] = 1000;
        values[valuesById[5001] = "BattleEnter"] = 5001;
        values[valuesById[5002] = "BattleTankMove"] = 5002;
        return values;
    })();

    pb.Login = (function() {

        /**
         * Properties of a Login.
         * @memberof pb
         * @interface ILogin
         * @property {string} account Login account
         * @property {string} password Login password
         */

        /**
         * Constructs a new Login.
         * @memberof pb
         * @classdesc Represents a Login.
         * @constructor
         * @param {pb.ILogin=} [properties] Properties to set
         */
        function Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login account.
         * @member {string}account
         * @memberof pb.Login
         * @instance
         */
        Login.prototype.account = "";

        /**
         * Login password.
         * @member {string}password
         * @memberof pb.Login
         * @instance
         */
        Login.prototype.password = "";

        /**
         * Creates a new Login instance using the specified properties.
         * @function create
         * @memberof pb.Login
         * @static
         * @param {pb.ILogin=} [properties] Properties to set
         * @returns {pb.Login} Login instance
         */
        Login.create = function create(properties) {
            return new Login(properties);
        };

        /**
         * Encodes the specified Login message. Does not implicitly {@link pb.Login.verify|verify} messages.
         * @function encode
         * @memberof pb.Login
         * @static
         * @param {pb.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            return writer;
        };

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link pb.Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Login
         * @static
         * @param {pb.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.password = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("account"))
                throw $util.ProtocolError("missing required 'account'", { instance: message });
            if (!message.hasOwnProperty("password"))
                throw $util.ProtocolError("missing required 'password'", { instance: message });
            return message;
        };

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login message.
         * @function verify
         * @memberof pb.Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.account))
                return "account: string expected";
            if (!$util.isString(message.password))
                return "password: string expected";
            return null;
        };

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Login} Login
         */
        Login.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Login)
                return object;
            var message = new $root.pb.Login();
            if (object.account != null)
                message.account = String(object.account);
            if (object.password != null)
                message.password = String(object.password);
            return message;
        };

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Login
         * @static
         * @param {pb.Login} message Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.password = "";
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            return object;
        };

        /**
         * Converts this Login to JSON.
         * @function toJSON
         * @memberof pb.Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login;
    })();

    pb.CreateRole = (function() {

        /**
         * Properties of a CreateRole.
         * @memberof pb
         * @interface ICreateRole
         * @property {string} name CreateRole name
         * @property {number} sex CreateRole sex
         */

        /**
         * Constructs a new CreateRole.
         * @memberof pb
         * @classdesc Represents a CreateRole.
         * @constructor
         * @param {pb.ICreateRole=} [properties] Properties to set
         */
        function CreateRole(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateRole name.
         * @member {string}name
         * @memberof pb.CreateRole
         * @instance
         */
        CreateRole.prototype.name = "";

        /**
         * CreateRole sex.
         * @member {number}sex
         * @memberof pb.CreateRole
         * @instance
         */
        CreateRole.prototype.sex = 0;

        /**
         * Creates a new CreateRole instance using the specified properties.
         * @function create
         * @memberof pb.CreateRole
         * @static
         * @param {pb.ICreateRole=} [properties] Properties to set
         * @returns {pb.CreateRole} CreateRole instance
         */
        CreateRole.create = function create(properties) {
            return new CreateRole(properties);
        };

        /**
         * Encodes the specified CreateRole message. Does not implicitly {@link pb.CreateRole.verify|verify} messages.
         * @function encode
         * @memberof pb.CreateRole
         * @static
         * @param {pb.ICreateRole} message CreateRole message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRole.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sex);
            return writer;
        };

        /**
         * Encodes the specified CreateRole message, length delimited. Does not implicitly {@link pb.CreateRole.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CreateRole
         * @static
         * @param {pb.ICreateRole} message CreateRole message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateRole.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateRole message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CreateRole
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CreateRole} CreateRole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRole.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CreateRole();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.sex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("sex"))
                throw $util.ProtocolError("missing required 'sex'", { instance: message });
            return message;
        };

        /**
         * Decodes a CreateRole message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CreateRole
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CreateRole} CreateRole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateRole.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateRole message.
         * @function verify
         * @memberof pb.CreateRole
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateRole.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isInteger(message.sex))
                return "sex: integer expected";
            return null;
        };

        /**
         * Creates a CreateRole message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CreateRole
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CreateRole} CreateRole
         */
        CreateRole.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CreateRole)
                return object;
            var message = new $root.pb.CreateRole();
            if (object.name != null)
                message.name = String(object.name);
            if (object.sex != null)
                message.sex = object.sex | 0;
            return message;
        };

        /**
         * Creates a plain object from a CreateRole message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CreateRole
         * @static
         * @param {pb.CreateRole} message CreateRole
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateRole.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.sex = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.sex != null && message.hasOwnProperty("sex"))
                object.sex = message.sex;
            return object;
        };

        /**
         * Converts this CreateRole to JSON.
         * @function toJSON
         * @memberof pb.CreateRole
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateRole.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateRole;
    })();

    return pb;
})();
pb = $root.pb
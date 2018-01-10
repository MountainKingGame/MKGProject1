import $protobuf = protobuf;

/** Namespace pb. */
declare module pb {

    /** cmd enum. */
    enum cmd {
        None = 0,
        ConnectSuccess = 101,
        ConnectException = 102,
        ConnectBreak = 103,
        ConnectFailure = 104,
        CommonMsg = 1000,
        BattleEnter = 5001,
        BattleTankMove = 5002
    }

    /** Properties of a Login. */
    interface ILogin {

        /** Login account */
        account: string;

        /** Login password */
        password: string;
    }

    /** Represents a Login. */
    class Login {

        /**
         * Constructs a new Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ILogin);

        /** Login account. */
        public account: string;

        /** Login password. */
        public password: string;

        /**
         * Creates a new Login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login instance
         */
        public static create(properties?: pb.ILogin): pb.Login;

        /**
         * Encodes the specified Login message. Does not implicitly {@link pb.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link pb.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Login;

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Login;

        /**
         * Verifies a Login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Login
         */
        public static fromObject(object: { [k: string]: any }): pb.Login;

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @param message Login
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Login, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Login to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateRole. */
    interface ICreateRole {

        /** CreateRole name */
        name: string;

        /** CreateRole sex */
        sex: number;
    }

    /** Represents a CreateRole. */
    class CreateRole {

        /**
         * Constructs a new CreateRole.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICreateRole);

        /** CreateRole name. */
        public name: string;

        /** CreateRole sex. */
        public sex: number;

        /**
         * Creates a new CreateRole instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateRole instance
         */
        public static create(properties?: pb.ICreateRole): pb.CreateRole;

        /**
         * Encodes the specified CreateRole message. Does not implicitly {@link pb.CreateRole.verify|verify} messages.
         * @param message CreateRole message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICreateRole, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateRole message, length delimited. Does not implicitly {@link pb.CreateRole.verify|verify} messages.
         * @param message CreateRole message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICreateRole, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateRole message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateRole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CreateRole;

        /**
         * Decodes a CreateRole message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateRole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CreateRole;

        /**
         * Verifies a CreateRole message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateRole message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateRole
         */
        public static fromObject(object: { [k: string]: any }): pb.CreateRole;

        /**
         * Creates a plain object from a CreateRole message. Also converts values to other types if specified.
         * @param message CreateRole
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CreateRole, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateRole to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

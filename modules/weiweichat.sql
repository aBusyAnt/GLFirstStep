ALTER TABLE "kanjia_config" DROP CONSTRAINT "kanjia_config_wx_mp_id_fkey";
ALTER TABLE "kanjia_record" DROP CONSTRAINT "kanjia_record_kanjia_config_id_fkey";
ALTER TABLE "kanjia_record" DROP CONSTRAINT "kanjia_record_kanjia_user_id_fkey";
ALTER TABLE "kanjia_user" DROP CONSTRAINT "fk_kanjia_user_wx_user_idx";
ALTER TABLE "kanjia_user" DROP CONSTRAINT "fk_kanjia_user_kanjia_config_idx";
ALTER TABLE "wx_user" DROP CONSTRAINT "fk_wx_user_wx_mp_idx";
ALTER TABLE "wx_user_group" DROP CONSTRAINT "fk_wx_user_group_wx_mp_idx";
ALTER TABLE "wx_user_group" DROP CONSTRAINT "fk_wx_user_group_wx_user_idx";
ALTER TABLE "wx_user" DROP CONSTRAINT "fk_wx_user_account_1";
ALTER TABLE "admin" DROP CONSTRAINT "fk_admin_admin_role_1";
ALTER TABLE "admin_permissions" DROP CONSTRAINT "fk_admin_permissions_admin_role_1";

ALTER TABLE "account" DROP CONSTRAINT "account_mobile_key";
ALTER TABLE "account"DROP CONSTRAINT "account_pkey";
ALTER TABLE "kanjia_config" DROP CONSTRAINT "price_check";
ALTER TABLE "kanjia_config"DROP CONSTRAINT "kanjia_config_pkey";
ALTER TABLE "kanjia_record" DROP CONSTRAINT "kanjia_record_discount_check";
ALTER TABLE "kanjia_record"DROP CONSTRAINT "kanjia_record_pkey";
ALTER TABLE "kanjia_user" DROP CONSTRAINT "price_check";
ALTER TABLE "kanjia_user"DROP CONSTRAINT "kanjia_user_pkey";
ALTER TABLE "session"DROP CONSTRAINT "session_pkey";
ALTER TABLE "wx_mp"DROP CONSTRAINT "wx_mp_pkey";
ALTER TABLE "wx_user" DROP CONSTRAINT "wx_user_sex_check";
ALTER TABLE "wx_user"DROP CONSTRAINT "wx_user_pkey";
ALTER TABLE "wx_user_group"DROP CONSTRAINT "wx_user_group_pkey";

DROP TABLE "admin";
DROP TABLE "account";
DROP TABLE "kanjia_config";
DROP TABLE "kanjia_record";
DROP TABLE "kanjia_user";
DROP TABLE "session";
DROP TABLE "wx_mp";
DROP TABLE "wx_user";
DROP TABLE "wx_user_group";
DROP TABLE "admin_role";
DROP TABLE "admin_permissions";

CREATE TABLE "admin" (
"id" int4 NOT NULL DEFAULT nextval('admin_id_seq'::regclass),
"name" varchar(255) NOT NULL,
"password" varchar(255) NOT NULL,
"date_created" timestamp(0) NOT NULL,
"role_id" int4 NOT NULL,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "account" (
"id" int4 NOT NULL DEFAULT nextval('account_id_seq'::regclass),
"mobile" varchar(11) COLLATE "default",
"username" varchar(30) COLLATE "default",
"password" varchar(255) COLLATE "default",
"date_created" timestamp(6),
CONSTRAINT "account_pkey" PRIMARY KEY ("id") ,
CONSTRAINT "account_mobile_key" UNIQUE ("mobile")
)
WITHOUT OIDS;

ALTER TABLE "account" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "kanjia_config" (
"id" int4 NOT NULL DEFAULT nextval('kanjia_config_id_seq'::regclass),
"promotion_name" varchar(255) COLLATE "default" NOT NULL,
"product_name" varchar(255) COLLATE "default" NOT NULL,
"price" numeric(10,2) NOT NULL,
"share_icon_url" varchar(255) COLLATE "default",
"share_title" varchar(255) COLLATE "default",
"share_summary" varchar(1024) COLLATE "default",
"kanjia_range" numeric(10,2) NOT NULL,
"online_date" timestamp(6) NOT NULL,
"offline_date" timestamp(6) NOT NULL,
"html_template" varchar(255) COLLATE "default" NOT NULL,
"wx_mp_id" int4 NOT NULL,
CONSTRAINT "kanjia_config_pkey" PRIMARY KEY ("id") ,
CONSTRAINT "price_check" CHECK (((price > (0)::numeric) AND (kanjia_range > (0)::numeric)))
)
WITHOUT OIDS;

ALTER TABLE "kanjia_config" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "kanjia_record" (
"id" int4 NOT NULL DEFAULT nextval('kanjia_record_id_seq'::regclass),
"kanjia_config_id" int4 NOT NULL,
"kanjia_user_id" int4 NOT NULL,
"discount" numeric(10,2),
"date_created" timestamp(6),
CONSTRAINT "kanjia_record_pkey" PRIMARY KEY ("id") ,
CONSTRAINT "kanjia_record_discount_check" CHECK ((discount >= (0)::numeric))
)
WITHOUT OIDS;

ALTER TABLE "kanjia_record" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "kanjia_user" (
"id" int4 NOT NULL DEFAULT nextval('kanjia_user_id_seq'::regclass),
"kanjia_config_id" int4 NOT NULL,
"wx_user_id" int4 NOT NULL,
"price" numeric(10,2),
"date_created" timestamp(6),
CONSTRAINT "kanjia_user_pkey" PRIMARY KEY ("id") ,
CONSTRAINT "price_check" CHECK ((price >= (0)::numeric))
)
WITHOUT OIDS;

ALTER TABLE "kanjia_user" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "session" (
"sid" varchar COLLATE "default" NOT NULL,
"sess" json NOT NULL,
"expire" timestamp(6) NOT NULL,
CONSTRAINT "session_pkey" PRIMARY KEY ("sid") 
)
WITHOUT OIDS;

ALTER TABLE "session" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "wx_mp" (
"id" int4 NOT NULL DEFAULT nextval('wx_mp_id_seq'::regclass),
"alias" varchar(255) COLLATE "default",
"appid" varchar(255) COLLATE "default" NOT NULL,
"app_secret" varchar(255) COLLATE "default" NOT NULL,
"token" varchar(255) COLLATE "default" NOT NULL,
"encoding_key" varchar(255) COLLATE "default",
"wx_id" varchar(255) COLLATE "default",
"wx_name" varchar(255) COLLATE "default",
"qrcode_url" varchar(1024) COLLATE "default",
CONSTRAINT "wx_mp_pkey" PRIMARY KEY ("id") 
)
WITHOUT OIDS;

ALTER TABLE "wx_mp" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "wx_user" (
"openid" varchar(255) COLLATE "default" NOT NULL,
"nickname" varchar(255) COLLATE "default",
"sex" int4,
"wx_avatar_url" varchar(255) COLLATE "default",
"subscribe_time" timestamp(6),
"remark" varchar(30) COLLATE "default",
"unionid" varchar(255) COLLATE "default",
"wx_mp_id" int4 NOT NULL,
"id" int4 NOT NULL DEFAULT nextval('wx_user_id_seq'::regclass),
"account_id" int4 NOT NULL,
CONSTRAINT "wx_user_pkey" PRIMARY KEY ("id") ,
CONSTRAINT "wx_user_sex_check" CHECK ((sex = ANY (ARRAY[0, 1])))
)
WITHOUT OIDS;

ALTER TABLE "wx_user" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "wx_user_group" (
"wx_mp_id" int4 NOT NULL,
"group_id" int4,
"group_name" varchar(30) COLLATE "default",
"id" int4 NOT NULL DEFAULT nextval('wx_user_group_id_seq'::regclass),
"wx_user_id" int4 NOT NULL,
CONSTRAINT "wx_user_group_pkey" PRIMARY KEY ("id") 
)
WITHOUT OIDS;

ALTER TABLE "wx_user_group" OWNER TO "hckhrpuzpwtqkp";

CREATE TABLE "admin_role" (
"id" int4 NOT NULL DEFAULT nextval('admin_role_id_seq'::regclass),
"name" varchar(255) NOT NULL,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

CREATE TABLE "admin_permissions" (
"id" int4 NOT NULL DEFAULT nextval('admin_permissions_id_seq'::regclass),
"role_id" int4 NOT NULL,
"name" varchar(255) NOT NULL,
"uri" varchar(255) NOT NULL,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;


ALTER TABLE "kanjia_config" ADD CONSTRAINT "kanjia_config_wx_mp_id_fkey" FOREIGN KEY ("wx_mp_id") REFERENCES "wx_mp" ("id") ON UPDATE NO ACTION;
ALTER TABLE "kanjia_record" ADD CONSTRAINT "kanjia_record_kanjia_config_id_fkey" FOREIGN KEY ("kanjia_config_id") REFERENCES "kanjia_config" ("id") ON UPDATE NO ACTION;
ALTER TABLE "kanjia_record" ADD CONSTRAINT "kanjia_record_kanjia_user_id_fkey" FOREIGN KEY ("kanjia_user_id") REFERENCES "kanjia_user" ("id") ON UPDATE NO ACTION;
ALTER TABLE "kanjia_user" ADD CONSTRAINT "fk_kanjia_user_wx_user_idx" FOREIGN KEY ("wx_user_id") REFERENCES "wx_user" ("id") ON UPDATE NO ACTION;
ALTER TABLE "kanjia_user" ADD CONSTRAINT "fk_kanjia_user_kanjia_config_idx" FOREIGN KEY ("kanjia_config_id") REFERENCES "kanjia_config" ("id") ON UPDATE NO ACTION;
ALTER TABLE "wx_user" ADD CONSTRAINT "fk_wx_user_wx_mp_idx" FOREIGN KEY ("wx_mp_id") REFERENCES "wx_mp" ("id") ON UPDATE NO ACTION;
ALTER TABLE "wx_user_group" ADD CONSTRAINT "fk_wx_user_group_wx_mp_idx" FOREIGN KEY ("wx_mp_id") REFERENCES "wx_mp" ("id") ON UPDATE NO ACTION;
ALTER TABLE "wx_user_group" ADD CONSTRAINT "fk_wx_user_group_wx_user_idx" FOREIGN KEY ("wx_user_id") REFERENCES "wx_user" ("id") ON UPDATE NO ACTION;
ALTER TABLE "wx_user" ADD CONSTRAINT "fk_wx_user_account_1" FOREIGN KEY ("account_id") REFERENCES "account" ("id");
ALTER TABLE "admin" ADD CONSTRAINT "fk_admin_admin_role_1" FOREIGN KEY ("role_id") REFERENCES "admin_role" ("id");
ALTER TABLE "admin_permissions" ADD CONSTRAINT "fk_admin_permissions_admin_role_1" FOREIGN KEY ("role_id") REFERENCES "admin_role" ("id");


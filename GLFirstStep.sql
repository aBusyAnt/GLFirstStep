/*
Navicat PGSQL Data Transfer

Source Database       : study1234
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90408
File Encoding         : 65001

Date: 2017-03-15 11:10:58
*/


-- ----------------------------
-- Sequence structure for admin_roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."admin_roles_id_seq";
CREATE SEQUENCE "public"."admin_roles_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 2
 CACHE 1;
SELECT setval('"public"."admin_roles_id_seq"', 2, true);

-- ----------------------------
-- Sequence structure for admins_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."admins_id_seq";
CREATE SEQUENCE "public"."admins_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;
SELECT setval('"public"."admins_id_seq"', 1, true);

-- ----------------------------
-- Sequence structure for redirect_urls_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."redirect_urls_id_seq";
CREATE SEQUENCE "public"."redirect_urls_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 52
 CACHE 1;
SELECT setval('"public"."redirect_urls_id_seq"', 52, true);

-- ----------------------------
-- Sequence structure for study_article_browserecords_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_article_browserecords_id_seq";
CREATE SEQUENCE "public"."study_article_browserecords_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 5146
 CACHE 1;
SELECT setval('"public"."study_article_browserecords_id_seq"', 5146, true);

-- ----------------------------
-- Sequence structure for study_article_comments_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_article_comments_id_seq";
CREATE SEQUENCE "public"."study_article_comments_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for study_article_tags_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_article_tags_id_seq";
CREATE SEQUENCE "public"."study_article_tags_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 7
 CACHE 1;
SELECT setval('"public"."study_article_tags_id_seq"', 7, true);

-- ----------------------------
-- Sequence structure for study_articles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_articles_id_seq";
CREATE SEQUENCE "public"."study_articles_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 61
 CACHE 1;
SELECT setval('"public"."study_articles_id_seq"', 61, true);

-- ----------------------------
-- Sequence structure for study_book_categories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_book_categories_id_seq";
CREATE SEQUENCE "public"."study_book_categories_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 7
 CACHE 1;
SELECT setval('"public"."study_book_categories_id_seq"', 7, true);

-- ----------------------------
-- Sequence structure for study_book_records_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_book_records_id_seq";
CREATE SEQUENCE "public"."study_book_records_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 186
 CACHE 1;
SELECT setval('"public"."study_book_records_id_seq"', 186, true);

-- ----------------------------
-- Sequence structure for study_books_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_books_id_seq";
CREATE SEQUENCE "public"."study_books_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 17
 CACHE 1;
SELECT setval('"public"."study_books_id_seq"', 17, true);

-- ----------------------------
-- Sequence structure for study_course_categories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_course_categories_id_seq";
CREATE SEQUENCE "public"."study_course_categories_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 8
 CACHE 1;
SELECT setval('"public"."study_course_categories_id_seq"', 8, true);

-- ----------------------------
-- Sequence structure for study_course_content_records_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_course_content_records_id_seq";
CREATE SEQUENCE "public"."study_course_content_records_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for study_course_contents_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_course_contents_id_seq";
CREATE SEQUENCE "public"."study_course_contents_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 44
 CACHE 1;
SELECT setval('"public"."study_course_contents_id_seq"', 44, true);

-- ----------------------------
-- Sequence structure for study_course_members_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_course_members_id_seq";
CREATE SEQUENCE "public"."study_course_members_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Sequence structure for study_courses_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_courses_id_seq";
CREATE SEQUENCE "public"."study_courses_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 7
 CACHE 1;
SELECT setval('"public"."study_courses_id_seq"', 7, true);

-- ----------------------------
-- Sequence structure for study_f_article_tags_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_f_article_tags_id_seq";
CREATE SEQUENCE "public"."study_f_article_tags_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 70
 CACHE 1;
SELECT setval('"public"."study_f_article_tags_id_seq"', 70, true);

-- ----------------------------
-- Sequence structure for study_users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."study_users_id_seq";
CREATE SEQUENCE "public"."study_users_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;
SELECT setval('"public"."study_users_id_seq"', 1, true);

-- ----------------------------
-- Table structure for admin_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."admin_roles";
CREATE TABLE "public"."admin_roles" (
"id" int4 DEFAULT nextval('admin_roles_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"number" int4,
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS "public"."admins";
CREATE TABLE "public"."admins" (
"id" int4 DEFAULT nextval('admins_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"password" varchar(255) COLLATE "default",
"nickname" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"admin_role_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for redirect_urls
-- ----------------------------
DROP TABLE IF EXISTS "public"."redirect_urls";
CREATE TABLE "public"."redirect_urls" (
"id" int4 DEFAULT nextval('redirect_urls_id_seq'::regclass) NOT NULL,
"redirect_url" varchar(255) COLLATE "default",
"original_url" varchar(255) COLLATE "default",
"access_number" int4,
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for session
-- ----------------------------
DROP TABLE IF EXISTS "public"."session";
CREATE TABLE "public"."session" (
"sid" varchar COLLATE "default" NOT NULL,
"sess" json NOT NULL,
"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_article_browserecords
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_article_browserecords";
CREATE TABLE "public"."study_article_browserecords" (
"id" int4 DEFAULT nextval('study_article_browserecords_id_seq'::regclass) NOT NULL,
"remote_address" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"article_id" int4,
"user_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_article_comments
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_article_comments";
CREATE TABLE "public"."study_article_comments" (
"id" int4 DEFAULT nextval('study_article_comments_id_seq'::regclass) NOT NULL,
"markdown" text COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"comment_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_article_tags
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_article_tags";
CREATE TABLE "public"."study_article_tags" (
"id" int4 DEFAULT nextval('study_article_tags_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_articles
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_articles";
CREATE TABLE "public"."study_articles" (
"id" int4 DEFAULT nextval('study_articles_id_seq'::regclass) NOT NULL,
"title" varchar(255) COLLATE "default",
"markdown" text COLLATE "default",
"cover_url" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"author_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_book_categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_book_categories";
CREATE TABLE "public"."study_book_categories" (
"id" int4 DEFAULT nextval('study_book_categories_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"number" int4,
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_book_records
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_book_records";
CREATE TABLE "public"."study_book_records" (
"id" int4 DEFAULT nextval('study_book_records_id_seq'::regclass) NOT NULL,
"op" "public"."enum_study_book_records_op",
"remote_address" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"study_book_id" int4,
"study_user_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_books
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_books";
CREATE TABLE "public"."study_books" (
"id" int4 DEFAULT nextval('study_books_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"summary" text COLLATE "default",
"cover_url" varchar(255) COLLATE "default",
"download_url" varchar(1024) COLLATE "default",
"download_remark" varchar(255) COLLATE "default",
"markdown" text COLLATE "default",
"visit_number" int4 DEFAULT 0,
"download_number" int4 DEFAULT 0,
"publishing_house" varchar(255) COLLATE "default",
"publishing_date" timestamptz(6),
"douban_rate" numeric(10,2) DEFAULT 0,
"buy_url" varchar(1024) COLLATE "default",
"buy_remark" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"book_category_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_course_categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_course_categories";
CREATE TABLE "public"."study_course_categories" (
"id" int4 DEFAULT nextval('study_course_categories_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_course_content_records
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_course_content_records";
CREATE TABLE "public"."study_course_content_records" (
"id" int4 DEFAULT nextval('study_course_content_records_id_seq'::regclass) NOT NULL,
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"user_id" int4,
"course_content_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_course_contents
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_course_contents";
CREATE TABLE "public"."study_course_contents" (
"id" int4 DEFAULT nextval('study_course_contents_id_seq'::regclass) NOT NULL,
"title" varchar(255) COLLATE "default",
"description" varchar(2048) COLLATE "default",
"sequence" int4,
"duration" int4,
"video_url" varchar(1024) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"section_id" int4,
"course_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_course_members
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_course_members";
CREATE TABLE "public"."study_course_members" (
"id" int4 DEFAULT nextval('study_course_members_id_seq'::regclass) NOT NULL,
"content_id" int4,
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"user_id" int4,
"course_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_courses
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_courses";
CREATE TABLE "public"."study_courses" (
"id" int4 DEFAULT nextval('study_courses_id_seq'::regclass) NOT NULL,
"title" varchar(255) COLLATE "default",
"description" varchar(2048) COLLATE "default",
"cover_url" varchar(255) COLLATE "default",
"price" numeric(10,2),
"level" int4 DEFAULT 1,
"update_status" int4 DEFAULT 1,
"tip" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"course_category_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_f_article_tags
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_f_article_tags";
CREATE TABLE "public"."study_f_article_tags" (
"id" int4 DEFAULT nextval('study_f_article_tags_id_seq'::regclass) NOT NULL,
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL,
"article_id" int4,
"article_tag_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Table structure for study_users
-- ----------------------------
DROP TABLE IF EXISTS "public"."study_users";
CREATE TABLE "public"."study_users" (
"id" int4 DEFAULT nextval('study_users_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"mobile" varchar(11) COLLATE "default",
"password" varchar(255) COLLATE "default",
"createdAt" timestamptz(6) NOT NULL,
"updatedAt" timestamptz(6) NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
ALTER SEQUENCE "public"."admin_roles_id_seq" OWNED BY "admin_roles"."id";
ALTER SEQUENCE "public"."admins_id_seq" OWNED BY "admins"."id";
ALTER SEQUENCE "public"."redirect_urls_id_seq" OWNED BY "redirect_urls"."id";
ALTER SEQUENCE "public"."study_article_browserecords_id_seq" OWNED BY "study_article_browserecords"."id";
ALTER SEQUENCE "public"."study_article_comments_id_seq" OWNED BY "study_article_comments"."id";
ALTER SEQUENCE "public"."study_article_tags_id_seq" OWNED BY "study_article_tags"."id";
ALTER SEQUENCE "public"."study_articles_id_seq" OWNED BY "study_articles"."id";
ALTER SEQUENCE "public"."study_book_categories_id_seq" OWNED BY "study_book_categories"."id";
ALTER SEQUENCE "public"."study_book_records_id_seq" OWNED BY "study_book_records"."id";
ALTER SEQUENCE "public"."study_books_id_seq" OWNED BY "study_books"."id";
ALTER SEQUENCE "public"."study_course_categories_id_seq" OWNED BY "study_course_categories"."id";
ALTER SEQUENCE "public"."study_course_content_records_id_seq" OWNED BY "study_course_content_records"."id";
ALTER SEQUENCE "public"."study_course_contents_id_seq" OWNED BY "study_course_contents"."id";
ALTER SEQUENCE "public"."study_course_members_id_seq" OWNED BY "study_course_members"."id";
ALTER SEQUENCE "public"."study_courses_id_seq" OWNED BY "study_courses"."id";
ALTER SEQUENCE "public"."study_f_article_tags_id_seq" OWNED BY "study_f_article_tags"."id";
ALTER SEQUENCE "public"."study_users_id_seq" OWNED BY "study_users"."id";

-- ----------------------------
-- Primary Key structure for table admin_roles
-- ----------------------------
ALTER TABLE "public"."admin_roles" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table admins
-- ----------------------------
ALTER TABLE "public"."admins" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table redirect_urls
-- ----------------------------
ALTER TABLE "public"."redirect_urls" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table session
-- ----------------------------
ALTER TABLE "public"."session" ADD PRIMARY KEY ("sid");

-- ----------------------------
-- Primary Key structure for table study_article_browserecords
-- ----------------------------
ALTER TABLE "public"."study_article_browserecords" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_article_comments
-- ----------------------------
ALTER TABLE "public"."study_article_comments" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_article_tags
-- ----------------------------
ALTER TABLE "public"."study_article_tags" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_articles
-- ----------------------------
ALTER TABLE "public"."study_articles" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_book_categories
-- ----------------------------
ALTER TABLE "public"."study_book_categories" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_book_records
-- ----------------------------
ALTER TABLE "public"."study_book_records" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_books
-- ----------------------------
ALTER TABLE "public"."study_books" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_course_categories
-- ----------------------------
ALTER TABLE "public"."study_course_categories" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table study_course_content_records
-- ----------------------------
ALTER TABLE "public"."study_course_content_records" ADD UNIQUE ("user_id", "course_content_id");

-- ----------------------------
-- Primary Key structure for table study_course_content_records
-- ----------------------------
ALTER TABLE "public"."study_course_content_records" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_course_contents
-- ----------------------------
ALTER TABLE "public"."study_course_contents" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table study_course_members
-- ----------------------------
ALTER TABLE "public"."study_course_members" ADD UNIQUE ("user_id", "course_id");

-- ----------------------------
-- Primary Key structure for table study_course_members
-- ----------------------------
ALTER TABLE "public"."study_course_members" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_courses
-- ----------------------------
ALTER TABLE "public"."study_courses" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table study_f_article_tags
-- ----------------------------
ALTER TABLE "public"."study_f_article_tags" ADD UNIQUE ("article_id", "article_tag_id");

-- ----------------------------
-- Primary Key structure for table study_f_article_tags
-- ----------------------------
ALTER TABLE "public"."study_f_article_tags" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table study_users
-- ----------------------------
ALTER TABLE "public"."study_users" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Key structure for table "public"."admins"
-- ----------------------------
ALTER TABLE "public"."admins" ADD FOREIGN KEY ("admin_role_id") REFERENCES "public"."admin_roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_article_browserecords"
-- ----------------------------
ALTER TABLE "public"."study_article_browserecords" ADD FOREIGN KEY ("article_id") REFERENCES "public"."study_articles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."study_article_browserecords" ADD FOREIGN KEY ("user_id") REFERENCES "public"."study_users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_article_comments"
-- ----------------------------
ALTER TABLE "public"."study_article_comments" ADD FOREIGN KEY ("comment_id") REFERENCES "public"."study_articles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_book_records"
-- ----------------------------
ALTER TABLE "public"."study_book_records" ADD FOREIGN KEY ("study_book_id") REFERENCES "public"."study_books" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."study_book_records" ADD FOREIGN KEY ("study_user_id") REFERENCES "public"."study_users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_books"
-- ----------------------------
ALTER TABLE "public"."study_books" ADD FOREIGN KEY ("book_category_id") REFERENCES "public"."study_book_categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_course_content_records"
-- ----------------------------
ALTER TABLE "public"."study_course_content_records" ADD FOREIGN KEY ("user_id") REFERENCES "public"."study_users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_course_contents"
-- ----------------------------
ALTER TABLE "public"."study_course_contents" ADD FOREIGN KEY ("section_id") REFERENCES "public"."study_course_contents" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_course_members"
-- ----------------------------
ALTER TABLE "public"."study_course_members" ADD FOREIGN KEY ("user_id") REFERENCES "public"."study_users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_courses"
-- ----------------------------
ALTER TABLE "public"."study_courses" ADD FOREIGN KEY ("course_category_id") REFERENCES "public"."study_course_categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Key structure for table "public"."study_f_article_tags"
-- ----------------------------
ALTER TABLE "public"."study_f_article_tags" ADD FOREIGN KEY ("article_tag_id") REFERENCES "public"."study_article_tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :users


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, default|
|encrypted_password|string|null: false, default|
|user_name|string|null: false, unique: true|
|reset_password_sent_at|string|null: false, unique: true|
|reset_password_token|string|null: false, unique: true|
|your_group_id|string|foreign_key: true|

### Association
- has_many :groups_users
- has_many :groups, :through :groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|image|text||
|chat_content|string|null: false|
|group_name|string|null: false|
|group_member_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users


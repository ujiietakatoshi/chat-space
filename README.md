# Chat-Space DB設計
## Usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index: true|
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user|references|null: false, foreign_key: true|
|groups|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

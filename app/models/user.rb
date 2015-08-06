class User < ActiveRecord::Base
    has_secure_password
    has_many :libraries
    has_many :filters, through: :libraries
    has_many :mashups
    validates_uniqueness_of :username
end

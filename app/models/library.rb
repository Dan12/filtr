class Library < ActiveRecord::Base
    belongs_to :user
    belongs_to :filter
    validates_uniqueness_of :user_id, :scope => :filter_id
end

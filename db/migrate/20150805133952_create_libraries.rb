class CreateLibraries < ActiveRecord::Migration
  def change
    create_table :libraries do |t|
      t.integer :user_id
      t.integer :filter_id

      t.timestamps null: false
    end
  end
end

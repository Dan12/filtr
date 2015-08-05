class CreateMashups < ActiveRecord::Migration
  def change
    create_table :mashups do |t|
      t.string :filters
      t.string :name
      t.integer :views
      t.string :thumbnail
      t.integer :user_id

      t.timestamps null: false
    end
  end
end

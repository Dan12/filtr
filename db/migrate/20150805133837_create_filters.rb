class CreateFilters < ActiveRecord::Migration
  def change
    create_table :filters do |t|
      t.string :matrix
      t.string :name
      t.integer :views
      t.string :code
      t.string :thumbnail
      t.integer :user_id

      t.timestamps null: false
    end
  end
end

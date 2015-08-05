Rails.application.routes.draw do
  root "filtr#home"
  
  #creation center
  get "/creation_center" => "filtr#creation_center"
  post "/generate_code" => "filtr#generate", :via => :post
  
  #mashup
  get "/mashup_creator" => "filtr#mashup_creator"
  
  #filter
  get "/filter/show/:id" => "filtr#show_filter"
  post "/create_filter" => "filtr#create_filter"
  post "/filter/update/:id" => "filtr#update_filter"
  get "/filter/add_to_library/:id" => "filtr#add_to_library"
  
  #mashup
  get "/mashup/show/:id" => "filtr#show_mashup"
  
  #user
  #create
  get "/signup" => "users#signup"
  get "/users/create" => "users#create"
  
  #read
  get "/users/show/:id" => "users#show"
  
  #update
  get "/users/edit" => "users#edit"
  get "/users/update" => "users#update"
  
  #destroy
  get "/users/destroy" => "users#destroy"
  
  #login
  get "/login_page" => "users#login_page"
  get "/login" => "users#login"
  
  #logout
  get "/logout" => "users#logout"
end

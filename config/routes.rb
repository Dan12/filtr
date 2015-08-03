Rails.application.routes.draw do
  root "filtr#home"
  
  #creation center
  get "/creation_center" => "filtr#creation_center"
  post "/generate_code" => "filtr#generate", :via => :post
  
  #mashup
  get "/mashup_creator" => "filtr#mashup_creator"
  
  #filter
  get "/filter/show/:id" => "filtr#show_filter"
  
  #user
  #create
  get "/signup" => "users#signup"
  get "/users/create" => "users#create"
  
  #read
  get "/users/show" => "users#show"
  
  #update
  get "/users/edit" => "users#edit"
  get "/users/update" => "users#update"
  
  #destroy
  get "/users/destroy" => "users#destroy"
  
  #login
  get "/login" => "users#login"
end

Rails.application.routes.draw do
  root "filtr#home"
  
  get "/creation_center" => "filtr#creation_center"
  
  post "/generate_code" => "filtr#generate", :via => :post
end

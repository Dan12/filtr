Rails.application.routes.draw do
  root "filtr#home"
  
  #creation center
  get "/creation_center" => "filtr#creation_center"
  post "/generate_code" => "filtr#generate", :via => :post
  
  #mashup
  get "/mashup_creator" => "filtr#mashup_creator"
end

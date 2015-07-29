Rails.application.routes.draw do
  root "filtr#home"
  
  get "/creation_center" => "filtr#creation_center"
end

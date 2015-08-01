class FiltrController < ApplicationController
  def home
    render "home"
  end
  
  def creation_center
    render "create_filter"
  end
  
  def generate
    code = params["code"];
    File.open("#{Rails.root}/public/temp/generate.js", 'wb') do |f|
      f.write code
    end
    output = `node /home/nitrous/code/Desktop/Rails_Apps/filtr/public/temp/generate.js`
    render :json => {"output" => output}
  end
  
  def mashup_creator
    render "create_mashup"
  end
end
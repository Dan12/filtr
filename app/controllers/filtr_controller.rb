class FiltrController < ApplicationController
  
  before_filter :login_required, :except => [:home, :creation_center, :generate, :create_filter, :show_filter]
  
  def login_required
    if session[:user_id] == nil || session[:user_id] == 1 || User.find_by(id: session[:user_id]) == nil
      redirect_to "/"
    end
  end
  
  def home
    @isHome = true
    @popular = Filter.order(:views).reverse[0..9]
    @random = Filter.all.sample(10);
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
    output = `node /home/ubuntu/workspace/rails/filtr/public/temp/generate.js`
    render :json => {"output" => output}
  end
  
  def create_filter
    @filter = Filter.new
    @filter.name = params[:name]
    @filter.matrix = params[:matrix]
    @filter.thumbnail = params[:thumb]
    @filter.code = params[:code]
    @filter.views = 0;
    @filter.user_id = session[:user_id]
    @filter.save
    
    @library = Library.new
    @library.user_id = session[:user_id]
    @library.filter_id = @filter.id
    @library.save
    
    render :json => {"url" => "/filter/show/#{@filter.id}"}
  end
  
  def add_to_library
    @library = Library.new
    @library.user_id = session[:user_id]
    @library.filter_id = params[:id]
    @library.save
    redirect_to "/filter/show/#{params[:id]}"
  end
  
  def mashup_creator
    render "create_mashup"
  end
  
  def show_filter
    @filter = Filter.find_by(id: params[:id])
    @filterOwner = (@filter.user_id == session[:user_id])
    @library = User.find_by(id: session[:user_id]).libraries
    @inLibrary = (@library.where(filter_id: params[:id]).length != 0)
    if !@filterOwner
      @filter.views+=1
      @filter.save
    end
    render "show_filter"
  end
  
  def update_filter
    @filter = Filter.find_by(id: params[:id])
    if @filter.user_id == session[:user_id]
      @filter.name = params[:name]
      @filter.matrix = params[:matrix]
      @filter.thumbnail = params[:thumb]
      @filter.code = params[:code]
      @filter.save
    end
    redirect_to "/filter/show/#{@filter.id}"
  end
  
  def show_mashup
    render "show_mashup"
  end
end
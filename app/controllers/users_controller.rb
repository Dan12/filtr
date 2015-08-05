class UsersController < ApplicationController
  
  before_filter :login_required, :except => [:signup, :create, :login_page, :login, :show]
  
  def login_required
    if session[:user_id] == nil || session[:user_id] == 1 || User.find_by(id: session[:user_id]) == nil
      redirect_to "/"
    end
  end
  
  def signup
    render "signup"
  end
  
  def login_page
    render "login"
  end
  
  def login
    @user = User.find_by_username(params[:username])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to "/"
    else
      redirect_to "/login_page"
    end
  end
  
  def create
    @exists = User.where(username: params[:username])
    if @exists.length == 0 && password != ""
      @user = User.new
      @user.username = params[:username]
      @user.password = params[:password]
      @user.password_confirmation = params[:password_confirmation]
      
      if @user.save
        session[:user_id] = @user.id
        redirect_to "/users/show/#{@user.id}"
      else
        redirect_to "/signup"
      end
    else
      redirect_to "/signup"
    end
  end
  
  def show
    @user = User.find_by(id: params[:id])
    render "show"
  end
  
  def edit
    render "edit"
  end
  
  def update
    @user = User.find_by(id: session[:user_id])
    @exists = 0
    if params[:username] != @user.username
      @exists = User.where(username: params[:username]).length
    end
    if @exists == 0
      @user.username = params[:username]
      if(params[:password] != "")
        @user.password = params[:password]
        @user.password_confirmation = params[:password_confirmation]
      end
      
      if @user.save
        session[:user_id] = @user.id
        redirect_to "/users/show/#{@user.id}"
      else
        redirect_to "/users/edit"
      end
    else
      redirect_to "/users/edit"
    end
  end
  
  def logout
    reset_session
    redirect_to "/"
  end
end
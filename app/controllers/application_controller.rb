class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  before_filter :login_guest
  
  def login_guest
    if session["user_id"] == nil
      session["user_id"] = 1
    end
  end
  
  def home
    render "home"
  end
end

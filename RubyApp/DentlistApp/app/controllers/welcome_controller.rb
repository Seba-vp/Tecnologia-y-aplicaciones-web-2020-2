
require 'httparty'
require 'json'


class WelcomeController < ApplicationController
  include HTTParty

  def loginp
      host = "http://localhost:3000"
      @url = host + "/api/auth/loginPatient"
      #Recibo parametros
      puts params
      @email = params[:email]
      @password = params[:password]

      @respuesta = HTTParty.post(
      @url.to_str,
      body: {
        "email": @email,
        "password": @password
      }
        )

      @body = @respuesta.body
      if @body 
        redirect_to api_resultado_path(:body => @body)
        return
      end
  end

  def logind
    host = "http://localhost:3000"
    @url = host + "/api/auth/loginDentist"
    #Recibo parametros
    puts params
    @email = params[:email]
    @password = params[:password]

    @respuesta = HTTParty.post(
    @url.to_str,
    body: {
      "email": @email,
      "password": @password
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
      return
    end
  end


  def resultado
    @body = params[:body]
  end

end

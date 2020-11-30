
require 'httparty'
require 'json'


class WelcomeController < ApplicationController
  include HTTParty
#LOGIN PACIENTE
  @token = 'thisisatoken' 
  def loginp
      @url = MYHOST + "/api/auth/loginPatient"

      @email = params[:email]
      @password = params[:password]
      puts @url
      @respuesta = HTTParty.post(
      @url.to_str,
      body: {
        "email": @email,
        "password": @password
      }
        )

      @body = @respuesta.body

      @parsed = JSON.parse(@body)
      @token = @parsed["patientToken"]
      puts '################################################################3'
      puts @token
      puts '################################################################3'
      if @body 
        redirect_to api_resultado_path(:body => @body, :token => @token)
        return
      end
  end
#LOGIN DENTISTA
  def logind
    @url = MYHOST + "/api/auth/loginDentist"

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
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end
############
# 1 Get SIN AUTENTIFICAR
  def posts
    @url = MYHOST + "/api/posts/all"


    @respuesta = HTTParty.get(
    @url.to_str
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

###################
#CON AUTENTIFICAR

#GET BY ID
  def patientById
    @url = MYHOST + "/api/patient/data"

    @token = params[:token]

    @auth = "Bearer " + @token
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end
  def dentistById
    @url = MYHOST + "/api/dentist/data"
    #Recibo parametros

    @token = params[:token]

    @auth = "Bearer " + @token
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end
############################################

#2 Get All
  def allpains
    @url = MYHOST + "/api/pain/all"
    #Recibo parametros

    @token = params[:token]

    @auth = "Bearer " + @token
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

  def allpainsp
    @url = MYHOST + "/api/allpains/pains"
    #Recibo parametros

    @token = params[:token]

    @auth = "Bearer " + @token
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end
######################################################
# 3 Post
  def postPain
    @url = MYHOST + "/api/pain/new"
    #Recibo parametros

    @token = params[:token]
    @name =params[:name]
    @description =params[:description]
    @category =params[:category]

    @auth = "Bearer " + @token
    @respuesta = HTTParty.post(
    @url.to_str,
    headers: {
      "Authorization": @auth
    },
    body: {
      "name": @name,
      "description": @description,
      "category": @category
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

  def postDate
    @url = MYHOST + "/api/date/new"
    @token = params[:token]
    @painId =params[:painId]
    @schedule =params[:schedule]
    @price =params[:price]
    @message=params[:message]

    @auth = "Bearer " + @token
    @respuesta = HTTParty.post(
    @url.to_str,
    headers: {
      "Authorization": @auth
    },
    body: {
        "painId": @painId,
        "schedule": @schedule,
        "price": @price,
        "message": @message
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

  def postMessage
    @url = MYHOST + "/api/message/new"
    @token = params[:token]
    @chatId =params[:chatId]
    @idReceive =params[:idReceive]
    @body =params[:body]

    @auth = "Bearer " + @token
    @respuesta = HTTParty.post(
    @url.to_str,
    headers: {
      "Authorization": @auth
    },
    body: {
        "chatId": @chatId,
        "idReceive": @idReceive,
        "body": @body
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end
## 3 DELETE
  def delPatient
    @url = MYHOST + "/api/deletepatient/Delete"
    @token = params[:token]
    
    @auth = "Bearer " + @token
    @respuesta = HTTParty.delete(
    @url.to_str,
    headers: {
      "Authorization": @auth
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

  def delDentist
    @url = MYHOST + "/api/deletedentist/Delete"
    @token = params[:token]
    
    @auth = "Bearer " + @token
    @respuesta = HTTParty.delete(
    @url.to_str,
    headers: {
      "Authorization": @auth
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

  def delPain
    
    @token = params[:token]
    @idpain = params[:idpain]
    @url = MYHOST + "/api/deletepain/delete/"+ @idpain
    
    @auth = "Bearer " + @token
    @respuesta = HTTParty.delete(
    @url.to_str,
    headers: {
      "Authorization": @auth
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

## 3 UPDATE

  def updateDate
    @url = MYHOST + "/api/dentist/updateDateApi"
    @token = params[:token]
    @dateId = params[:dateId]
    @state = params[:state]
  
    
    @auth = "Bearer " + @token
    @respuesta = HTTParty.patch(
    @url.to_str,
    headers: {
      "Authorization": @auth
    },
      body: {
        "dateId": @dateId,
        "state": @state 
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end

  def updatePatient
    @url = MYHOST + "/api/patient/data/update"
    @token = params[:token]

    @name = params[:name]
    @age = params[:age]
    @phone = params[:phone]
    @address = params[:address]
    @city = params[:city]
    @email = params[:email]
    @rut = params[:rut]
    @isapre = params[:isapre]
    @password = params[:password]
   
    
    @auth = "Bearer " + @token
    @respuesta = HTTParty.patch(
    @url.to_str,
    headers: {
      "Authorization": @auth
    },
      body:   {
        "name": @name,
        "age": @age,
        "phone": @phone,
        "address": @address,
        "city": @city,
        "email": @email,
        "rut": @rut,
        "isapre": @isapre,
        "password": @password
      }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end  

  def updateDentist
    @url = MYHOST + "/api/dentist/data/update"
    @token = params[:token]

    @name = params[:name]
    @year = params[:year]
    @phone = params[:phone]
    @address = params[:address]
    @city = params[:city]
    @email = params[:email]
    @rut = params[:rut]
    @voluntario = params[:voluntario]
    @speciality = params[:speciality]
    @university = params[:university]
    @password = params[:password]
   
    
    @auth = "Bearer " + @token
    @respuesta = HTTParty.patch(
    @url.to_str,
    headers: {
      "Authorization": @auth
    },
      body:   {
        "name": @name,
        "year": @year,
        "phone": @phone,
        "address": @address,
        "city": @city,
        "email": @email,
        "rut": @rut,
        "voluntario": @voluntario,
        "speciality": @speciality,
        "university": @university,
        "password": @password
      }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body, :token => @token)
      return
    end
  end 

  def resultado
    @body = params[:body]
  end

end

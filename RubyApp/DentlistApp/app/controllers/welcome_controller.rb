
require 'httparty'
require 'json'


class WelcomeController < ApplicationController
  include HTTParty
#LOGIN PACIENTE
  def loginp
      @url = MYHOST + "/api/auth/loginPatient"

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
      redirect_to api_resultado_path(:body => @body)
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
      redirect_to api_resultado_path(:body => @body)
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
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1cCIsImlhdCI6MTYwNjY5ODE2OH0.Tg7F9GVSqqQtxIQnNmEuV5-cXenXXGlkgb7t9ruQBT0"
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
      return
    end
  end
  def dentistById
    @url = MYHOST + "/api/dentist/data"
    #Recibo parametros

    @token = params[:token]

    @auth = "Bearer " + @token
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZCIsImlhdCI6MTYwNjcwMDE3MX0.H7dhrj02811IkmpsMWRoOwtm1Drn4qNxVBH25gg8MC0"
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
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
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZCIsImlhdCI6MTYwNjcwMDE3MX0.H7dhrj02811IkmpsMWRoOwtm1Drn4qNxVBH25gg8MC0"
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
      return
    end
  end

  def allpainsp
    @url = MYHOST + "/api/allpains/pains"
    #Recibo parametros

    @token = params[:token]

    @auth = "Bearer " + @token
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1cCIsImlhdCI6MTYwNjcwNDg3Mn0.ogpFSwSV6VDoIenshBNxn62Dt0CMjWOu_-umG0GPu2s"
    @respuesta = HTTParty.get(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    }
      )

    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
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
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1cCIsImlhdCI6MTYwNjY5ODE2OH0.Tg7F9GVSqqQtxIQnNmEuV5-cXenXXGlkgb7t9ruQBT0"
    @respuesta = HTTParty.post(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    },
    body: {
      "name": @name,
      "description": @description,
      "category": @category
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
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
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZCIsImlhdCI6MTYwNjcwMDE3MX0.H7dhrj02811IkmpsMWRoOwtm1Drn4qNxVBH25gg8MC0"
    @respuesta = HTTParty.post(
    @url.to_str,
    headers: {
      "Authorization": @auth2
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
      redirect_to api_resultado_path(:body => @body)
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
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZCIsImlhdCI6MTYwNjcwMDE3MX0.H7dhrj02811IkmpsMWRoOwtm1Drn4qNxVBH25gg8MC0"
    @respuesta = HTTParty.post(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    },
    body: {
        "chatId": @chatId,
        "idReceive": @idReceive,
        "body": @body
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
      return
    end
  end
## 3 DELETE
  def delPatient
    @url = MYHOST + "/api/deletepatient/Delete"
    @token = params[:token]
    
    @auth = "Bearer " + @token
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0cCIsImlhdCI6MTYwNjcwNDI0N30.pPaeauPgGBF8Ek9Vdi_CgZmV7Uuar4GN8Ai3s8GlRoQ"
    @respuesta = HTTParty.delete(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
      return
    end
  end

  def delDentist
    @url = MYHOST + "/api/deletedentist/Delete"
    @token = params[:token]
    
    @auth = "Bearer " + @token
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0cCIsImlhdCI6MTYwNjcwNDI0N30.pPaeauPgGBF8Ek9Vdi_CgZmV7Uuar4GN8Ai3s8GlRoQ"
    @respuesta = HTTParty.delete(
    @url.to_str,
    headers: {
      "Authorization": @auth2
    }
      )
    @body = @respuesta.body
    if @body 
      redirect_to api_resultado_path(:body => @body)
      return
    end
  end

  def delPain
    
    @token = params[:token]
    @idpain = params[:idpain]
    @url = MYHOST + "/api/deletepain/delete/"+ @idpain
    
    @auth = "Bearer " + @token
    @auth2 = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1cCIsImlhdCI6MTYwNjcwNDg3Mn0.ogpFSwSV6VDoIenshBNxn62Dt0CMjWOu_-umG0GPu2s"
    @respuesta = HTTParty.delete(
    @url.to_str,
    headers: {
      "Authorization": @auth2
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

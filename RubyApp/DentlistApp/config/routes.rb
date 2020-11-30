Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index', as: "home"


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  #Logind de user y dentist
  get 'api/loginp', to: "welcome#loginp"
  get 'api/logind', to: "welcome#logind"
  

  #1 GET Sin autentificacion
  get 'api/posts', to: "welcome#posts"


  #2 get all
  get 'api/allpains', to: "welcome#allpains"
  get 'api/allpainsp', to: "welcome#allpainsp"

  #2 get by id
  get 'api/patientbyid', to: "welcome#patientById"
  get 'api/dentistbyid', to: "welcome#dentistById"

  #3 post
  get 'api/postPain', to: "welcome#postPain"
  get 'api/postDate', to: "welcome#postDate"
  get 'api/postMessage', to: "welcome#postMessage"

  #3delete
  get 'api/delPatient', to: "welcome#delPatient"
  get 'api/delDentist', to: "welcome#delDentist"
  get 'api/delPain', to: "welcome#delPain"


  #3patch


  get 'api/resultado', to: "welcome#resultado"  
end

Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index', as: "home"


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  #Logind de user y dentist
  get 'api/loginp', to: "welcome#loginp"
  get 'api/logind', to: "welcome#logind"  


  get 'api/resultado', to: "welcome#resultado"  
end

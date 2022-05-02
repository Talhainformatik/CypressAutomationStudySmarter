Feature: SmartStudy
I want to add details and remove details from SmartStudy

Scenario: Login to smartstudy, add Study set, verify API response from XHR and remove Studyset

Given Login to Application
Then Add Studyset 
And verify XHR api response of added studyset id and name
And verify left and right panel Studyset and Delete added Studyset
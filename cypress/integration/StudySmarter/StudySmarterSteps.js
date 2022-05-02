/// <reference types="Cypress"/>
//import smartstudy from '../fixtures/smartstudy.json'
import {Given, When, Then , And } from 'cypress-cucumber-preprocessor/steps'
import StudySmarter from './StudySmarterpage'
import StudySmarterpage from './StudySmarterpage'
//import smartstudy from '../fixtures/smartstudy.json'



before(function()
    {
        cy.fixture('smartstudy').then((fdata)=> 
        {
           this.data=fdata
           cy.log(this.data.loginemail)
        })
    })


Given("Login to Application",function(){
    //cy.log(this.data.loginemail)
    StudySmarterpage.login_app(this.data)
    
})

Then("Add Studyset",function(){

    StudySmarterpage.AddStudyset(this.data)
    
})


And("verify XHR api response of added studyset id and name",function(){
    StudySmarterpage.verifyXHRAPI(this.data)
})


And("verify left and right panel Studyset and Delete added Studyset",function(){

    StudySmarterpage.deletestudyset(this.data)
})





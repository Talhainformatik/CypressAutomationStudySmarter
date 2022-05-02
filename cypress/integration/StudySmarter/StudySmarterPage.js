
 class StudySmarterpage{

    //Launch app url and login
    static login_app(data){     
    
        cy.visit(data.AppUrl)
        
        cy.get('[href="/login"]').click()
        cy.get('[type=email][datacy="username"]').type(data.loginemail)
        cy.get('[datacy="password"]').type(data.loginpassword)       
        cy.get('.ui-size-large[type=submit]').click()
        cy.contains('button','Try it').should("exist").click()
        cy.get('.ng-untouched.ng-pristine.ng-valid[title=Home]').should('be.visible').then(function(){
            cy.log('Loggedin Successfully')
        })


}



static AddStudyset(data){  

    cy.get('.nav-icon.nav-icon-stroke svg[viewBox="0 0 24.3 23.22"]').first().click()
    cy.get('button.create-button',{timeout:10000}).click()       
    //cy.get('[src="assets\/icons\/maintopics\/maintopic_default_colored.svg"]',{timeout:10000}).click()
    cy.get('.maintopic-icon.subject-color-1.app-icon-subject-other.ng-star-inserted',{timeout:10000}).click()
    //cy.get('.maintopic-icon[alt=Chemistry]').click()
    cy.get('.maintopic-icon.subject-color-2.app-icon-subject-chemistry').click()
    cy.get('[data-cy="input-subject-name"]#text',{timeout:10000}).type(data.studysetname)
    cy.get('.mat-datepicker-toggle-default-icon.ng-star-inserted').click()
    cy.get('tbody.mat-calendar-body tr',{timeout:10000}).each(function($row,index,$list){

    cy.get('tbody.mat-calendar-body tr:nth-child('+(index+1)+') td',{timeout:10000}).each(function($col,index2,$list2){
        const coldate=$col.text().trim()
        
        if (coldate==data.StudysetCalenderDay){
            
            cy.get('tbody.mat-calendar-body tr:nth-child('+(index+1)+') td:nth-child('+(index2+1)+')').click()
            cy.get('button[data-cy="create-subject-dialog-btn"]').click()
           return false
        }
    })

    

    })

}



static verifyXHRAPI(data){
    
    cy.get('.nav-icon.nav-icon-stroke svg[viewBox="0 0 24.3 23.22"]').first().click()       
    cy.get('.nav-icon.nav-icon-stroke svg[viewBox="0 0 24.3 23.22"]').should('be.visible').then(function(){        
    const apilink=data.APIUrl
   
     cy.request({
         method: 'GET', 
          
         url: apilink ,
         headers:{
             'authorization': data.APIToken
         }
       }).then(function(res){
           expect(res.status).to.eq(200)
           cy.log('length of API ====' + res.body.results.length)
           cy.log('id and name of last added StudySet ====' + res.body.results[(res.body.results.length)-1].id +'==='+ res.body.results[(res.body.results.length)-1].name)
           //cy.log('id and name ====' + res.body.results[(res.body.results.length)-2].id +'==='+ res.body.results[(res.body.results.length)-2].name)
           //cy.log('id and name ====' + res.body.results[(res.body.results.length)-3].id +'==='+ res.body.results[(res.body.results.length)-3].name)
          
       })    
    })
}

static deletestudyset(data){

    cy.get('[data-cy=subject-menu-'+(data.studysetname)+']',{timeout:10000}).last().click()
    cy.get('[data-cy=title-'+data.studysetname+']').last().should('be.visible').then(function(){
    cy.log("Study set from Left side panel is visible")
    cy.get('div.info-group .subject-name').should('be.visible').then(function(valu){
    cy.log("Study set from Right side panel is visible")
      if(valu.text()===data.studysetname){
         
          cy.url().then(urlString => cy.log(urlString))

          cy.get('[data-cy="delete-subject"]').click()
          cy.get('button.ui-size-medium.ui-color-1.ui-primary-button.ng-star-inserted').click()    
      }
     
     })
 })
}
}

export default StudySmarterpage;
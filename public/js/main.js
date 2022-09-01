
 function getId(id){
     document.getElementById('postId').value=id
     console.log(id)
 }
 function edit(id){
    document.getElementById('postIdd').value=id

    let inputid =document.getElementById('_id1'+id).innerText
    let inputphoto =document.getElementById('photo'+id).innerText
    let inputfile =document.getElementById('file'+id).innerText
    let inputusername =document.getElementById('username'+id).innerText
    let inputemail =document.getElementById('email'+id).innerText
    let inputpassword =document.getElementById('password'+id).innerText
    let inputQualification =document.getElementById('Qualification'+id).innerText
    let inputcounseling =document.getElementById('counseling'+id).innerText
    let inputduration =document.getElementById('duration'+id).innerText
    let inputAbout =document.getElementById('About'+id).innerText
    let inputcountry =document.getElementById('country'+id).innerText
    let inputphone =document.getElementById('phone'+id).innerText
    let inputprice =document.getElementById('price'+id).innerText
    let inputrating =document.getElementById('rating'+id).innerText
    let inputFCM_TOKEN =document.getElementById('FCM_TOKEN'+id).innerText
    let inputcreatedAt =document.getElementById('createdAt'+id).innerText
    let inputupdatedAt =document.getElementById('updatedAt'+id).innerText
    document.getElementById('inputid').value=inputid
    document.getElementById('inputphoto').value=inputphoto
    document.getElementById('inputfile').value=inputfile
    document.getElementById('inputusername').value=inputusername
    document.getElementById('inputemail').value=inputemail
    document.getElementById('inputpassword').value=inputpassword
    document.getElementById('inputQualification').value=inputQualification
    document.getElementById('inputcounseling').value=inputcounseling
    document.getElementById('inputduration').value=inputduration
    document.getElementById('inputAbout').value=inputAbout
    document.getElementById('inputcountry').value=inputcountry
    document.getElementById('inputphone').value=inputphone
    document.getElementById('inputprice').value=inputprice
    document.getElementById('inputrating').value=inputrating
    document.getElementById('inputFCM_TOKEN').value=inputFCM_TOKEN
    document.getElementById('inputcreatedAt').value=inputcreatedAt
    document.getElementById('inputupdatedAt').value=inputupdatedAt
}

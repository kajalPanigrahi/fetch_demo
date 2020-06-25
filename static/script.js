let cadets =[];

function getCadets(){

    console.log('fetching all cadet records')

    let fetchPromise = fetch('http://localhost:3000/cadets');




    console.log(fetchPromise);

    let p1 = fetchPromise
    .then((data)=>{
        console.log(data);
        
        if(data.status===200)
        {
            console.log('Response Received')
            return data.json();
        }
        else{
            console.log(`Error in Fetching`)
            return Promise.reject('Failed to Fetch Cadet Records')
        }
    })
    p1.then((response)=>{
        // console.log(response);
        
        cadets = response;
        populateCadetDOM(cadets);
    })
    p1.catch((error)=>{
        console.log(error);
    })

}

function addCadet(){
    
    let newcadet={
        "name":"Minal",
        "email":"minal@gmail.com",
        "id":101
    }

    fetch('http://localhost:3000/cadets',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newcadet)
    })
    .then(response=>{
        console.log(response);
        if(response.status===201)
            return response.json();
        else if(response.status===500){
            return Promise.reject('Failed to Add due to Server Error')
        }
    })
    .then(data=>{
        console.log(data);
        cadets.push(data);

        populateCadetDOM(cadets);
 
    })

    // .catch(error=>{
    //     console.log(error)
    // })
}

function populateCadetDOM(cadetlist){

    let tbody = document.getElementsByTagName('tbody')[0];
    let bodyHtml='';
    

    cadetlist.forEach(record=>{
        let tr = `<tr>
        <td>${record.id}</td>
        <td>${record.name}</td>
        <td>${record.email}</td>
        <td><button onclick="edit(${record.id})">Edit</button></td>
        <td><button onclick="edit(${record.id})">Delete</button></td>
        <td><button onclick="edit(${record.id})">Details</button></td>
        </tr>`
        // console.log(tr);
        bodyHtml+=tr;
        // console.log(bodyHtml);
    })
    // console.log(bodyHtml);
    tbody.innerHTML =bodyHtml;
}
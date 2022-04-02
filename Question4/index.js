const person = {
    id : 2 ,
    gender : 'mail'
    };


const student = {
    name : "ravi" ,
    email :"ravi11@yopmail.com"
    };
    
const finalObject={...person,...student}

console.log(finalObject)
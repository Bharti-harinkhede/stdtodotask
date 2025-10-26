const cl = console.log;

const stdForm = document.getElementById("stdForm");
const stdTable = document.getElementById("stdTable");
const fnameCntrl = document.getElementById("fname");
const lnameCntrl = document.getElementById("lname");
const emailCntrl = document.getElementById("email");
const contactCntrl = document.getElementById("contact");
const submitDataBtn = document.getElementById("submitDataBtn");
const updateDataBtn = document.getElementById("updateDataBtn");

let stdArr = [{fname: 'bharti', lname: 'harinkhede', email: 'bhartiui108@gmail.com', contact: '9579765982', stdId: '9dfbf687-bcb0-4ace-81fd-6bbfefd13b40'}];

const uuid = () => {
   return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, (character) => {
    const random = (Math.random() * 16) | 0;
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  })                                                    
};

const creatTable = (arr) =>{
 let result = "";
    arr.forEach((s, i) => {
      result += `<tr id="${s.stdId}">
                            <td>${i + 1}</td>
                            <td>${s.fname}</td>
                            <td>${s.lname}</td>
                            <td>${s.email}</td>
                            <td>${s.contact}</td>
                            <td><i class="fa-solid fa-pen-to-square text-success" onclick="onEdit(this)"></i></td>
                            <td><i class="fa-solid fa-trash-can text-danger"onclick="onRemove(this)"></i></td>
                        </tr> `;
    })
    stdTable.innerHTML = result;
  };
  creatTable(stdArr);


let EDIT_ID;
const onEdit = (ele) => {

  EDIT_ID = ele.closest("tr").id;
  cl(EDIT_ID);

  let EDIT_OBJ = stdArr.find(st =>{
    return st.stdId === EDIT_ID;
  })
  cl(EDIT_OBJ);

 fnameCntrl.value = EDIT_OBJ.fname;
 lnameCntrl.value = EDIT_OBJ.lname;
 emailCntrl.value = EDIT_OBJ.email;
 contactCntrl.value = EDIT_OBJ.contact;

  updateDataBtn.classList.remove("d-none")
  submitDataBtn.classList.add("d-none");
}
 
const onRemove = (ele) => {
  let getConfirm = confirm("ARE YOU SURE TO REMOVE DATA ?");
  cl(getConfirm);
  if(getConfirm === true){
     cl(ele);
    let REMOVE_ID = ele.closest("tr").id
    cl(REMOVE_ID);
    let getIndex = stdArr.findIndex(sd => {
      return sd.stdId === REMOVE_ID;
    })
    cl(getIndex)
    stdArr.splice(getIndex, 1)
    ele.closest("tr").remove();
  }
};
    

const onSubmitData = (eve) =>{
  eve.preventDefault();
  
  let stdObj = {
    fname : fnameCntrl.value,
    lname : lnameCntrl.value,
    email : emailCntrl.value,
    contact : contactCntrl.value,
     stdId: uuid()
  }
  cl(stdObj);
  stdForm.reset();
  stdArr.unshift(stdObj);
  cl(stdArr);
  creatTable(stdArr);
}

const onUpdateData = () => {
  let UPDATE_ID = EDIT_ID;
  cl(UPDATE_ID)
  let UPDATED_OBJ = {
    fname : fnameCntrl.value,
    lname : lnameCntrl.value,
    email : emailCntrl.value,
    contact : contactCntrl.value,
    stdId : UPDATE_ID
  }
  
  cl(UPDATED_OBJ);
  stdForm.reset();
  
  let getIndex = stdArr.findIndex( std =>{
    return std.stdId === UPDATE_ID
  })
  cl(getIndex);

stdArr[getIndex] = UPDATED_OBJ;
 
let tr = document.getElementById(UPDATE_ID);
tr.children[1].textContent = UPDATED_OBJ.fname;
tr.children[2].textContent = UPDATED_OBJ.lname;
tr.children[3].textContent = UPDATED_OBJ.email;
tr.children[4].textContent = UPDATED_OBJ.contact;
  
updateDataBtn.classList.add("d-none");
submitDataBtn.classList.remove("d-none");
}



stdForm.addEventListener("submit", onSubmitData);
updateDataBtn.addEventListener("click", onUpdateData);
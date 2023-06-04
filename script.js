
let loaddata = document.getElementById("data-load");


async function getMenu(){
    let api = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";
    try{
        let responce = await fetch(api);
        let result = await responce.json();
        console.log(result);
        renderdata(result);
        return new Promise((resolve,reject)=> resolve(result));
    }catch(Error){
        console.log(Error);
    }
}
window.addEventListener('load', getMenu());
function renderdata(result){
    for(let i=0; i<result.length; i++){
        let div = document.createElement("div");
        div.className = "food-containt";

        div.innerHTML = `
        <img class="imges" src="${result[i].imgSrc}" alt="">
        <h3 class="heading" >Name:${result[i].name}</h3>
        <p class="pp" >Price:${result[i].price}</p>
        `
        loaddata.append(div);
    }
}
function randomNum(res){
    return Math.floor(Math.random()*res);
 }
function select3Burgers (result) {
    let arr=[];
    arr.length=3;
    for(let i=0;i<3;i++){
        let rdnNum = randomNum(result.length);
        arr[i]=rdnNum;
        for(let j=0;j<i;j++){
            if(arr[i]==arr[j]){ 
                i--;
            }
        }
    }
    let selectedFood=[];
    arr.map((num)=>{
        selectedFood.push(result[num]);
    })
    return selectedFood;
}

function displaySelectedBurgers(result){
    console.log(result);
    let md = document.getElementById("md");
    let model = document.getElementById("model");
    for(let i=0; i<result.length; i++){
        let div1 = document.createElement("div");
        div1.className = "selected-food";
       
        div1.innerHTML = `
        
        <img class="selected-img" src="${result[i].imgSrc}" alt="">
        <h3 class="selected-heading" >Name:${result[i].name}</h3>
        <p class="selected-pp" >Price:${result[i].price}</p>
        `
        md.append(div1);
    }
   model.style.display= "block";
   setTimeout(()=>{
    model.style.display= "none";
   },3000);
}
function takeOrder(result) {
    return new Promise(resolve => {
      setTimeout(() => {
        let selectedBurgers;
        try{
             selectedBurgers = select3Burgers(result);
             displaySelectedBurgers(selectedBurgers);
        }
        catch(e){
         console.log(e);
        }
        resolve(selectedBurgers);
        console.log(selectedBurgers);
      }, 2500);
    });
  }
  function orderPrep(result) {
    let order={order_status:true, paid:false};
    return new Promise(resolve => {
        
      setTimeout(() => {
        resolve(order);
      }, 1500);
    });
  }
function payOrder(order){
    foodOrder={...order};
    foodOrder.paid=true;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(foodOrder);
        },1000)
    })
}
function thankyouFnc(){
    alert(" Thankyou for eating with us today!");
} 


    getMenu()
    .then((result)=>takeOrder(result))
    .then((burgers3)=>orderPrep(burgers3))
    .then((order)=>payOrder(order))
    .then((order)=>thankyouFnc(order))
    .catch((err)=>console.log(err));

   
export const lastVisitInMinutes = (date) =>  {
    console.log(date);
    if(!date )
    return '';
    const last_visit_time = date.split("T")[1];
    const last_visit_date= date.split("T")[0];
    let currentDate = new Date();
    
    let minutes = 0;
    minutes  = (parseInt(currentDate.getFullYear())- parseInt(last_visit_date.split("-")[0])) *525600;
    minutes = minutes+  ((parseInt(currentDate.getMonth())+1)- parseInt(last_visit_date.split("-")[1])) *43800;
    minutes = minutes+  ((parseInt(currentDate.getDate()))- parseInt(last_visit_date.split("-")[2])) *1440;
    
    minutes = minutes+  ((parseInt(currentDate.getHours()))- parseInt(last_visit_time.split(":")[0])) *60;
    
    minutes = minutes+  ((parseInt(currentDate.getMinutes()))- parseInt(last_visit_time.split(":")[1])) ;
 
    return  minutes;

}
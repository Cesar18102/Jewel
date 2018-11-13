class bagsCollection{
  constructor(arrayOfBagsData, bagsSeparator, paramNames){
     this.collection = [];
     for(let i of arrayOfBagsData){
        let currentBag = new Object();
        let dataParsed = i.split(bagsSeparator);
        for(let i = 0; i < paramNames.length; i++)
           currentBag[paramNames[i]] = dataParsed[i];
        this.collection.push(currentBag);
     }
  }
}
class category{
   constructor(bagsArray, name){
       this.name = name;
       this.bagsArray = bagsArray;
   }
}
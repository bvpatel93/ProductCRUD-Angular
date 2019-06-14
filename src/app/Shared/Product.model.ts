export class Product {    
    constructor(public productId: number ,public productEnglishName: string, public productArabicName: string, 
        public description: string, public quantity: number, public disabled:boolean,public createdDate:Date ) {}
  }
  
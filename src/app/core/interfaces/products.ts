export interface Products {
    title:string,
    imageCover:string,
    price:string,
    ratingsAverage:number,
    category:Category,
    _id:string
}


export interface Category{
image: string,
    name:string,
    _id:string
}

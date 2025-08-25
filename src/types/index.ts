export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}


export interface IFeatureCard{
  title?: string, 
  description?: string,
  image:string,
  isContent: boolean,
  bgColor?: string
}
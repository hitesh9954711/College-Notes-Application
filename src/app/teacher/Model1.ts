export class Model1{
    progress1: boolean
    message: any
    class: any
    object111:{
        course:string
    }
    setProperties(p,m,c){
        this.progress1=p
        this.message=m
        this.class=c

    }
    setTimeMethod(time){
        setTimeout(abc=>{
          this.progress1=false
          this.message=null
          this.class=null
        },time)
    }
    unsetProperties(){
        this.progress1=null
        this.message=null
        this.class=null
    }
}
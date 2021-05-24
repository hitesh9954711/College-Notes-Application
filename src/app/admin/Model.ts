export class Model{
    progress: boolean
    message: any
    class: any
    object111:{
        course:string
    }
    setProperties(p,m,c){
        this.progress=p
        this.message=m
        this.class=c

    }
    setTimeMethod(time){
        setTimeout(abc=>{
          this.progress=false
          this.message=null
          this.class=null
        },time)
    }
    unsetProperties(){
        this.progress=null
        this.message=null
        this.class=null
    }
}
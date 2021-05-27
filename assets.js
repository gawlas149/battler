class AssetsStore{
    constructor(){ 
        this.images={}
        this.onload=()=>{}
    }
    //imagesToDownload = [{name,src}]
    init(imagesToDownload){
        let imagesDownloaded=0
        for(let i=0;i<imagesToDownload.length;i++){
            const image=new Image()
            image.onload=()=>{
                imagesDownloaded+=1
                if (imagesDownloaded==imagesToDownload.length){
                    this.onload()
                }
            }
            image.src=imagesToDownload[i].src
            this.images[imagesToDownload[i].name]=image
        }
    }
    getImage(name){
        return this.images[name]
    }
}

export const assetsStore = new AssetsStore()
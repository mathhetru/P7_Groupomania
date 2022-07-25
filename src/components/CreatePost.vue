<template>
    <div class="create-post">
        <div class="create-post-window">
            <div class="create-post-top">
                <p class="create-post-top__title">Créer une publication</p>
                <fontAwesome icon="close" @click="createPublication" class="create-post-top__close"/>
            </div>
            <span class="create-post-line"></span>
            <div class="create-post-middle" aria-label="Fenetre créer une publication">
                <textarea placeholder="Votre publication..." name="content-text" rows="2" class="create-post-middle__text" aria-label="Ecrire son texte ici"></textarea>
                <button aria-label="bouton ajouter une image" class="create-post-middle-btn">
                    <fontAwesome icon="camera" class="create-post-middle-btn__icon"/>
                    <p class="create-post-middle-btn__title">Ajouter une image</p>
                </button>
                <button aria-label="bouton ajouter une vidéo youtube" class="create-post-middle-btn">
                    <fontAwesome icon="circle-play" class="create-post-middle-btn__icon"/>
                    <p class="create-post-middle-btn__title">Ajouter une vidéo via Youtube</p>
                </button>
            </div>
            <span class="create-post-line"></span>
            <div class="create-post-bottom">
                <button type="submit" name="publication" id="publication" class="create-post-bottom-btn">Publier</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreatePost',
    data() {
        return {
            publication : false,
        }
    },
    methods: {
        createPublication() {
            if (!this.publication) {
                this.publication = true;
            } else {
                this.publication = false;
            }
        },
    }
}
</script>

<style scoped>
.create-post{
    inset: 0px;
    background-color: #4e516660;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.create-post-window{
    background-color: white;
    border-radius: 20px;
}
.create-post-top{
    display: flex;
    align-items: center;
}
.create-post-top__title{
    width: 93%;
    text-align: center;
    font-weight: bold;
}
.create-post-top__close{
    height: 25px;
    cursor: pointer;
}
.create-post-line{
    display: block;
    background-color: #d1d2d6;
    height:1.5px;
    width: 100%;
}
.create-post-bottom{
    display: flex;
    justify-content: center;
}
.create-post-middle{
    padding:30px 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 480px;
}
.create-post-middle__text{
    min-width: 480px;
    min-height:42px;
    max-height:500px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
}
.create-post-middle-btn{
    height: 40px;
    width:calc(50% - 15px);
    margin-top: 30px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.create-post-middle-btn:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}

.create-post-middle-btn__title{
    font-size: 0.8rem;
}
.create-post-bottom-btn{
    cursor: pointer;
    padding: 10px 45px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
    margin: 13px;
}
.create-post-middle-btn__icon{
    width: 15%;
}
.create-post-bottom-btn:hover{
    box-shadow: 1px 1px 10px #FD2D01;
    transition: 0.2s linear;
}
</style>

<template>
    <div class="modify">
        <div class="modify-window">
            <div class="modify-top">
                <p class="modify-top__title">Modifier votre profil</p>
                <fontAwesome icon="close" @click="createPublication" class="modify-top__close"/>
            </div>
            <span class="modify-line"></span>
            <div class="modify-middle" aria-label="Fenetre créer une publication">
                <input type="text" name="name" placeholder="Votre nom et prénom" class="modify-middle__input"/>
                <input type="text" name="job" placeholder="Votre rôle dans l'entreprise" class="modify-middle__input"/>
                <button aria-label="bouton ajouter une image" class="modify-middle-btn">
                    <fontAwesome icon="camera" class="modify-middle-btn__icon"/>
                    <p class="modify-middle-btn__title">Votre photo de profil</p>
                </button>
            </div>
            <span class="modify-line"></span>
            <div class="modify-bottom">
                <button type="submit" name="publication" id="publication" class="modify-bottom-btn">Publier</button>
            </div>
        </div>
    </div>
    <div class="banniere-grey">
        <div class="about">
            <div class="about-photo-profil">
                <img src="../assets/photoprofil.jpg" alt="photo-profil" class="about-photo-profil__img">
            </div>
            <div class="about-informations">
                <p class="about-info-name">Aurélien Dehaine</p>
                <p class="about-info-poste">Technicien</p>
            </div>
            <button class="about-modify-btn">Modifier</button>
        </div>
        
    </div>
    <p class="about-yourpublications">Vos publications sur l'intranet</p>
</template>

<script>
export default {
    name: 'Profil',
}
</script>

<style scoped>

.modify{
    inset: 0px;
    background-color: #4e516660;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index:1000;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.modify-window{
    background-color: white;
    border-radius: 20px;
}
.modify-top{
    display: flex;
    align-items: center;
}
.modify-top__title{
    width: 93%;
    text-align: center;
    font-weight: bold;
}
.modify-top__close{
    height: 25px;
    cursor: pointer;
}
.modify-line{
    display: block;
    background-color: #d1d2d6;
    height:1.5px;
    width: 100%;
}
.modify-bottom{
    display: flex;
    justify-content: center;
}
.modify-middle{
    padding:30px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 480px;
    height:180px;
}
.modify-middle__input{
    height: 40px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
    padding:0;
    font-size: 0.8rem;
    padding-left:15px;
}
.modify-middle-btn{
    height: 40px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding:0;
}
.modify-middle-btn__icon{
    width: 10%;
}
.modify-middle-btn__title{
    font-size: 0.8rem;
}
.modify-middle-btn:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}.modify-middle-btn__title{
    font-size: 0.8rem;
}
.modify-bottom-btn{
    cursor: pointer;
    padding: 10px 45px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
    margin: 13px;
}

.modify-bottom-btn:hover{
    box-shadow: 1px 1px 10px #FD2D01;
    transition: 0.2s linear;
}
.banniere-grey{
    margin:auto;
    width:100%;
    background-color: #d1d2d6;
}
.about{
    position: relative;
    max-width: 1024px;
    padding: 25px 0;
    margin: auto;
    display: flex;
    align-items: flex-end;
}
.about-modify-btn{
    position: absolute;
    right:15px;
}
.about-yourpublications{
    max-width: 620px;
    margin:auto;
    margin-top:15px;
}
.about-photo-profil{
    border-radius: 50%;
    height:250px;
    width:250px;
    overflow: hidden;
}
.about-photo-profil__img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.about-informations{
    margin-left:25px;
}
.about-info-name{
    font-size:2rem;
    font-weight: bolder;
    color: #FD2D01;
    margin:0;
}
.about-info-poste{
    font-size:1.5rem;
    font-weight:lighter;
    margin:0;
    margin-bottom:25px;
}
.about-modify-btn{
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    color: #FD2D01;
    font-weight: bold;
    width: 110px;
    height: 39px;
    border-radius: 30px;
    border: 2px solid #FD2D01;
}
.about-modify-btn:hover{
    color: white;
    background-color: #FD2D01;
    transition: 0.2s linear;
}
</style>
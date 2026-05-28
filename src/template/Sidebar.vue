<template>
  <aside>
        <div class="sidebar-box">
           <a href="#"><img src="/assets/wa.png" alt=""></a>
            <ul>
                <li class="fa-solid fa-address-book"><a href="#"> Contact</a></li>
                <li class="fa-solid fa-file"><a href="#"> Focus and Scope</a></li>
                <li class="fa-solid fa-user"><a href="#"> Editor Tim</a></li>
                <li class="fa-solid fa-users"><a href="#"> Reviewer</a></li>
                <li class="fa-solid fa-sitemap"><a href="#"> Indexed</a></li>
                <li class="fa-solid fa-chart-column"><a href="#"> Visitors Statistic</a></li>
                <li class="fa-solid fa-building-columns"><a href="#"> Journal Statistic</a></li>
                <li class="fa-solid fa-industry"><a href="#"> Publisher</a></li>    
            </ul>
<br>
<br>    
            <h3>POLICIES</h3>
            <br>
            <ul>
                <li class="fa-solid fa-credit-card"><a href="#"> Article Processing Charge</a></li>
                <li class="fa-solid fa-graduation-cap"><a href="#"> Publication Ethics</a></li>
                <li class="fa-solid fa-file-lines"><a href="#"> Author Guidelines</a></li>
                <li class="fa-solid fa-book-open"><a href="#"> Publishing Process</a></li>
                <li class="fa-solid fa-square-check"><a href="#"> Peer Review Process</a></li>
                <li class="fa-solid fa-question"><a href="#"> Nonresponsive Author</a></li>
                <li class="fa-solid fa-file-excel"><a href="#"> Withdrawal of Manuscripts</a></li>
                <li class="fa-solid fa-calendar-days"><a href="#"> Publishing Schedule</a></li>    
                <li class="fa-solid fa-lock-open"><a href="#"> Open Access</a></li>    
                <li class="fa-solid fa-xmark"><a href="#"> Research Miscondut</a></li>    
                <li class="fa-solid fa-magnifying-glass"><a href="#"> Plagiarism</a></li>    
                <li class="fa-solid fa-robot"><a href="#"> ChatGPT and Generative AI</a></li>    
                <li class="fa-solid fa-bookmark"><a href="#"> Archiving</a></li>    
                <li class="fa-solid fa-money-bill"><a href="#"> Revenue Sources</a></li>    
                <li class="fa-solid fa-pen-to-square"><a href="#"> Privacy Statment</a></li>    
                <li class="fa-solid fa-rectangle-ad"><a href="#"> Adversting</a></li>    
                <li class="fa-solid fa-cart-shopping"><a href="#"> Direct Marketing</a></li>    
                <li class="fa-solid fa-comment"><a href="#"> Crossmark</a></li>    
            </ul>
            <br>
<br>    
            <h3>FOR AUTHOR</h3>
            <br>
             <ul>
                <li class="fa-solid fa-file-lines"><a href="#"> Letter of Acceptance</a></li>
                <li class="fa-solid fa-certificate"><a href="#"> E-Certificate</a></li>
                <li class="fa-solid fa-file"><a href="#"> E-Journal</a></li>
             </ul>
             <br>
             <br>
             <h3>KEYWORDS</h3>
           <div id="wordcloud"></div>
           <h3>RECOMENDED TOOLS</h3>
           <div class="tools">
            <a href="#"><img src="/assets/Mendeley.png" alt=""></a>
            <a href="#"><img src="/assets/Zotero.png" alt=""></a>
            <a href="#"><img src="/assets/Turnitin.png" alt=""></a>
            <a href="#"><img src="/assets/Ithenticate1.png" alt=""></a>
            <a href="#"><img src="/assets/Gramarly.png" alt=""></a>
        </div>
        <h3>VISITORS COUNTER</h3>
        <div class="tools">
            <a href=""><img src="/assets/download.png" alt=""></a>
        </div>
        <br>
        <br>
        <h3>CURRENT ISSUE</h3>
        <br>
        <br>
        </div>


        <div class="sidebar-box">
            <h4>E-ISSN</h4>
            <p>3062-9624</p>
        </div>
    </aside>

</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const el = document.getElementById('wordcloud')

  const words = [
    ["AI", 3, "ai.html"],
    ["IoT", 3, "iot.html"],
    ["Arduino", 3, "arduino.html"],
    ["Android", 3, "android.html"],
    ["Machine Learning", 3, "ml.html"],
    ["Sensors", 3, "sensors.html"],
    ["himatif", 3, "robot.html"],
    ["e-commerce", 3, "robot.html"],
    ["ultrasonic", 3, "robot.html"],
    ["online", 3, "robot.html"],
    ["arduino nano", 3, "robot.html"],
    ["waterfall",3, "robot.html"],
    ["solenoid valve", 3, "robot.html"],
    ["implementation", 3, "robot.html"],
    ["android", 3, "robot.html"],
    ["website", 3, "robot.html"],
    ["shpofy", 3, "robot.html"],
    ["html", 3, "robot.html"],
    ["ppdb", 3, "robot.html"],
    ["decision support system", 3, "robot.html"],
    ["uisu", 3, "robot.html"],
    ["attendance", 3, "robot.html"],
    ["arduino ide", 3, "robot.html"],
    ["sensor", 3, "robot.html"],
    ["microcontroler", 3, "robot.html"],
    ["concrete", 3, "robot.html"],
    ["esp32", 3, "robot.html"],
    ["linear regression", 3, "robot.html"],
    ["internet of things", 3, "robot.html"],
    ["xampp", 3, "robot.html"],
    ["codeigniter", 3, "robot.html"],
  ];

  WordCloud(el, {
    list: words,
    gridSize: 5,          // kecilkan biar rapi
    weightFactor: 3,      // kecilkan biar tidak keluar
    rotateRatio: 1,
    shrinkToFit: true,    // 🔥 ini penting!
    drawOutOfBound: false,// 🔥 cegah keluar area
    color: 'random-dark',
    backgroundColor: 'transparent'
  })
})

</script>

<style scoped>
aside{
width: 300px; 
 
background-color: white;
border-left: 0.5px solid #bbb5b5;
padding: 30px 15px 15px 25px;
}

.sidebar-box{
background:white;
margin-bottom:20px;
width: 100%;

}
.sidebar-box img{
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    cursor: pointer;
}

.sidebar-box ul{
    width:100%;
    padding:0;
    margin:0;
    list-style:none;
    align-items: center;
    justify-content: center;
}

.sidebar-box li{
width: 100%;    
background:#0e6b30;
cursor:pointer;
color:white;
font-weight:bold;
padding:5px 5px 5px 8px;
margin-bottom:2px;
border-radius:3px;
box-sizing: border-box;
background-image:linear-gradient(#F1C40F,#F1C40F);
background-repeat:no-repeat;
background-size:0% 100%;

transition:0.3s;
}

.sidebar-box li:hover{
background-size:100% 100%;
color:#0e6b30;
}
.sidebar-box ul li a {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-decoration: none;
    color: white;
}
.sidebar-box h3{
    color: #525252;
    text-decoration: underline;
    text-decoration-thickness: 5px;
    text-decoration-color: #F1C40F;
    text-underline-offset: 15px;
}
.tools{
display:flex;
flex-direction:column;      /* susun ke bawah */
align-items:center;         /* tengah horizontal */
}
.tools img {
    width: 100%;
    margin-bottom: 0px;
}
.btn-group{
display:flex;
gap:20px;
}

.btn-box{
display:flex;
align-items:center;
gap:15px;
padding:20px 30px;
border:3px solid #545859;
text-decoration:none;
color: #ffffff;
font-weight:bold;
background:#0e6b30;
background-image: linear-gradient(#F1C40F,#F1C40F);
background-repeat: no-repeat;
background-size: 0% 100%;
transition:0.3s;
}

.btn-box i{
font-size:40px;
}

.btn-box span{
font-size:20px;
line-height:1.2;
}

.btn-box:hover{
background-size: 100% 100%;
color:white;
transform:translateY(-3px);
}

#wordcloud {
  width: 100%;
  height: 200px;
  margin: auto;
  display: block;
  justify-content: center;  /* center horizontal */
  align-items: center;      /* center vertical */
  cursor: pointer;
    transform: translateX(-30px); /* geser ke kiri */
}
</style>
function start() {
    navigator.mediaDevices.getUserMedia({
        audio:true,
        video:false
    });
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/u02fOYRBx/model.json", {probabilityThreshold:0.7}, modelReady)
}
function modelReady() {
    classifier.classify(gotResults)
}
var dog = 0;
var cat = 0;
function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        RandomR = Math.floor(Math.random()*255) +1
        RandomG = Math.floor(Math.random()*255) +1
        RandomB = Math.floor(Math.random()*255) +1
        document.getElementById("result_label").innerHTML = "Detected voice is of -" + results[0].label
        document.getElementById("result_count").innerHTML = "Detected Dog - " + dog + "Detected Cat - " + cat
        document.getElementById("result_label").style.color = "rgb("+RandomR+","+RandomG+","+RandomB+")"
        document.getElementById("result_count").style.color = "rgb("+RandomR+","+RandomG+","+RandomB+")"
        img = document.getElementById("animal_image")
        if (results[0].label == "Barking") {
            img.src="bark.gif"
            dog = dog + 1
        } else if (results[0].label == "Meowing") {
            img.src = "meow.gif"
            cat = cat + 1
        } else {
            img.src = "listen.gif"
        }
    }
}
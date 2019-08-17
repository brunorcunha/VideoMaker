app.open(new File("C:\\Git\\Bruno\\video-maker\\templates\\1\\template.aep"))
var proj = app.project;
var itms = proj.items;
var itmsLen = itms.length;
var curItem, base;

for (var i = 1; i < itmsLen; i++) {
     curItem = itms[i];
     if (curItem instanceof CompItem && curItem.name === "main") {
       base = curItem;
       break;
     }
}

var sentenca = base.layer("sentence-1")
var atual = base.layer("0.mp3")
sentenca.source.duration = atual.source.duration + 4
sentenca.outPoint = sentenca.inPoint + atual.source.duration + 4

for (var i = 1; i <= 6; i++) {
    var atual = base.layer((i) + ".mp3")
    var anterior = base.layer((i - 1) + ".mp3")
    
    var endTime = anterior.startTime + anterior.source.duration
    atual.startTime = endTime + 1
    
    var iAtual = i + 1
    var sentenca = base.layer("sentence-" + iAtual)
    var sentencaComp = sentenca.source
    sentenca.startTime = atual.startTime - 1
    sentencaComp.duration = atual.source.duration + 2
    
    var layerImage = sentencaComp.layer("image-" + iAtual)
    var layerBG = sentencaComp.layer("background")
    var layerText = sentencaComp.layer("sentence-" + iAtual + "-text")
    layerImage.source.duration = sentencaComp.duration
    try {
        layerImage.property("Scale").removeKey(2)
        layerImage.property("Scale").removeKey(1)
    } catch (e) {}
    layerImage.property("Scale").setValueAtTime(0, [100, 100])
    layerImage.property("Scale").setValueAtTime(sentencaComp.duration, [120, 120])
    layerText.source.duration = sentencaComp.duration
    layerText.outPoint = sentencaComp.duration
    layerText.source.layer((iAtual - 1) + "-sentence.png").outPoint = sentencaComp.duration
    layerBG.outPoint = sentencaComp.duration
}

var inscrever = base.layer("subcribe-animation")
var atual = base.layer("6.mp3")
var endTime = atual.startTime + atual.source.duration
inscrever.startTime = endTime + 1

var fimDeTudo = inscrever.startTime + inscrever.source.duration
base.duration = fimDeTudo

proj.renderQueue.render()

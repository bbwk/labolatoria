// inicjalizacja potrzebnych zmiennych
const plotno = document.getElementById("plotno");
const ctx = plotno.getContext("2d");
const kwadrat = { a:20, x:0, y:0, dx:1, dy:0 };
const pause_button = document.querySelector("#pause_button");
let isRunning = false;

// dodajemy obsługę zdarzenia dla przycisku
document.addEventListener("DOMContentLoaded", function() {
    
    pause_button.addEventListener("click", (event) =>{
        isRunning = !isRunning;
        event.target.innerHTML = (isRunning) ? "Stop" : "Start";
        (isRunning) ? start() : stop();
        // console.log(event.target);
        // console.log(isRunning);
        // console.log(pause_button.innerHTML);
    });
});

// funkcja uruchamiająca animację
function start(){
    isRunning = true;
    update();
}

// aby zatrzymać animację
function stop(){
    isRunning = false;
}

// dla ułatwienia obsługi wielu animacji stworzymy funkcję, w której będzie umieszczany kod
// generujacy kolejne klatki animacji
function update(){
    if(isRunning){
        rysuj_kwadrat();
        // inne funkcje zmieniające stan klatki do wyrysowania
        requestAnimationFrame(update);
    }
}

// funkcja rysująca kwadrat - jaka jest różnica między taką deklaracją funkcji (wyrażenie funkcyjne)
// a sposobem dla funkcji start()/stop()/update() ?
const rysuj_kwadrat = function() {

    // obliczenia
    // trzeba zaimplementować "odbijanie się od krawędzi"
    // sprawdzamy czy przesunięcie kwadratu o kolejny krok nie przesunie go poza obszar płótna
    // załóżmy na razie, że tylko w poziomie
    // do kwadratu zostala dodana kolejna zmienna dx, która przechowuje wartość zmiany pozycji na osi x

    if(kwadrat.dx > 0 && (kwadrat.x+kwadrat.dx + kwadrat.a) > plotno.width){
        kwadrat.dx = 0;
		kwadrat.dy = 1;
    }
    else if(kwadrat.dx < 0 && (kwadrat.x+kwadrat.dx < 0)){
        kwadrat.dx = 0;
		kwadrat.dy = -1;
    }
	if(kwadrat.dy > 0 && (kwadrat.y+kwadrat.dy + kwadrat.a) > plotno.height){
        kwadrat.dx = -1;
		kwadrat.dy = 0;
    }
    else if(kwadrat.dy < 0 && (kwadrat.y+kwadrat.dy < 0)){
        kwadrat.dx = 1;
		kwadrat.dy = 0;
    }
    kwadrat.x+=kwadrat.dx;
	kwadrat.y+=kwadrat.dy;

    // czyścimy płótno
    ctx.clearRect(0, 0, plotno.width, plotno.height);

    // rysujemy 
    ctx.fillStyle = '#000';
    ctx.fillRect(kwadrat.x, kwadrat.y, kwadrat.a, kwadrat.a);
}